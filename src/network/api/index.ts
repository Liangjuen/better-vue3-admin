import { menu } from './modules/menu'
import { auth } from './modules/auth'
import { user } from './modules/user'
import { perm } from './modules/perm'
import { depart } from './modules/depart'
import { role } from './modules/role'
import { dict, dictType } from './modules/dict'
import { loginLog } from './modules/login-log'

export * from './modules/menu/model'
export * from './modules/auth/model'
export * from './modules/user/model'
export * from './modules/depart/model'
export * from './modules/role/model'
export * from './modules/dict/model'
export * from './modules/login-log/model'

export const service = {
	menu,
	auth,
	user,
	perm,
	depart,
	role,
	dict,
	dictType,
	loginLog
}
