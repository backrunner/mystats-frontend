import Vue from 'vue'
import VueBus from 'vue-bus'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
import router from './router'
import qs from "qs"
import { VueReCaptcha } from 'vue-recaptcha-v3'
import './plugins/element.js'
import keys from './keys';

// 按需引入图表
import VeLine from 'v-charts/lib/line.common'
import VeBar from 'v-charts/lib/bar.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeBar.name, VeBar)

// 配置axios
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
    return qs.stringify(data, {
        arrayFormat: 'brackets'
    })
}]

axios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response) {
            // 拦截401，发生401就跳回登录
            if (error.response.status == 401) {
                router.push({
                    name: 'landing.portal'
                })
            }
            return Promise.reject(error.response.data)  // 返回接口返回的错误信息
        }
    }
);

// set up axios
Vue.use(VueAxios, axios)

// set up lazyload
Vue.use(VueLazyload)

// set up vue bus
Vue.use(VueBus)

// set up recaptcha
Vue.use(VueReCaptcha, {
    siteKey: keys.recaptcha,
    loaderOptions: {
        useRecaptchaNet: true
    }
});

// import moment
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
