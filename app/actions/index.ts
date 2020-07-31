import {fetchActivityAction, fetchSearchAction} from './Home/HomeActions';
import {loginAction, loginInfoUpdateAction} from './Login/LoginActions';
import {
    alertShowAction,
    alertHideAction,
    alertChannelShowAction,
    alertChannelPutAction,
    alertChannelCallAction
} from './Base/AlertActions';
import {navigateAction, backAction} from './Base/NavigationActions';
import {startupAction} from './Startup/StartupActions';
import {ActionType} from 'typesafe-actions';
import {fetchPicsumAction} from './Content/ContentActions';

// Actions
export {startupAction, fetchActivityAction, fetchPicsumAction, loginAction};
export {navigateAction, backAction};

// Actions Types
export type AlertShowAction = ActionType<typeof alertShowAction>;
export type AlertHideAction = ActionType<typeof alertHideAction>;

export type ChannelShowAction = ActionType<typeof alertChannelShowAction>;
export type ChannelPutAction = ActionType<typeof alertChannelPutAction>;
export type ChannelCallAction = ActionType<typeof alertChannelCallAction>;

export type FetchActivityAction = ActionType<typeof fetchActivityAction>;
export type FetchActivityRequestAction = ActionType<typeof fetchActivityAction.request>;
export type FetchActivitySuccessAction = ActionType<typeof fetchActivityAction.success>;
export type FetchActivityFailureAction = ActionType<typeof fetchActivityAction.failure>;

export type FetchSearchAction = ActionType<typeof fetchSearchAction>;
export type FetchSearchRequestAction = ActionType<typeof fetchSearchAction.request>;
export type FetchSearchSuccessAction = ActionType<typeof fetchSearchAction.success>;
export type FetchSearchFailureAction = ActionType<typeof fetchSearchAction.failure>;

export type FetchPicsumAction = ActionType<typeof fetchPicsumAction>;
export type FetchPicsumRequestAction = ActionType<typeof fetchPicsumAction.request>;
export type FetchPicsumSuccessAction = ActionType<typeof fetchPicsumAction.success>;
export type FetchPicsumFailureAction = ActionType<typeof fetchPicsumAction.failure>;

export type LoginAction = ActionType<typeof loginAction>;
export type LoginRequestAction = ActionType<typeof loginAction.request>;
export type LoginInfoUpdateAction = ActionType<typeof loginInfoUpdateAction>;

export type NavigateAction = ActionType<typeof navigateAction>;
export type BackAction = ActionType<typeof backAction>;

export type StartupAction = ActionType<typeof startupAction>;
