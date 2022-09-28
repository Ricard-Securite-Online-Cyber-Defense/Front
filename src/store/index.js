import Vue from 'vue'
import Vuex from 'vuex'
import frisbee from "@/store/modules/frisbee";
import range from "@/store/modules/range";
import ingredient from "@/store/modules/ingredient";
import process from "@/store/modules/process"
import step from "@/store/modules/step";
import ApiService from "@/services/api.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {
        login(state, params) {
            return new Promise((resolve, reject) => {
                ApiService.post("/login", params)
                    .then(({data}) => {
                        sessionStorage.setItem('token', data.token)
                    }).catch(e => reject(e))
            })
        },
    },
    modules: {
        frisbee,
        range,
        ingredient,
        process,
        step
    }
})
