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
                props: true,
                component: () => import('@renderer/pages/index/IndexPage.vue')
            },
            {
                path: 'template/page-video',
                name: 'pageVideoTemplate',
                props: (route) => route.query,
                component: () => import('@renderer/pages/viewTemplates/pageVideo/render')
            }
        ]
    }
]
