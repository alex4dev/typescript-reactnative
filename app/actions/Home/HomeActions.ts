import {createAsyncAction} from 'typesafe-actions';

const HOME_REQUEST = 'home/REQUEST';
const HOME_REQUEST_SUCCESS = 'home/REQUEST_SUCCESS';
const HOME_REQUEST_FAILED = 'home/REQUEST_FAILED';

const SEARCH_REQUEST = 'search/REQUEST';
const SEARCH_REQUEST_SUCCESS = 'search/REQUEST_SUCCESS';
const SEARCH_REQUEST_FAILED = 'search/REQUEST_FAILED';

interface RequestFailureModel {
    error?: Error;
}

export const fetchActivityAction = createAsyncAction(
    HOME_REQUEST,
    HOME_REQUEST_SUCCESS,
    HOME_REQUEST_FAILED
)<string, Array<string>, RequestFailureModel>();

export const fetchSearchAction = createAsyncAction(
    SEARCH_REQUEST,
    SEARCH_REQUEST_SUCCESS,
    SEARCH_REQUEST_FAILED
)<string, Array<string>, RequestFailureModel>();
