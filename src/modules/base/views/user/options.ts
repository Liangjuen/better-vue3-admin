import type { FormRules } from 'element-plus'
import { validator as val } from '~/utils'

const { checkUsername, checkPhone, checkEmail, checkPassword } = val

const checkTags = (_rule: any, value: string[] | null, callback: any) => {
	if (value == null) return callback()
	let flog = false
	for (const i of value) {
		if (i.length > 12) {
			flog = true
			break
		}
	}
	if (flog) callback(new Error('每个标签内容不得超过 12 字符'))
	callback()
}

export const personFormRules = {
	name: [
		{ required: true, message: '姓名不能为空', trigger: 'blur' },
		{ max: 20, message: '姓名不得超过20个字符', trigger: 'blur' }
	],
	username: [
		{ required: true, message: '用户名不能为空', trigger: 'blur' },
		{ validator: checkUsername, trigger: 'change' },
		{
			min: 3,
			max: 16,
			message: '用户名 3 - 16位',
			trigger: 'change'
		}
	],
	nickName: [
		{ required: true, message: '昵称不能为空', trigger: 'blur' },
		{ max: 10, message: '昵称不得超过10个字符', trigger: 'blur' }
	],
	remark: { max: 200, message: '备注信息不得超过200个字符', trigger: 'blur' },
	phone: [{ validator: checkPhone, trigger: 'change' }],
	email: [{ validator: checkEmail, trigger: 'change' }],
	tags: { validator: checkTags, trigger: 'change' }
}

export const rules: FormRules = {
	departmentId: { required: true, message: '部门不能为空', trigger: 'blur' },
	roles: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
	...personFormRules
}

export const passRules: FormRules = {
	password: [
		{ required: true, message: '请输入密码', trigger: 'change' },
		{ validator: checkPassword, trigger: 'change' },
		{ min: 8, max: 20, message: '密码长度在8-16', trigger: 'change' }
	],
	oldPassword: [
		{ required: true, message: '请输入原密码', trigger: 'change' },
		{ validator: checkPassword, trigger: 'change' },
		{ min: 8, max: 20, message: '密码长度在8-16', trigger: 'change' }
	],
	confirmPassword: [
		{ required: true, message: '请再次新输入密码', trigger: 'change' },
		{ validator: checkPassword, trigger: 'change' },
		{ min: 8, max: 20, message: '密码长度在8-16', trigger: 'change' }
	]
}

export const treeSelectProps = {
	children: 'children',
	label: 'name',
	value: 'id'
}
