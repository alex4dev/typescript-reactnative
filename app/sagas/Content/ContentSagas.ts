import Dbg from 'utils/dbgUtils';
import {FetchPicsumRequestAction} from './../../actions/index';
import {fetchPicsumAction} from 'actions';
import {getType} from 'typesafe-actions';
import {takeEvery, all, call, put} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {PicsumApi, createAPI} from 'services/PicsumApi';
import {PicsumDetails} from 'states';

const api: PicsumApi = createAPI();

function* picsumDetailSaga(action: FetchPicsumRequestAction): SagaIterator {
    yield call(picsumDescriptionWatcher, action.payload);
}

/**
 * Common Saga - take Picsum description by id
 * @param id
 */
function* picsumDescriptionWatcher(id: string): SagaIterator {
    if (id === undefined || id === null) {
        Dbg.warn(picsumDescriptionWatcher.name, 'missing informations');
        return;
    }
    Dbg.debug(picsumDescriptionWatcher.name, 'get details with id', id);
    const data = yield call(api.getDetail, id);
    if (data && isPicsumDescription(data)) {
        yield put(fetchPicsumAction.success(data));
    } else {
        yield put(fetchPicsumAction.failure(''));
    }
}

function isPicsumDescription(arg: any): arg is PicsumDetails {
    return arg.id !== undefined && arg.author !== undefined;
}

export default function* rootSaga() {
    yield all([takeEvery(getType(fetchPicsumAction.request), picsumDetailSaga)]);
}
