import {ConfigState, HomeState, LoginState, ContentState} from 'states';

export interface RootState {
    readonly config: ConfigState;
    readonly home: HomeState;
    readonly login: LoginState;
    readonly content: ContentState;
}
