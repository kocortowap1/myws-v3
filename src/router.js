import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Kamus from './views/Kamus.vue'

const token = sessionStorage.getItem('token');

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/mhs',
        component: () => import('./views/MHS.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/matakuliah',
        component: () => import('./views/Matakuliah.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/matakuliah/import/:id?',
        component: () => import('./components/matakuliah/importMK.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/matakuliah/form/:id?',
        component: () => import('./components/matakuliah/formMK.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/kelas',
        component: () => import('./views/Kelas.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },

    {
        path: '/kelas/import/:id?',
        component: () => import('./components/kelas/importKelas.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/kelas/form/:id?',
        component: () => import('./components/kelas/formKelas.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },

    {
        path: '/krs',
        component: () => import('./views/KRS.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/akm',
        component: () => import('./views/AKM.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/aktivitas',
        component: () => import('./views/Aktivitas.vue'),
        meta: {
            // requiredAuth: true,
            layout: 'admin'
        },
    },
    {
        path: '/kamus',
        component: Kamus,
        meta: {
            layout: 'admin'
        }
    },
]




const router = createRouter({
    routes,
    history: createWebHistory()
})
router.beforeEach((to, from, next) => {
    // console.log(sessionStorage.getItem('tokenRenderAt') < Date.now())
    //
    if (to.matched.some(record => record.meta.requiredAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!sessionStorage.getItem('token')) {
            next({
                path: '/login',
            })
        } else if (sessionStorage.getItem('tokenRenderAt') < Date.now()) {
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
