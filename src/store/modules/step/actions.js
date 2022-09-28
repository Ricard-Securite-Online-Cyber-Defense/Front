import ApiService from "@/services/api.service";

export default {
    get(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/step/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    index(state) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/step`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    create(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/step", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    update(state, {id, params}) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/step/${id}`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/step/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}