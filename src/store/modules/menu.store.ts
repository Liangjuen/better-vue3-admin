import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMenu } from '~/hooks/common'

export const useMenuStore = defineStore(
	'menu',
	() => {
		const { menuListToTree, menuMappingRoutes, sort } = useMenu()
		// 元数据
		const list = ref<Menu.List>([])

		// 菜单列表
		const tree = ref<Menu.List>([])

		const secondLevelMenus = ref<Menu.List>([])

		const perms = ref<string[]>([])

		// 树形化
		function toTree(): Menu.List {
			tree.value = menuListToTree(list.value)
			return tree.value
		}

		// 转路由
		function mapRoutes() {
			return menuMappingRoutes(list.value)
		}

		return {
			list,
			tree,
			secondLevelMenus,
			perms,
			sort,
			mapRoutes,
			toTree
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: ['list', 'tree', 'perms', 'secondLevelMenus']
		}
	}
)
