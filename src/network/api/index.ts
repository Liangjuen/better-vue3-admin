import { menu } from './modules/menu'
import { auth } from './modules/auth'
import { user } from './modules/user'
import { perm } from './modules/perm'
import { depart } from './modules/depart'

export * from './modules/menu/model'
export * from './modules/auth/model'
export * from './modules/user/model'
export * from './modules/depart/model'

export const service = {
	menu,
	auth,
	user,
	perm,
	depart
}
