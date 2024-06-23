import { defineMock, mockResponse } from '../utils'
import { permData } from '../data'

export default defineMock({
	restfulPath: '/perms',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.ok(permData)
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
