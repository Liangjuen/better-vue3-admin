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
