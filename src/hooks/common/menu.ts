import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { listToTree } from '~/utils'

import type { RouteAppendData } from '~/router/type'

export const useMenu = (menus: Menu.List = []) => {
	menus = JSON.parse(JSON.stringify(menus))
	const routes = ref<Array<RouteAppendData>>([])
	const tree = ref<Menu.List>([])

	/**
	 * 菜单排序
	 * @param list
	 * @returns
	 */
	const sort = (list: Menu.List) => list.sort((a, b) => a.sort - b.sort)

	menus = sort(menus)

	/**
	 * 菜单列表转路由数组
	 * @param list
	 * @returns
	 */
	const menuMappingRoutes = (list: Menu.List) => {
		list = JSON.parse(JSON.stringify(list)) as Menu.List
		const mapping = (m: Menu.Item) => {
			return {
				path: m.path as string,
				component: m.component,
				meta: {
					icon: m.icon,
					iframe: m.iframe,
					link: m.link,
					openNewWindow: !!m.openNewWindow,
					isPage: m.path?.includes('/pages'),
					keepAlive: !!m.cache,
					label: m.name,
					dynamic: false
				}
			}
		}
		return list.filter((m) => m.type == 2).map(mapping)
	}

	/**
	 * 菜单列表转树
	 * @param list
	 * @returns
	 */
	const menuListToTree = (list: Menu.List) => {
		list = JSON.parse(JSON.stringify(list)) as Menu.List
		const menuList = list.filter((i) => !i.hidden && i.type !== 3)

		return listToTree(menuList, 'id', 'pid')
	}

	/**
	 * get root menu by route
	 * @param list menu list
	 * @param currentRoute route
	 * @returns
	 */
	function getRootMenuByRoute(list: Menu.List) {
		const route = useRoute()
		const find = (item: Menu.Item): boolean => {
			if (item.path == route.path) return true
			if (item.children && item.children.length) {
				return !!item.children.find(find)
			}
			return false
		}
		return list.find(find)
	}

	routes.value = menuMappingRoutes(menus)
	tree.value = menuListToTree(menus)

	return {
		menuMappingRoutes,
		menuListToTree,
		sort,
		getRootMenuByRoute,
		routes,
		tree
	}
}
