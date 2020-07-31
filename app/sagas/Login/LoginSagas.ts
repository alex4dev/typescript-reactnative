import Dbg from 'utils/dbgUtils';
import {SagaIterator} from 'redux-saga';
import {put, race, take, call, fork, takeLatest, all, select, delay} from 'redux-saga/effects';
import {LoginRequestAction, loginAction} from 'actions';
import {getType} from 'typesafe-actions';
import {doAsyncAuthorize} from 'services/LoginService';

function* handleLoginRequest(action: LoginRequestAction): SagaIterator {
    Dbg.info(handleLoginRequest.name, 'start login');
    const loginInfos: any = yield call(doAsyncAuthorize);
    if (loginInfos) {
        yield put(loginAction.success(null));
    } else {
        yield put(loginAction.failure(null));
    }
}

export default function* rootSaga() {
    yield all([takeLatest(getType(loginAction.request), handleLoginRequest)]);
}
