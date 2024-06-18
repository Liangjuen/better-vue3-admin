import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listToTree } from '~/utils'

//双星号是递归解释器遍历文件和文件夹的占位符或指令。它是一个简单的递归通配符，而只有一个星号表示全部没有递归
// const modules = import.meta.glob(['@/modules/**/{views,pages}/**/**.vue'])

export const useMenuStore = defineStore(
	'menu',
	() => {
		// 元数据
		const list = ref<Menu.List>([])

		// 菜单列表
		const tree = ref<Menu.List>([])

		const perms = ref<string[]>([])

		// 树形化
		function menuListToTree(): Menu.List {
			const menuList = list.value.filter((i) => !i.hidden && i.type !== 3)
			tree.value = listToTree(menuList, 'id', 'pid')
			return tree.value
		}

		// 转路由
		function menuMappingRoutes() {
			const mapping = (m: Menu.Item) => {
				return {
					path: m.path as string,
					component: m.component,
					meta: {
						keepAlive: !!m.cache,
						label: m.name
					}
				}
			}
			return list.value.filter((m) => m.type == 2).map(mapping)
		}

		return {
			list,
			tree,
			perms,
			menuListToTree,
			menuMappingRoutes
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: ['list', 'tree', 'perms']
		}
	}
)
