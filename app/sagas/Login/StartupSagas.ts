import Dbg from 'utils/dbgUtils';
import {StartupAction, startupAction} from 'actions';
import {SagaIterator} from 'redux-saga';
import {getType} from 'typesafe-actions';
import {takeLatest, call, delay, put} from 'redux-saga/effects';

function* handleStartup(action: StartupAction): SagaIterator {
    Dbg.info(handleStartup.name, 'start check version');
    yield delay(1000);
    yield put(startupAction.success());
}

export default function* rootSaga() {
    yield takeLatest(getType(startupAction.request), handleStartup);
}
