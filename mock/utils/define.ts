import Mock from 'mockjs'
import { config } from '../config'

export interface MockAction {
	rurl?: string
	path?: string
	method: 'get' | 'post' | 'patch' | 'put' | 'delete'
	response?: Mock.templateOrFn
}

export interface DefineMockOptions {
	prefix?: string
	restfulPath?: string
	baseUrl?: string
	mockList: Array<MockAction>
}

/**
 * @description 定义 mock
 * @param options
 * @returns
 */
export function defineMock(options: DefineMockOptions) {
	const { restfulPath, mockList } = options

	const baseUrl = options.baseUrl || config.baseUrl

	const prefix = options.prefix || config.prefix

	const restfulRurl = baseUrl + prefix + restfulPath

	return mockList.map((item) => {
		const rurl =
			item.rurl ||
			(item.path ? baseUrl + prefix + item.path : restfulRurl)

		return {
			...item,
			rurl
		}
	})
}
