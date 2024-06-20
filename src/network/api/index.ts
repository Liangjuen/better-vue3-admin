import { menu } from './modules/menu'
import { auth } from './modules/auth'
import { user } from './modules/user'

export * from './modules/menu/model'
export * from './modules/auth/model'
export * from './modules/user/model'

export const service = {
	menu,
	auth,
	user
}
