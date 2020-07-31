import {createAsyncAction} from 'typesafe-actions';

const STARTUP_REQUEST = 'startup/REQUEST';
const STARTUP_SUCCESS = 'startup/SUCCESS';
const STARTUP_FAILURE = 'startup/FAILURE';

export const startupAction = createAsyncAction(STARTUP_REQUEST, STARTUP_SUCCESS, STARTUP_FAILURE)<
    void,
    void,
    void
>();
