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
    index(state) {
        return new Promise((resolve, reject) => {
            ApiService.get(`/frisbee`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    create(state, params) {
        return new Promise((resolve, reject) => {
            ApiService.post("/frisbee", params)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    update(state, {id, params}) {
        console.log(params)
        return new Promise((resolve, reject) => {
            ApiService.put(`/frisbee/${id}`, params)
                .then(({data}) => {
                    console.log(data)
                    resolve(data)
                }).catch(e => reject(e))
        })
    },
    delete(state, id) {
        return new Promise((resolve, reject) => {
            ApiService.delete(`/frisbee/${id}`)
                .then(({data}) => {
                    resolve(data)
                }).catch(e => reject(e))
        })
    }
}