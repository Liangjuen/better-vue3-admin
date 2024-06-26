import { request } from '~/network/http'
import { User, UserModel } from './model'

export const user = {
	/**
	 * @description 获取用户列表
	 * @param params
	 * @returns
	 */
	list(params: User.GetList) {
		return request.get<API.Response<Array<UserModel>>>('/users', {
			data: params
		})
	},

	/**
	 * @description 创建用户
	 * @returns
	 */
	create(form: User.Form) {
		return request.post<API.Response<UserModel>>('/users', {
			...form
		})
	},

	/**
	 * @description 更新用户
	 * @returns
	 */
	update(id: UserModel['id'], form: User.Form) {
		return request.patch<API.Response<UserModel>>('/users', {
			id,
			...form
		})
	},

	/**
	 * @description 删除用户
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		return request.delete(`/users`)
	}
}
