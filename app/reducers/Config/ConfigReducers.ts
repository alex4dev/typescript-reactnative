import {ActionType, getType} from 'typesafe-actions';
import {Reducer} from 'redux';

import {alertShowAction, alertHideAction} from 'actions/Base/AlertActions';
import {AlertShowAction, AlertHideAction} from 'actions';
import {ConfigState} from 'states';

/* ------------- Action Type ------------- */

type ConfigAction = AlertShowAction | AlertHideAction;

/* ------------- Initial State ------------- */
const initialState: ConfigState = {
    activeAlert: null,
    darkMode: false,
    openFromLink: false
};

/* ------------- Reducers ------------- */
const reducer: Reducer<ConfigState, ConfigAction> = (
    state: ConfigState = initialState,
    action: ConfigAction
): ConfigState => {
    switch (action.type) {
        case getType(alertShowAction.success): {
            return {
                ...state,
                activeAlert: action.payload.name
            };
        }
        case getType(alertHideAction.success): {
            return {
                ...state,
                activeAlert: null
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
