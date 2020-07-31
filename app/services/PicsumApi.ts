import Dbg from 'utils/dbgUtils';
import {homeActivityData} from '../data/HomeData';
import {PicsumDetails} from 'states';
import {axiosGet} from 'utils/http';
// https://picsum.photos/id/{id}/200 'https://picsum.photos/id/{id}/info'

const PICSUM_BASE_URL = 'https://picsum.photos/';

export interface PicsumApi {
    getActivity: () => Promise<Array<string>>;
    getDetail: (id: string) => Promise<PicsumDetails>;
}

// our "constructor"
export const createAPI = (baseURL = PICSUM_BASE_URL): PicsumApi => {
    const getActivity = (): Promise<Array<string>> =>
        new Promise((resolve) => resolve(homeActivityData));
    const getDetail = (id: string): Promise<PicsumDetails> =>
        axiosGet(baseURL + 'id/' + id + '/info') as Promise<PicsumDetails>;
    return {getActivity, getDetail};
};

/* export const getPicsumDetail = async (id: string): Promise<PicsumDetails> => {
    let result: PicsumDetails;
    const url = PICSUM_DETAILS_URL.replace('{id}', id);
    try {
        result = (await axiosGet(url)) as PicsumDetails; // call service
    } catch (error) {
        Dbg.error(fetchActivity.name, 'Failed to get activity', error.message);
    }
    return result;
};
 */
