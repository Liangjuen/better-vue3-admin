import { defineMock, mockResponse } from '../utils'
import { roleData } from '../data'

export default defineMock({
	restfulPath: '/roles',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.ok(roleData)
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
