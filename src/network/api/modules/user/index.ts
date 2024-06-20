import { request } from '~/network/http'
import { User, UserModel } from './model'

export const user = {
	/**
	 * @description 获取用户列表
	 * @param params
	 * @returns
	 */
	list(params: User.GetList) {
		return request.get<API.Response<Array<UserModel>>>('/users', { params })
	}
}
