import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/landing/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'landing.home',
        component: Home,
        meta: {
            title: 'myStatics'
        }
    },
    {
        path: '/portal',
        name: 'landing.portal',
        component: () => import( /* webpackChunkName: "landing.portal" */ '../views/landing/Portal.vue'),
        meta: {
            title: '登录 - myStatics'
        }
    },
    {
        path: '/app',
        name: 'app.main',
        component: () => import( /* webpackChunkName: "app.main" */ '../views/app/Main.vue'),
        meta: {
            title: 'myStatics'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
