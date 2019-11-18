import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/landing/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing.home',
    component: Home
  },
  {
    path: '/login',
    name: 'landing.login',
    component: () => import(/* webpackChunkName: "landing.login" */ '../views/landing/Login.vue')
  },
  {
    path: '/register',
    name: 'landing.register',
    component: () => import(/* webpackChunkName: "landing.register" */ '../views/landing/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
