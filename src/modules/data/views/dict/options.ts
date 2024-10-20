import type { FormRules } from 'element-plus'

export const DictTypeRules: FormRules = {
	name: [
		{ required: true, message: '类型名不能为空', trigger: 'blur' },
		{ max: 20, message: '类型名不得超过20个字符', trigger: 'blur' }
	],
	key: [
		{ required: true, message: 'key不能为空', trigger: 'blur' },
		{ max: 20, message: 'key不得超过20个字符', trigger: 'blur' }
	]
}

export const dictRules: FormRules = {
	name: [
		{ required: true, message: '字典名不能为空', trigger: 'blur' },
		{ max: 20, message: '字典名不得超过20个字符', trigger: 'blur' }
	],
	value: [{ max: 500, message: '值不得超过500个字符', trigger: 'blur' }],
	remark: { max: 200, message: '备注信息不得超过200个字符', trigger: 'blur' }
}

export const treeSelectProps = {
	children: 'children',
	label: 'name',
	value: 'id'
}
