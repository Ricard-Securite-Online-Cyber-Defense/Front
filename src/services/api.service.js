import axios from 'axios'

const authorization  = sessionStorage.getItem('token') ? 'Bearer ' + sessionStorage.getItem('token') : null

axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': authorization,
};

const ApiService = {
    baseURL : 'http://localhost:8000/api',

    get(resource, params, extra = {}) {
        let qs = require('qs');
        let p = { params: params, paramsSerializer: params => {
                return qs.stringify(params,{ skipNulls: true })
            } };

        let options = { ...p, ...extra };
        return axios.get(this.baseURL+`${resource}`, options)
    },

    post(resource, params, config={}) {
        return axios.post(this.baseURL+`${resource}`, params, config)
    },

    put(resource, params) {
        return axios.put(this.baseURL+`${resource}`, params)
    },

    delete(resource, params, extra = {}) {
        var qs = require('qs');
        let p = { params: params, paramsSerializer: params => {
                return qs.stringify(params,{ skipNulls: true })
            } };

        let options = { ...p, ...extra };

        return axios.delete(this.baseURL+`${resource}`, options)
    },

    patch(resource, params) {
        return axios.patch(`${this.baseURL}${resource}`, params)
    }
};

export default ApiService;
