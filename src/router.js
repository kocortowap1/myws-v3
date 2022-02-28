import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Kamus from './views/Kamus.vue'

const token = localStorage.getItem('token');

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        meta: {
            requiredAuth: true
        },
    },
    {
        path: '/krs',
        component: () => import('./views/KRS.vue'),
        meta: {
            requiredAuth: true
        },
    },
    {
        path: '/aktivitas',
        component: () => import('./views/Aktivitas.vue'),
        meta: {
            requiredAuth: true
        },
    },
    {
        path: '/kamus',
        component: Kamus,
        meta: {
            requiredAuth: true
        }
    },
]




const router = createRouter({
    routes,
    history: createWebHistory()
})
router.beforeEach((to, from, next) => {
    console.log(sessionStorage.getItem('tokenRenderAt') < Date.now())

    if (to.matched.some(record => record.meta.requiredAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!sessionStorage.getItem('token')) {
            next({
                path: '/login',
            })
        }else if (sessionStorage.getItem('tokenRenderAt') < Date.now()){
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})
export default router
