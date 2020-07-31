import {FetchActivityAction, FetchSearchAction} from './../../actions/index';
import {Reducer} from 'redux';
import {ActionType, getType} from 'typesafe-actions';
import {fetchActivityAction, fetchSearchAction} from 'actions/Home/HomeActions';
import {HomeState} from 'states';

/* ------------- Action Type ------------- */

export type HomeAction = FetchActivityAction | FetchSearchAction;

/* ------------- Initial State ------------- */

const initialState: HomeState = {
    activity: [],
    loading: false,
    searchLoading: false,
    searchActivity: []
};

/* ------------- Reducer ------------- */

const reducer: Reducer<HomeState, HomeAction> = (
    state: HomeState = initialState,
    action: HomeAction
): HomeState => {
    switch (action.type) {
        case getType(fetchActivityAction.request): {
            return {...state, loading: true};
        }
        case getType(fetchActivityAction.success): {
            return {
                ...state,
                activity: action.payload,
                loading: false
            };
        }
        case getType(fetchActivityAction.failure): {
            return {...state, loading: false};
        }
        case getType(fetchSearchAction.request): {
            return {...state, searchLoading: true};
        }
        case getType(fetchSearchAction.success): {
            return {
                ...state
            };
        }
        case getType(fetchSearchAction.failure): {
            return {...state, searchLoading: false};
        }
        default: {
            return state;
        }
    }
};

export default reducer;
