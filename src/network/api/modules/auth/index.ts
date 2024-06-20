import { request } from '~/network/http'
import { Auth, AuthModel } from './model'

export const auth = {
	/**
	 * @description 密码登录
	 * @param form
	 * @returns
	 */
	login(form: Auth.Login) {
		return request.post<API.Response<AuthModel>>('/auth/login', form)
	}
}
