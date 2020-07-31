import {createSelector} from 'reselect';
import {getHomeState, getContentState} from 'selectors';
import {HomeDetails, PicsumDetails} from 'states';
import {getPicSumDetails} from '../Content/ContentSelectors';

export const getActivities = createSelector(getHomeState, (homeState) => homeState.activity);

export const getHomeLoading = createSelector(getHomeState, (homeState) => homeState.loading);

/**
 * Compose Selector - perfect for complex multipart objects
 */
export const getActivityDetails = createSelector(
    [getActivities, getPicSumDetails],
    (activitiyIds, picsumDetails): Array<HomeDetails> => {
        return activitiyIds.map((activity) => {
            return {id: activity, details: picsumDetails.get(activity)};
        });
    }
);

/**
 * Unified Selector - best for less refresh ui
 */
export const getActivityDetailsBis = createSelector(
    [getActivities, getPicSumDetails],
    (activitiyIds, picsumDetails): ReadonlyArray<PicsumDetails> =>
        activitiyIds.reduce<Array<PicsumDetails>>((details, key) => {
            if (picsumDetails.has(key)) details.push(picsumDetails.get(key));
            return details;
        }, [])
);
