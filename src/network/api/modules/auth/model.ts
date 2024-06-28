import { UserModel } from '../user/model'

export interface AuthModel {
	access: {
		expiration: number
		token: string
	}
	menus: Menu.List
	perms: string[]
	user: UserModel
}

export namespace Auth {
	export interface Login {
		username: string
		password: string
	}
}
