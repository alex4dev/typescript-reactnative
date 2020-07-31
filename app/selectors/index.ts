import {RootState, HomeState, LoginState, ConfigState, ContentState} from 'states';

export const getConfigState = (state: RootState): ConfigState => state.config;

export const getContentState = (state: RootState): ContentState => state.content;

export const getHomeState = (state: RootState): HomeState => state.home;

export const getLoginState = (state: RootState): LoginState => state.login;
