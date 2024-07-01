import { defineMock, mockResponse } from '../utils'
import { userData } from '../data'

export default defineMock({
	restfulPath: '/users',
	mockList: [
		{
			method: 'get',
			response: (req: any) => {
				const body = JSON.parse(req.body)
				const departIds = body.departmentIds as number[]

				const list = departIds.length
					? userData.list.filter((item) =>
							departIds.includes(item.departmentId)
						)
					: userData.list

				return mockResponse.ok(list)
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
