import { request } from '~/network/http'
import { DictTypeModel, DictType, DictModel, Dict } from './model'

export const dictType = {
	/**
	 * @description 获取全部字典类型
	 * @returns
	 */
	list() {
		return request.get<API.Response<Array<DictTypeModel>>>('/dictTypes')
	},

	/**
	 * @description 创建字典类型
	 * @returns
	 */
	create(form: DictType.Form) {
		return request.post<API.Response<DictTypeModel>>('/dictTypes', {
			...form
		})
	},

	/**
	 * @description 更新字典类型
	 * @returns
	 */
	update(id: DictTypeModel['id'], form: DictType.Form) {
		return request.patch<API.Response<DictTypeModel>>('/dictTypes', {
			id,
			...form
		})
	},

	/**
	 * @description 删除字典类型
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		console.log(idsStr)
		return request.delete(`/dictTypes`)
	}
}

export const dict = {
	/**
	 * @description 获取全部字典类型
	 * @returns
	 */
	list(params: Dict.GetList) {
		return request.get<API.Response<API.PaginateResponse<DictModel>>>(
			'/dicts',
			{ data: params }
		)
	},

	/**
	 * @description 创建字典类型
	 * @returns
	 */
	create(form: Dict.Form) {
		return request.post<API.Response<DictModel>>('/dicts', {
			...form
		})
	},

	/**
	 * @description 更新字典类型
	 * @returns
	 */
	update(id: DictModel['id'], form: Dict.Form) {
		return request.patch<API.Response<DictModel>>('/dicts', {
			id,
			...form
		})
	},

	/**
	 * @description 删除字典类型
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		console.log(idsStr)
		return request.delete(`/dicts`)
	}
}
