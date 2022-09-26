import ApiService from "@/services/api.service";

export default {
    get(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/range`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    index(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/range`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    post(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/range", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    patch(state, id, params) {
        return new Promise((resolve, reject) => {
            ApiService.patch(`/range/${id}`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.patch(`/range/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}