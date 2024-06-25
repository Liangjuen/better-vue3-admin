export enum Status {
	disable = 0,
	normal
}

export enum Gender {
	female = 0,
	male = 1,
	x = 2
}

export interface UserModel extends BaseEntity {
	departmentId: number
	username: string
	nickname: string
	password: string
	email: string
	phone: string
	roles: Array<string>
	status: Status
	gender: Gender
	tags: Array<string>
	avatar: string
	remark: string
}

export namespace User {
	export interface Item extends UserModel {}

	export interface GetList extends API.Pagination {
		departmentIds: number[] | null
		role?: string | null
		gender?: Gender | null
		status?: Status | null
	}

	export interface Form extends Partial<UserModel> {}
}
