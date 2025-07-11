import BaseLayout from '@renderer/layout/BaseLayout.vue'
import { RouteRecordRaw } from 'vue-router'

export const baseRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: BaseLayout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@renderer/pages/index/IndexPage.vue')
            }
        ]
    }
]
