import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Layout',
		component: () => import('~/views/main/index.vue'),
		children: []
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('~/views/login/index.vue'),
		meta: {
			label: '登录'
		}
	},
	{
		path: '/401',
		name: 'Unauthorized',
		component: () => import('~/views/error/401.vue'),
		meta: {
			label: '401'
		}
	},
	{
		path: '/403',
		name: 'Forbidden',
		component: () => import('~/views/error/403.vue'),
		meta: {
			label: '403'
		}
	},
	{
		path: '/404',
		name: 'NotFound',
		component: () => import('~/views/error/404.vue'),
		meta: {
			label: '404'
		}
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('~/views/error/404.vue')
	}
]
