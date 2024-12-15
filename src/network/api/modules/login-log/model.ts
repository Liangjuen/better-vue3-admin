export enum LoginState {
	fail = 0,
	success
}

export interface LoginLogModel extends BaseEntity {
	ip: string
	userId: number
	username: string
	isMobile: boolean
	message: string
	browser: string
	os: string
	loginState: LoginState
	ipAddr: string
}

export namespace LoginLog {
	export interface Item extends LoginLogModel {}

	export interface GetList extends API.Pagination {
		loginState?: LoginState | null
	}
}
