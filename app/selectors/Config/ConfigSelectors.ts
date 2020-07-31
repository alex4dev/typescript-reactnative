import {getConfigState} from './../index';
import {createSelector} from 'reselect';

export const getActiveAlert = createSelector(
    getConfigState,
    (configState) => configState.activeAlert
);

export const getAlertShowing = createSelector(
    getActiveAlert,
    (activeAlert) => activeAlert !== null
);
