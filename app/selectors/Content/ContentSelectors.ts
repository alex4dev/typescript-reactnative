import {createSelector} from 'reselect';
import {getContentState} from 'selectors';
import {PicsumDetails} from 'states';

export const getPicSumDetails = createSelector(
    getContentState,
    (contentState): ReadonlyMap<string, PicsumDetails> => contentState.picsumMap
);
