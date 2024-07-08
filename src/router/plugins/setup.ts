import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'

import { Router } from '../type'
import { useGlobal } from '~/store'
import { config } from '~/config'
import { modules } from '~/utils'
import { routes } from '../routes'
import { useUserStore } from '~/store'

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

			d.props = {}

			const { isPage, iframe, link } = d.meta

			// 优先级: link > iframe
			if (link) {
				d.meta.isLink = true
			} else {
				const component = modules()

				// 是否为 iframe
				d.component = iframe
					? component[`/src/modules/common/views/iframe-page.vue`]
					: component[`/src/modules/${d.component}`]

				// iframe 组件参数
				d.props = { ...d.props, ...(iframe ? { url: iframe } : {}) }

				// 是否动态添加
				d.meta.dynamic = true

				if (isPage) {
					router.addRoute(d as any)
				} else {
					router.addRoute('Layout', d as any)
				}
			}
		})
	}

	router.register = async (path) => {
		const isReg = Boolean(router.find(path))

		if (!isReg) {
			const { menuStore } = useGlobal()
			const list = menuStore.mapRoutes()

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
