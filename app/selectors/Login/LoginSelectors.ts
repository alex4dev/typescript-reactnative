import {getLoginState} from '../index';
import {LoginState} from 'states';
import {createSelector} from 'reselect';

export const getIsAppReady = createSelector(
    getLoginState,
    (loginState: LoginState): boolean => loginState.isAppReady
);

export const getIsLoginLoading = createSelector(
    getLoginState,
    (loginState: LoginState): boolean => loginState.loading
);

export const getIsLogin = createSelector(
    getLoginState,
    (loginState: LoginState): boolean => loginState.isLogin
);
