import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { useAppStore } from './app.store'

export const useProcessStore = defineStore(
	'process',
	() => {
		const router = useRouter()
		const list = ref<Process.List>([])
		const excludes = ['/401', '/403', '/404', '/login', '/home']
		const caches = ref<string[]>([])

		// 是否存在
		const has = (path: string): boolean => {
			return !!list.value.find((t) => t.path == path)
		}

		// 添加
		function add(route: RouteLocationNormalized) {
			list.value.forEach((p) => {
				p.active = !!(route.path == p.path)
			})
			if (excludes.includes(route.path)) return
			if (route.path == '/' || has(route.path)) return
			const process = routeToTab(route)
			process.active = true
			list.value.push(process)
		}

		// 关闭当前选中
		function cleanCurrent(item: Process.Item) {
			let next: Process.Item | null = null
			if (item.active) {
				const idx = list.value.findIndex((i) => i.active)
				// 判断是否有其他选择项 返回
				next =
					idx > 0
						? list.value[idx - 1]
						: list.value.length > 1
							? list.value[idx + 1]
							: null
			}
			const newList = list.value.filter((e) => item.path !== e.path)
			list.value = newList
			if (next) {
				return router.push(next.path)
			} else if (item.active) {
				router.push('/')
			}
		}

		// 关闭所有
		function cleanAll() {
			list.value = []
		}

		// 关闭其它
		function cleanOther(item: Process.Item) {
			const newList = list.value.filter((e) => e.path === item.path)
			list.value = newList
			router.push(item.path)
		}

		// 关闭左侧
		function cleanLeft(item: Process.Item) {
			const index = list.value.findIndex((e) => e.path === item.path)
			if (index > 0) {
				list.value.splice(0, index)
			}
		}

		// 关闭右侧
		function cleanRight(item: Process.Item) {
			const index = list.value.findIndex((e) => e.path === item.path)
			if (index <= list.value.length - 1) {
				list.value.splice(index + 1, list.value.length - 1 - index)
			} else {
				list.value = []
			}
		}

		// 获取当前跳转路由组件名
		function getComponentName() {
			const currentMatched = router.currentRoute.value.matched
			if (!currentMatched.length) return ''
			const currentComponent =
				currentMatched[currentMatched.length - 1].components!.default
			return currentComponent.name || ''
		}

		function routeToTab(route: RouteLocationNormalized): Process.Item {
			const keepAlive = !!route.meta.keepAlive
			return {
				path: route.path,
				label: (route.meta.label || route.name) as string,
				icon: (route.meta.icon || '') as string,
				active: false,
				keepAlive
			}
		}

		// 清除缓存
		function cleanCache() {
			const app = useAppStore()
			caches.value = []
			app.refreshView()
		}

		// 设置缓存
		function setCache(route: RouteLocationNormalized) {
			const app = useAppStore()

			if (!route.meta.keepAlive) return false
			if (caches.value.length <= app.maxCache) {
				const componentName = getComponentName()
				if (!caches.value.includes(componentName) && componentName) {
					caches.value.push(componentName)
				}
			}
		}

		watch(
			() => list.value,
			(val) => {
				if (val.length == 0) router.push('/')
			}
		)

		return {
			list,
			caches,
			has,
			add,
			cleanCurrent,
			cleanAll,
			cleanCache,
			cleanOther,
			cleanLeft,
			cleanRight,
			routeToTab,
			getComponentName,
			setCache
		}
	},
	{
		persist: true
	}
)
