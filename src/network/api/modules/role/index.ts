import { request } from '~/network/http'
import { RoleModel, Role } from './model'

export const role = {
	/**
	 * @description 获取角色列表
	 * @param params
	 * @returns
	 */
	list(params: Role.GetList) {
		return request.get<API.Response<API.PaginateResponse<RoleModel>>>(
			'/roles',
			{
				data: params
			}
		)
	},

	/**
	 * @description 创建角色
	 * @returns
	 */
	create(form: Role.Form) {
		return request.post<API.Response<RoleModel>>('/roles', {
			...form
		})
	},

	/**
	 * @description 更新角色
	 * @returns
	 */
	update(id: RoleModel['id'], form: Role.Form) {
		return request.patch<API.Response<RoleModel>>('/roles', {
			id,
			...form
		})
	},

	/**
	 * @description 删除角色
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		return request.delete(`/roles`)
	}
}
