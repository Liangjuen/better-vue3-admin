import { defineMock, mockResponse } from '../utils'
import loginLogData from '../data/login-log.json'

export default defineMock({
	restfulPath: '/login-logs',
	mockList: [
		{
			method: 'get',
			response: (req: any) => {
				const body = JSON.parse(req.body)

				const keyword = body.keyword
				const page = body.page || 1
				const size = body.size || 10
				const state = body.loginState

				const filters = loginLogData.filter(
					(i) =>
						(keyword &&
							(i.username.includes(keyword) ||
								i.ip.includes(keyword))) ||
						!keyword
				)

				const list =
					body.loginState == null
						? filters
						: filters.filter((item) => item.loginState == state)

				return mockResponse.paginat({
					page,
					size,
					total: list.length,
					list
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
