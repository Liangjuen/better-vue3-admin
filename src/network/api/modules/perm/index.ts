import { request } from '~/network/http'

export const perm = {
	/**
	 * @description 获取全部权限
	 * @returns
	 */
	list() {
		return request.get<API.Response<Array<string>>>('/perms')
	}
}
