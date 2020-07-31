import axios from 'axios';

const baseURL = '';
let authorizationBearer: string;

export const setAuthorizationBearer = (token: string): any => {
    authorizationBearer = token;
};

type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

function axiosRequest(
    method: methodType,
    url: string,
    params: any,
    headers: any
): Promise<unknown> {
    return new Promise((resolve, reject) => {
        axios({
            baseURL,
            method,
            url,
            timeout: 30000,
            ...params,
            headers: {
                ...headers
            }
        })
            .then(
                (payload) => {
                    resolve(payload.data);
                },
                (payload) => {
                    if (payload.response) {
                        const {response} = payload;
                        if (response.status === 200) {
                            resolve(response.data);
                        } else {
                            reject(response);
                        }
                    } else {
                        reject(payload);
                    }
                }
            )
            .catch((e) => {
                throw e;
            });
    });
}

/* ------ Request POST ------ */
export const axiosPost = (url: string, params: any, timeout = null): Promise<unknown> => {
    const p = {
        sendToken: true,
        data: {},
        ...params
    };
    const headers: any = {};
    if (p.sendToken && authorizationBearer) {
        headers.Authorization = `Bearer ${authorizationBearer}`;
    }
    const reqParams: any = {data: p.data};
    if (timeout) {
        reqParams.timeout = timeout;
    }
    return axiosRequest('POST', url, reqParams, headers);
};

/* ------ Request PUT ------ */
export const axiosPut = (url: string, params: any, timeout = null): Promise<unknown> => {
    const p = {sendToken: true, data: {}, ...params};
    const headers: any = {};
    if (p.sendToken && authorizationBearer) {
        headers.Authorization = `Bearer ${authorizationBearer}`;
    }
    const reqParams: any = {data: p.data};
    if (timeout) {
        reqParams.timeout = timeout;
    }
    return axiosRequest('PUT', url, reqParams, headers);
};

/* ------ Request GET ------ */
export const axiosGet = (url: string, params: any = null, timeout = null): Promise<unknown> => {
    const p = {sendToken: true, params: {}, ...params};
    const headers: any = {};
    if (p.sendToken && authorizationBearer) {
        headers.Authorization = `Bearer ${authorizationBearer}`;
    }
    const reqParams: any = {params: p.params};
    if (timeout) {
        reqParams.timeout = timeout;
    }
    return axiosRequest('GET', url, reqParams, headers);
};

/* ------ Request DELETE ------ */
export const axiosDelete = (url: string, params: any, timeout = null): Promise<unknown> => {
    const p = {sendToken: true, ...params};
    const headers: any = {};
    if (p.sendToken && authorizationBearer) {
        headers.Authorization = `Bearer ${authorizationBearer}`;
    }
    const reqParams: any = {params: p.params};
    if (timeout) {
        reqParams.timeout = timeout;
    }
    return axiosRequest('DELETE', url, reqParams, headers);
};

/* ------ Request POST files ------ */
export const axiosPostFilesData = (url: string, params: any, timeout = 60000): Promise<unknown> => {
    const p = {
        sendToken: true,
        data: {},
        headers: {},
        ...params
    };
    const {headers} = p;
    if (p.sendToken && authorizationBearer) {
        headers.Authorization = `Bearer ${authorizationBearer}`;
    }
    const reqParams: any = {data: p.data};
    if (timeout) {
        reqParams.timeout = timeout;
    }
    return axiosRequest('POST', url, reqParams, headers);
};
