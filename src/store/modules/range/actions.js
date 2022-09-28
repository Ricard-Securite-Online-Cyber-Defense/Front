import ApiService from "@/services/api.service";

export default {
    get(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/range/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    index(state) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/range`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    create(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/range", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    update(state, {id, params}) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/range/${id}`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/range/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}