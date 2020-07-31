import {takeLatest, all} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import NavigationService from '../../Navigation/NavigationService';
import {NavigateAction, BackAction, navigateAction, backAction} from 'actions';

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
