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
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.page.dashboard',
                component: () => import( /* webpackChunkName: "app.page.dashboard" */ '../views/app/pages/Dashboard.vue'),
                meta: {
                    title: '仪表盘'
                }
            },
            {
                path: 'appmanage',
                name: 'app.page.appManage',
                component: () => import( /* webpackChunkName: "app.page.appManage" */ '../views/app/pages/AppManage.vue'),
                meta: {
                    title: '应用管理'
                },
                children: [{
                    path: ':appId',
                    name: 'app.page.appManage.appDetail',
                    component: () => import( /* webpackChunkName: "app.page.appDetail" */ '../views/app/pages/AppDetail.vue'),
                    meta: {
                        title: '应用详情',
                        paramName: 'appId'
                    }
                }]
            },
            {
                path: 'usersettings',
                name: 'app.page.userSettings',
                component: () => import( /* webpackChunkName: "app.page.userSettings" */ '../views/app/pages/UserSettings.vue'),
                meta: {
                    title: '用户设置'
                }
            },
            {
                path: 'report',
                name: 'app.page.report',
                component: () => import( /* webpackChunkName: "app.page.report" */ '../views/app/pages/Report.vue'),
                meta: {
                    title: '数据报表'
                }
            },
            {
                path: 'admin',
                name: 'app.page.admin',
                component: () => import( /* webpackChunkName: "app.page.admin" */ '../views/app/pages/Admin.vue'),
                meta: {
                    title: '系统管理'
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
