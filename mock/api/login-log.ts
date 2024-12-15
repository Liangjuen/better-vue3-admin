import { defineMock, mockResponse } from '../utils'
import loginLogData from '../data/login-log.json'

export default defineMock({
	restfulPath: '/login-logs',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.paginat({
					page: 1,
					size: 10,
					total: loginLogData.length,
					list: loginLogData
				})
			}
		},
		{
			method: 'post',
			response: () => mockResponse.unenforceable()
		},
		{
			method: 'put',
			response: () => mockResponse.unenforceable()
		},
		{
			method: 'patch',
			response: () => mockResponse.unenforceable()
		},
		{
			method: 'delete',
			response: () => mockResponse.unenforceable()
		}
	]
})
