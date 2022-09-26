import Vue from 'vue'
import Vuex from 'vuex'
import frisbee from "@/store/modules/frisbee";
import range from "@/store/modules/range";
import ingredient from "@/store/modules/ingredient";
import process from "@/store/modules/process"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        frisbee,
        range,
        ingredient,
        process
    }
})
