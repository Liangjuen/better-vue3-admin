import {
	createRouter,
	RouteRecordRaw,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'

import { Router } from './type'
import { useGlobal } from '~/views'
import { config } from '~/config'
import { staticRoutes } from './routes'

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
const modules = import.meta.glob(['~/modules/**/{views,pages}/**/**.vue'])

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Layout',
		component: () => import('~/views/main/index.vue'),
		children: [...staticRoutes]
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

const router = createRouter({
	history:
		config.app.router.mode == 'history'
			? createWebHistory()
			: createWebHashHistory(),
	routes
}) as Router

router.find = (path: string) => {
	return router.getRoutes().find((e) => {
		if (path == '/') {
			return e.path == path && e.name == 'Layout'
		} else {
			return e.path == path
		}
	})
}

router.append = (data) => {
	const list = Array.isArray(data) ? data : [data]

	list.forEach((d) => {
		d.meta = d.meta ? d.meta : {}

		// 组件路径
		const url = d.path

		if (url) {
			// 外链
			if (url.indexOf('http') == 0) {
				if (d.meta) {
					d.meta.iframeUrl = url
				}
				// 设置外链组件
				d.component = () =>
					import('~/modules/demo/views/home/index.vue')
			} else {
				// 组件路径
				d.component = modules[`/src/modules/${d.component}`]
			}
		} else {
			d.redirect = '/404'
		}

		// 是否动态添加
		d.meta.dynamic = true

		if (d.isPage) {
			router.addRoute(d as any)
		} else {
			router.addRoute('Layout', d as any)
		}
	})
}

router.register = async (path) => {
	const isReg = Boolean(router.find(path))

	if (!isReg) {
		const { menuStore } = useGlobal()
		const list = menuStore.menuMappingRoutes().map((e) => {
			return {
				...e,
				isPage: e.path?.includes('/pages')
			}
		})

		// 需要注册的路由
		const route = list.find((e) => e.path == path)

		if (route) {
			router.append(route)
		}
	}

	return { isReg, route: router.find(path) }
}

router.beforeEach(async (to, _from, next) => {
	const { processStore } = useGlobal()
	const { isReg, route } = await router.register(to.path)

	// 组件不存在、路由不存在
	if (!route?.components) {
		next('/404')
	} else {
		// 添加路由进程
		if (!isReg) {
			next({ ...to, ...route })
		} else {
			processStore.add(to)
			next()
		}
	}
})

router.afterEach((to) => {
	// 设置标题
	document.title = to.meta.label
		? to.meta.label + ' | ' + config.app.name
		: config.app.name
})

export { router }
