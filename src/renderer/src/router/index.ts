import { createRouter, createWebHashHistory, } from 'vue-router'
import { baseRoutes } from './modules/base'

const routes = [...baseRoutes]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
