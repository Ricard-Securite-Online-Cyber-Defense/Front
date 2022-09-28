import ApiService from "@/services/api.service";

export default {
    get(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/ingredient/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    index(state) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/ingredient`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    create(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/ingredient", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    update(state, {id, params}) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/ingredient/${id}`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/ingredient/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}