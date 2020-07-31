import {createAction, createAsyncAction} from 'typesafe-actions';
import {AlertNames} from 'constants/alertConstants';
import {AnyAction} from 'redux';
import {AlertButton} from 'react-native';

const SHOW_REQUEST = 'alert/SHOW/REQUEST';
const SHOW_SUCCESS = 'alert/SHOW/SUCCESS';
const SHOW_FAILED = 'alert/SHOW/FAILED';

const HIDE_REQUEST = 'alert/HIDE/REQUEST';
const HIDE_SUCCESS = 'alert/HIDE/SUCCESS';
const HIDE_FAILED = 'alert/HIDE/FAILED';

const CHANNEL_SHOW = 'alert/CHANNELSHOW';
const CHANNEL_PUT = 'alert/CHANNELPUT';
const CHANNEL_CALL = 'alert/CHANNELCALL';

export interface AlertModel {
    name: AlertNames;
    title: string;
    message: string;
    buttons: Array<AlertButton | ButtonRequestModel>;
    options?: any;
}

export interface ButtonRequestModel {
    put?: AnyAction;
    call?(): void;
    actions?: any;
    text?: string;
}

interface AlertRequestModel {
    name: AlertNames;
}

interface ChannelCallRequestModel {
    method(): Promise<void>;
    args?: any;
}

export const alertShowAction = createAsyncAction(SHOW_REQUEST, SHOW_SUCCESS, SHOW_FAILED)<
    AlertRequestModel,
    AlertRequestModel,
    AlertRequestModel
>();

export const alertHideAction = createAsyncAction(HIDE_REQUEST, HIDE_SUCCESS, HIDE_FAILED)<
    string,
    string,
    string
>();

export const alertChannelShowAction = createAction(CHANNEL_SHOW)<AlertModel>();

export const alertChannelPutAction = createAction(CHANNEL_PUT)<AnyAction>();

export const alertChannelCallAction = createAction(CHANNEL_CALL)<ChannelCallRequestModel>();
