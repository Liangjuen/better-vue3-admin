import { request } from '~/network/http'
import { LoginLogModel, LoginLog } from './model'

export const loginLog = {
	/**
	 * @description 获取登录日志列表
	 * @param params
	 * @returns
	 */
	list(params: LoginLog.GetList) {
		return request.get<API.Response<API.PaginateResponse<LoginLogModel>>>(
			'/login-logs',
			{
				data: params
			}
		)
	},

	/**
	 * @description 删除登录日志
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		console.log(idsStr)
		return request.delete(`/login-logs`)
	}
}
