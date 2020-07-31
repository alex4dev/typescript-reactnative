import {all, fork, spawn} from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import startupRootSaga from './Login/StartupSagas';
import loginRootSaga from './Login/LoginSagas';
import homeRootSaga from './Home/HomeSagas';
import navigationRootSaga from './Base/NavigationSagas';
import alertRootSaga from './Base/AlertSagas';

/* ------------- Connect Types To Sagas ------------- */

const sagas = [startupRootSaga, loginRootSaga, homeRootSaga];

const sagasBase = [navigationRootSaga, alertRootSaga];

export default function* root() {
    yield all(sagas.map((saga) => fork(saga)));
    yield all(sagasBase.map((saga) => spawn(saga)));
}
