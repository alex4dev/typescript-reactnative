import {SagaIterator} from 'redux-saga';
import {takeEvery, put, call, takeLatest, all, select, fork} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import Dbg from 'utils/dbgUtils';
import {
    FetchActivityRequestAction,
    fetchActivityAction,
    FetchSearchRequestAction,
    fetchPicsumAction
} from 'actions';
import {createAPI, PicsumApi} from 'services/PicsumApi';
import {fetchSearchAction} from 'actions/Home/HomeActions';

const api: PicsumApi = createAPI();

/**
 * Flow Saga activity
 * @param action fetch from Home screen
 */
function* handleFetchLivestages(action: FetchActivityRequestAction): SagaIterator {
    const response: Array<string> = yield call(api.getActivity);
    if (!response) {
        // Dbg.warn(handleFetchLivestages.name, 'fetch livestages failed - missing result');
        yield put(fetchActivityAction.failure({}));
    }

    // dispatch success action with base objects
    yield put(fetchActivityAction.success(response));

    if (response.length <= 0) {
        Dbg.warn(handleFetchLivestages.name, 'missing activity data');
        return;
    }
    // get details
    yield* response.map((id) => {
        return put(fetchPicsumAction.request(id));
    });
}

/**
 * Flow Saga
 * @param action fetch from Search screen
 */
function* handleFetchSearch(action: FetchSearchRequestAction): SagaIterator {}

export default function* rootSaga() {
    yield all([
        takeLatest(getType(fetchActivityAction.request), handleFetchLivestages),
        takeLatest(getType(fetchSearchAction.request), handleFetchSearch)
    ]);
}
