import { defineMock, mockResponse } from '../utils'
import { userData } from '../data'

export default defineMock({
	restfulPath: '/users',
	mockList: [
		{
			method: 'get',
			response: mockResponse.ok(userData.list)
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
