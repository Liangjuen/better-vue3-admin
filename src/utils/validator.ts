const checkPhone = (_rule: any, value: any, callback: any) => {
	if (value == '' || value == null) return callback()
	const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
	if (!reg.test(value)) callback(new Error('请输入合法的手机号'))
	callback()
}

const checkEmail = (_rule: any, value: any, callback: any) => {
	if (value == '' || value == null) return callback()
	const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	if (!reg.test(value)) callback(new Error('请输入合法的邮箱细致'))
	callback()
}

const checkPassword = (_rule: any, value: any, callback: any) => {
	if (value == '' || value == null) return callback()
	const reg =
		/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){8,20}$/
	if (!reg.test(value))
		callback(
			new Error(
				'请输入8-20位英文字母、数字或者符号(除空格)，且字母、数字和标点符号至少包含两种'
			)
		)
	callback()
}
// 用户名由汉字或字母开头,由3-16位数字,字母,汉字组成
const checkUsername = (_rule: any, value: any, callback: any) => {
	if (value == '' || value == null) return callback()
	const reg = /^[\u4E00-\u9FA5_A-Za-z0-9]{3,16}/
	if (!reg.test(value))
		callback(new Error('请输入 3 - 16 位用户名 (数字、字母、汉字)组合'))
	callback()
}

export const validator = {
	checkPhone,
	checkEmail,
	checkPassword,
	checkUsername
}
