import {createAction} from 'typesafe-actions';
import {RouteNames} from 'constants/navigationConstants';

const NAVIGATE = 'navigation/NAVIGATE';
const BACK = 'navigation/BACK';
const POP = 'navigation/POP';

interface RequestModel {
    name: RouteNames;
    params?: any;
}

export const navigateAction = createAction(NAVIGATE)<RequestModel>();
export const backAction = createAction(BACK)<void>();
