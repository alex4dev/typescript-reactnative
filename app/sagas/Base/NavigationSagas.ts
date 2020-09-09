import {takeLatest, all} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import {NavigateAction, BackAction, navigateAction, backAction} from 'actions';
import NavigationService from 'navigation/NavigationService';
import Dbg from 'utils/dbgUtils';

function* handleNavigateToScreen(action: NavigateAction): SagaIterator {
    const screenId = action.payload.name;
    const params = action.payload.params;
    NavigationService.navigate(screenId, params);
}

function* handleBackToPreviousScreen(action: BackAction): SagaIterator {
    NavigationService.back();
}

export default function* rootSaga() {
    yield all([
        takeLatest(getType(navigateAction), handleNavigateToScreen),
        takeLatest(getType(backAction), handleBackToPreviousScreen)
    ]);
}
