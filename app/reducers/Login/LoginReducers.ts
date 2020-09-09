import {loginAction, loginInfoUpdateAction} from 'actions/Login/LoginActions';
import {startupAction} from 'actions/Startup/StartupActions';
import {LoginAction, LoginInfoUpdateAction, StartupAction} from 'actions';
import {LoginState} from 'states';
import {getType} from 'typesafe-actions';
import {Reducer} from 'redux';
import Dbg from 'utils/dbgUtils';

/* ------------- Types and Action Creators ------------- */

type LAction = LoginAction | LoginInfoUpdateAction | StartupAction;

/* ------------- Initial State ------------- */

const initialState: LoginState = {
    loading: true,
    isAppReady: false,
    isLogin: false
};

/* ------------- Function Reducers ------------- */

function startupReducer(state: LoginState, action: StartupAction): LoginState {
    switch (action.type) {
        case getType(startupAction.request): {
            return {...state, loading: true};
        }
        case getType(startupAction.failure): {
            return {...state, loading: false};
        }
        case getType(startupAction.success): {
            return {...state, isAppReady: true, loading: false};
        }
        default: {
            return state;
        }
    }
}

function doLoginReducer(state: LoginState, action: LoginAction): LoginState {
    Dbg.info(doLoginReducer.name, 'action receiveid ' + action.type);
    switch (action.type) {
        case getType(loginAction.request): {
            return {...state, loading: true};
        }
        case getType(loginAction.success): {
            return {
                ...state,
                loading: false,
                isLogin: true
            };
        }
        case getType(loginAction.failure): {
            const {error} = action.payload;
            return {...state, loading: false};
        }
        default: {
            return state;
        }
    }
}

/* ------------- Main Reducer ------------- */

const reducer: Reducer<LoginState, LoginAction> = (
    state: LoginState = initialState,
    action: LAction
): LoginState => {
    switch (action.type) {
        case getType(startupAction.request):
        case getType(startupAction.success):
        case getType(startupAction.failure): {
            return startupReducer(state, action);
        }
        case getType(loginAction.request):
        case getType(loginAction.success):
        case getType(loginAction.failure): {
            return doLoginReducer(state, action);
        }
        default: {
            return state;
        }
    }
};

export default reducer;
