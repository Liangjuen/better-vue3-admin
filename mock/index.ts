import Mock from 'mockjs'
import { config } from './config'
import { mockResponse } from './utils'
import menu from './api/menu'
import auth from './api/auth'
import user from './api/user'

export const mocks = [...menu, ...auth, ...user]

/**
 * 初始化数据模拟
 */
export function setupMock() {
	Mock.setup({ timeout: config.delay })

	mocks.forEach((item) => {
		Mock.mock(
			item.rurl,
			item.method,
			item.response || mockResponse.unenforceable()
		)
	})
}
