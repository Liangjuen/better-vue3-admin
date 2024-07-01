import type { Status } from '~/network/api'

export interface RoleModel extends BaseEntity {
	name: string
	code: string
	perms: string[]
	menuIdList: number[]
	remark: string
	status: Status
}

export namespace Role {
	export interface Item extends RoleModel {}

	export interface GetList extends API.Pagination {
		status?: Status | null
	}

	export interface Form extends Partial<RoleModel> {}
}
