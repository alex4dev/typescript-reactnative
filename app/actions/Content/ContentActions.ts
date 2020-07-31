import {PicsumDetails} from '../../interfaces/states/ContentState';
import {createAsyncAction} from 'typesafe-actions';

const PICSUM_REQUEST = 'picsum/REQUEST';
const PICSUM_REQUEST_SUCCESS = 'picsum/REQUEST_SUCCESS';
const PICSUM_REQUEST_FAILED = 'picsum/REQUEST_FAILED';

interface RequestFailureModel {
    error?: Error;
}

export const fetchPicsumAction = createAsyncAction(
    PICSUM_REQUEST,
    PICSUM_REQUEST_SUCCESS,
    PICSUM_REQUEST_FAILED
)<string, PicsumDetails, RequestFailureModel>();
