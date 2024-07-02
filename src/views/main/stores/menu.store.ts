import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMenu } from '~/hooks/common'

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
// const modules = import.meta.glob(['@/modules/**/{views,pages}/**/**.vue'])

export const useMenuStore = defineStore(
	'menu',
	() => {
		const { menuListToTree, menuMappingRoutes, sort } = useMenu()
		// 元数据
		const list = ref<Menu.List>([])

		// 菜单列表
		const tree = ref<Menu.List>([])

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
			perms,
			sort,
			mapRoutes,
			toTree
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: ['list', 'tree', 'perms']
		}
	}
)
