import type { CascaderOption } from 'element-plus'

/**
 * @description 路径树形化
 * @param paths 路径数组
 * @param splitor 分割符
 * @returns
 */
export function pathToThree(paths: string[], splitor?: string) {
	const list: CascaderOption[] = []

	paths.forEach((e) => {
		const arr: string[] = e.split(splitor || '/').filter(Boolean)

		let c = list

		arr.forEach((a, i) => {
			let d = c.find((e) => e.label == a)

			if (!d) {
				d = {
					label: a,
					value: a,
					children: arr[i + 1] ? [] : undefined
				}

				c.push(d)
			}

			if (d.children) {
				c = d.children
			}
		})
	})

	return list
}

interface Tree extends Record<string, unknown> {
	children?: Array<Tree | never>
}

/**
 * @description 列表转树
 * @param list 列表
 * @param key 唯一标识
 * @param parentKey 唯一父标识
 * @returns 树
 */
export function listToTree<T extends Record<string, any>>(
	data: T[],
	key: string,
	parentKey: string
) {
	const list: T[] = JSON.parse(JSON.stringify(data))
	list.forEach((node) => {
		const pNdoe = list.find((row) => row[key] === node[parentKey]) as
			| Tree
			| undefined

		if (pNdoe) {
			pNdoe.children = pNdoe.children || []
			if (pNdoe.children.findIndex((i) => i[key] == node[key]) == -1) {
				pNdoe.children.push(node)
			}
		}
	})
	return list.filter((node) => !node[parentKey])
}

/**
 * @description 树型转列表
 * @param data 树
 * @returns 列表
 */
export function treeToList<T extends Record<string, any>>(data: T[]) {
	const tree: T[] = JSON.parse(JSON.stringify(data))
	const arr: T[] = []
	function deep(tree: T[]) {
		tree.forEach((e) => {
			arr.push(e)
			if (e.children && Array.isArray(e.children)) {
				deep(e.children)
			}
		})
	}

	deep(tree || [])

	return arr
}
