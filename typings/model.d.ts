/**
 * 抽屉
 */
interface DrawerModel {
	type: 'create' | 'update'
	title: string
	opened: boolean
	[key: string]: any
}

/**
 * 对话框
 */
interface DialogModel {
	type: 'create' | 'update'
	title: string
	opened: boolean
	[key: string]: any
}
