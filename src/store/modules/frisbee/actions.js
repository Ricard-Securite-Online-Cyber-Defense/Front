import ApiService from "@/services/api.service";

export default {
    get(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/frisbee`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    index(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/frisbee`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    post(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/frisbee", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    patch(state, id, params) {
        return new Promise((resolve, reject) => {
            ApiService.patch(`/frisbee/${id}`, params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.patch(`/frisbee/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}