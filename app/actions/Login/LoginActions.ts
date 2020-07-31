import {createAsyncAction, createAction} from 'typesafe-actions';

const LOGIN_REQUEST = 'login/REQUEST';
const LOGIN_REQUEST_SUCCESS = 'login/REQUEST_SUCCESS';
const LOGIN_REQUEST_FAILED = 'login/REQUEST_FAILED';

const INFO_UPDATE = 'login/UPDATE_INFOS';

interface RequestModel {
    email: string;
    password: string;
}

interface RequestSuccessModel {}

interface RequestFailureModel {
    error?: string;
}

export const loginAction = createAsyncAction(
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILED
)<RequestModel, RequestSuccessModel, RequestFailureModel>();

interface UpdateModel {
    input: string;
    error?: boolean;
}

export const loginInfoUpdateAction = createAction(INFO_UPDATE)<UpdateModel>();
