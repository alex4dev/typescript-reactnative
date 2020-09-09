import {Reducer} from 'redux';
import {getType} from 'typesafe-actions';
import {fetchActivityAction, fetchSearchAction} from 'actions/Home/HomeActions';
import {ContentState, PicsumDetails} from 'states';
import {FetchPicsumAction, fetchPicsumAction} from 'actions';
import Dbg from 'utils/dbgUtils';

/* ------------- Action Type ------------- */

export type ContentAction = FetchPicsumAction;

/* ------------- Initial State ------------- */

const initialState: ContentState = {
    picsumMap: new Map<string, PicsumDetails>() // Ne pas initialiser à NULL
};

/* ------------- Reducer ------------- */

const reducer: Reducer<ContentState, ContentAction> = (
    state: ContentState = initialState,
    action: ContentAction
): ContentState => {
    switch (action.type) {
        case getType(fetchPicsumAction.request): {
            return {...state};
        }
        case getType(fetchPicsumAction.success): {
            const items = new Map<string, PicsumDetails>(state.picsumMap.entries()) as Map<
                string,
                PicsumDetails
            >;
            if (action.payload && !items.has(action.payload.id)) {
                items.set(action.payload.id, action.payload);
            }
            return {
                ...state,
                picsumMap: items
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
