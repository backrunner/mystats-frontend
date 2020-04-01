import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/landing/Home.vue'
import store from '../store'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'landing.home',
        component: Home,
        meta: {
            title: 'myStats'
        }
    },
    {
        path: '/portal',
        name: 'landing.portal',
        component: () => import( /* webpackChunkName: "landing.portal" */ '../views/landing/Portal.vue'),
        meta: {
            title: '登录 - myStats'
        }
    },
    {
        path: '/app',
        name: 'app.main',
        component: () => import( /* webpackChunkName: "app.main" */ '../views/app/Main.vue'),
        meta: {
            title: 'myStatics',
            require: 'user'
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.page.dashboard',
                component: () => import( /* webpackChunkName: "app.page.dashboard" */ '../views/app/pages/Dashboard.vue'),
                meta: {
                    title: '仪表盘',
                    require: 'user'
                }
            },
            {
                path: 'appmanage',
                name: 'app.page.appManage',
                component: () => import( /* webpackChunkName: "app.page.appManage" */ '../views/app/pages/AppManage.vue'),
                meta: {
                    title: '应用管理',
                    require: 'user'
                },
                children: [{
                    path: ':appId',
                    name: 'app.page.appManage.appDetail',
                    component: () => import( /* webpackChunkName: "app.page.appDetail" */ '../views/app/pages/AppDetail.vue'),
                    meta: {
                        title: '应用详情',
                        paramName: 'appId',
                        require: 'user'
                    }
                }]
            },
            {
                path: 'usersettings',
                name: 'app.page.userSettings',
                component: () => import( /* webpackChunkName: "app.page.userSettings" */ '../views/app/pages/UserSettings.vue'),
                meta: {
                    title: '用户设置',
                    require: 'user'
                }
            },
            {
                path: 'report',
                name: 'app.page.report',
                component: () => import( /* webpackChunkName: "app.page.report" */ '../views/app/pages/Report.vue'),
                meta: {
                    title: '数据报表',
                    require: 'user'
                }
            },
            {
                path: 'doc',
                name: 'app.page.doc',
                component: () => import( /* webpackChunkName: "app.page.userSettings" */ '../views/app/pages/Doc.vue'),
                meta: {
                    title: '使用文档',
                    require: 'user'
                }
            },
            {
                path: 'manageuser',
                name: 'app.page.admin.manageuser',
                component: () => import( /* webpackChunkName: "app.page.admin.manageuser" */ '../views/app/pages/manageUser.vue'),
                meta: {
                    title: '用户管理',
                    require: 'admin'
                }
            },
            {
                path: 'manageapp',
                name: 'app.page.admin.manageapp',
                component: () => import( /* webpackChunkName: "app.page.admin.manageapp" */ '../views/app/pages/manageApp.vue'),
                meta: {
                    title: '应用管理',
                    require: 'admin'
                }
            },
            {
                path: 'announcement',
                name: 'app.page.admin.announcement',
                component: () => import( /* webpackChunkName: "app.page.admin.announcement" */ '../views/app/pages/Announcement.vue'),
                meta: {
                    title: '公告管理',
                    require: 'admin'
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

async function getUserInfo() {
    let res = await axios.get('/api/user/fetchUserInfo')
    if (res.status == 200 && res.data.data) {
        store.commit('userinfo/setUserInfo', res.data.data)
    }
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(r => r.meta.require == 'admin')) {
        if (!store.state.userinfo.username) {
            await getUserInfo();
        }
        if (store.state.userinfo.role != 'admin') {
            next({
                name: 'error.404'
            })
            return
        }
        next()
    } else if (to.matched.some(r => r.meta.require == 'user')) {
        if (store.state.userinfo.username == null) {
            await getUserInfo();
            const username = store.state.userinfo.username;
            if (!username || username.length < 0) {
                next({
                    name: 'landing.portal',
                    query: {
                        redirect: to.fullPath
                    }
                })
                return
            }
        }
        next()
    }
    next()
})

export default router
