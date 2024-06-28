import { defineMock, mockResponse } from '../utils'
import { roleData } from '../data'

export default defineMock({
	restfulPath: '/roles',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.paginat({
					list: roleData,
					total: roleData.length,
					page: 1,
					size: 10
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
