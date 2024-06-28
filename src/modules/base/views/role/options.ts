import type { FormRules } from 'element-plus'

const checkCode = (_rule: any, value: any, callback: any) => {
	const reg = /^[a-zA-Z]+$/
	if (value == '') return callback()
	if (!reg.test(value)) callback(new Error('请输入英文字符的编码'))
	callback()
}

export const rules: FormRules = {
	name: [
		{ required: true, message: '名称不能为空', trigger: 'blur' },
		{ max: 8, message: '名称不得超过8个字符', trigger: 'blur' }
	],
	code: [
		{ required: true, message: '编码不能为空', trigger: 'blur' },
		{ validator: checkCode, trigger: 'change' },
		{ max: 20, message: '编码不得超过 20 个字符', trigger: 'blur' }
	],
	remark: [
		{ max: 200, message: '备注信息不得超过200个字符', trigger: 'blur' }
	]
}

export const treeProps = {
	children: 'children',
	label: 'name'
}
