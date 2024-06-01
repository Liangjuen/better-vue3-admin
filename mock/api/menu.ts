import { defineMock, mockResponse } from '../utils'
import { menuData } from '../data'

export default defineMock({
	path: '/menus',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.ok(menuData)
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
