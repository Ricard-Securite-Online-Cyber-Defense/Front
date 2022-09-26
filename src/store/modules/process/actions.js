import ApiService from "@/services/api.service";

export default {
    get(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/process`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    index(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/process`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    post(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/process", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    patch(state, id, params) {
        return new Promise((resolve, reject) => {
            ApiService.patch(`/process/${id}`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.patch(`/process/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}