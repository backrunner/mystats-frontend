import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import userinfo from './modules/userinfo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        userinfo
    },
    strict: debug
})
