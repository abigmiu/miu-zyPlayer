import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from './modules/base'

const routes = [...baseRoutes]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
