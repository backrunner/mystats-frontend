import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import './plugins/element.js'

// set up axios
Vue.use(VueAxios, axios)

// import moment
import moment from "moment"
Vue.prototype.$moment = moment

Vue.config.productionTip = false

// 默认 title
document.title = 'myStatics'

// 修改页面 title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')