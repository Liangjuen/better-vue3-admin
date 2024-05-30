import { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
	{
		path: '/index',
		name: 'Home',
		component: () => import('~/modules/home/index.vue')
	}
]
