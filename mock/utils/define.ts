import type { MockMethod } from 'vite-plugin-mock'

const prefix = '/rest/v1'
const delay = 300

/**
 * @description 定义 mock
 * @param options
 * @returns
 */
export function defineMock<T extends Partial<MockMethod>>(options: {
	path?: string
	timeout?: number
	mockList: Array<T>
}) {
	const { timeout, path, mockList } = options

	return mockList.map((item) => {
		return {
			timeout: timeout || Math.floor(Math.random() * delay) + 1,
			url: `${prefix}${path}`,
			...item
		}
	})
}
