import { request } from '~/network/http'
import { DepartModel, DepartForm } from './model'

export const depart = {
	/**
	 * @description 获取全部组织
	 * @returns
	 */
	list() {
		return request.get<API.Response<Array<DepartModel>>>('/departments')
	},

	/**
	 * @description 创建组织
	 * @returns
	 */
	create(form: DepartForm) {
		return request.post<API.Response<DepartModel>>('/departments', {
			...form
		})
	},

	/**
	 * @description 更新组织
	 * @returns
	 */
	update(id: DepartModel['id'], form: DepartForm) {
		return request.patch<API.Response<DepartModel>>('/departments', {
			id,
			...form
		})
	},

	/**
	 * @description 删除组织
	 * @returns
	 */
	remove(ids: number[]) {
		const idsStr = ids.join(',')
		console.log(idsStr)
		return request.delete(`/departments`)
	}
}
