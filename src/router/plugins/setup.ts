import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'

import { Router } from '../type'
import { useGlobal } from '~/views'
import { config } from '~/config'
import { routes } from '../routes'
import { useUserStore } from '~/store'

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
const modules = import.meta.glob(['~/modules/**/{views,pages}/**/**.vue'])

/**
 * @description 初始化 router
 * @returns
 */
export function setupRouter() {
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
		const userStore = useUserStore()
		const { isReg, route } = await router.register(to.path)

		// 组件不存在、路由不存在
		if (!route?.components) {
			next('/404')
		} else {
			if (!isReg) {
				next({ ...to, ...route })
			} else {
				if (userStore.token) {
					// 在登录页面
					if (to.path == '/login') {
						return next('/')
					} else {
						// 添加路由进程
						processStore.add(to)
					}
				} else {
					// 未在登录页面
					if (to.path !== '/login') return next('/login')
				}
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

	return router
}
