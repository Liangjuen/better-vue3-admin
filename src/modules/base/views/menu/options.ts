import { config } from '~/config'
import { pathToThree, modulePaths } from '~/utils'

export const componentCascaderOption = pathToThree(
	modulePaths(config.ignore.modules)
)

export const treeSelectProps = {
	children: 'children',
	label: 'name',
	value: 'id'
}

export const typeOptions = [
	{ label: '目录', value: 1 },
	{ label: '菜单', value: 2 },
	{ label: '权限', value: 3 }
]

export const options = {
	type: [
		{ label: '目录', value: 1 },
		{ label: '菜单', value: 2 },
		{ label: '权限', value: 3 }
	],
	view: [
		{ label: '默认', value: 0 },
		{ label: '外链', value: 1 },
		{ label: '内嵌网页', value: 2 },
		{ label: '新窗口打开', value: 3 }
	],
	hidden: [
		{ label: '显示', value: 0 },
		{ label: '隐藏', value: 1 }
	],
	cache: [
		{ label: '关闭', value: 0 },
		{ label: '开启', value: 1 }
	],
	status: [
		{ label: '禁用', value: 0 },
		{ label: '启用', value: 1 }
	]
}

export const permsTreeSelectProps = { multiple: true }

export const rules = {
	name: [
		{ required: true, message: '节点名称不能为空', trigger: 'blur' },
		{ max: 16, message: '节点名称不得超过16个字符', trigger: 'blur' }
	],
	sort: [{ required: true, message: '排序号不能为空', trigger: 'blur' }],
	path: [
		{ required: true, message: '节点路由不能为空', trigger: 'blur' },
		{ max: 80, message: '节点路由不得超过80个字符', trigger: 'blur' }
	],
	component: [
		{ required: true, message: '文件路径不能为空', trigger: 'blur' }
	],
	perms: [{ required: true, message: '权限不能为空', trigger: 'blur' }]
}
