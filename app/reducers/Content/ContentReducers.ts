import {Reducer} from 'redux';
import {getType} from 'typesafe-actions';
import {fetchActivityAction, fetchSearchAction} from 'actions/Home/HomeActions';
import {ContentState, PicsumDetails} from 'states';
import {FetchPicsumAction, fetchPicsumAction} from 'actions';

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
            if (action.payload[0] && !items.has(action.payload[0].id)) {
                items.set(action.payload[0].id, action.payload[0]);
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
