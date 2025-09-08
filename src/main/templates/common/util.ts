import axios, { Axios, AxiosRequestConfig } from 'axios';

const axiosProxy = new Proxy(axios, {
    set(target, property, value) {
        console.error('禁止修改数据')
        return false;
    }
})

export function httpPost(url: string, data: any, config: {
    params: Record<string, any>
}) {
    return axiosProxy({
        method: 'POST',
        url,
        data,
        ...config,
    })
}

export function httpGet(url: string, params: Record<string, any>) {
    return axiosProxy({
        method: 'GET',
        url,
        params,
    })
}
