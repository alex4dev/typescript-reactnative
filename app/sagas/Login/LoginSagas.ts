import {navigateAction} from './../../actions/Base/NavigationActions';
import Dbg from 'utils/dbgUtils';
import {SagaIterator} from 'redux-saga';
import {put, race, take, call, fork, takeLatest, all, select, delay} from 'redux-saga/effects';
import {LoginRequestAction, loginAction} from 'actions';
import {getType} from 'typesafe-actions';
import {doAsyncAuthorize} from 'services/LoginService';
import {RouteNames} from 'constants/navigationConstants';

function* handleLoginRequest(action: LoginRequestAction): SagaIterator {
    Dbg.info(handleLoginRequest.name, 'start login');
    const loginInfos: any = yield call(doAsyncAuthorize);

    if (loginInfos) {
        yield put(loginAction.success(null));
        yield put(navigateAction({name: RouteNames.home}));
    } else {
        yield put(loginAction.failure(null));
    }
}

export default function* rootSaga() {
    yield all([takeLatest(getType(loginAction.request), handleLoginRequest)]);
}
