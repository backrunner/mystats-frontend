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
                path: 'manageUser',
                name: 'app.page.admin.manageuser',
                component: () => import( /* webpackChunkName: "app.page.admin.manageuser" */ '../views/app/pages/manageUser.vue'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: 'manageApp',
                name: 'app.page.admin.manageapp',
                component: () => import( /* webpackChunkName: "app.page.admin.manageapp" */ '../views/app/pages/manageApp.vue'),
                meta: {
                    title: '应用管理'
                }
            }
        ]
    },
    {
        path: '/error/404',
        name: 'error.404',
        component: () => import( /* webpackChunkName: "error.404" */ '../views/error/404.vue'),
        meta: {
            title: '404 not found'
        }
    },
    {
        path: '*',
        name: 'error.404.default',
        component: () => import( /* webpackChunkName: "error.404" */ '../views/error/404.vue'),
        meta: {
            title: '404 not found'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
