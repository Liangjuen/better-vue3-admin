import { request } from '~/network/http'
import { MenuModel } from './model'

export const menu = {
	/**
	 * @description 获取全部菜单
	 * @returns
	 */
	list() {
		return request.get<API.Response<Array<MenuModel>>>('/menus')
	},

	/**
	 * @description 创建菜单
	 * @returns
	 */
	create() {
		return request.post<API.Response<MenuModel>>('/menus')
	},

	/**
	 * @description 更新菜单
	 * @returns
	 */
	update() {
		return request.patch<API.Response<MenuModel>>('/menus')
	},

	/**
	 * @description 删除菜单
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		return request.delete(`/menus`)
	}
}
