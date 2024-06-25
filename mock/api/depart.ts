import { defineMock, mockResponse } from '../utils'
import { departData } from '../data'

export default defineMock({
	restfulPath: '/departments',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.ok(departData)
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
