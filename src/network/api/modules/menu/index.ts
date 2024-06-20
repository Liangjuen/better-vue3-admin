import { request } from '~/network/http'
import { MenuModel } from './model'

export const menu = {
	/**
	 * @description 获取全部菜单
	 * @returns
	 */
	list() {
		return request.get<API.Response<Array<MenuModel>>>('/menus')
	}
}
