import {call} from 'redux-saga/effects';
import Dbg from 'utils/dbgUtils';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const doAsyncAuthorize = async (): Promise<any> => {
    let authState;
    try {
        await sleep(2000);
        authState = {}; // call service
    } catch (error) {
        Dbg.error(doAsyncAuthorize.name, 'Failed to get token', error.message);
    }
    return authState;
};
