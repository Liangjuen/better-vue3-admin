import { defineMock, mockResponse } from '../utils'
import data from '../data/dict.json'

export const dictType = defineMock({
	restfulPath: '/dictTypes',
	mockList: [
		{
			method: 'get',
			response: () => {
				return mockResponse.ok(data.type)
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

export const dict = defineMock({
	restfulPath: '/dicts',
	mockList: [
		{
			method: 'get',
			response: (req: any) => {
				const body = JSON.parse(req.body)
				const typeId = body.typeId
				const keyword = body.keyword
				const page = body.page || 1
				const size = body.size || 10
				const dict = data.dict
					.filter((i) => typeId == i.typeId)
					.filter(
						(i) => (keyword && i.name.includes(keyword)) || !keyword
					)
					.sort((a, b) => a.orderNum - b.orderNum)

				return mockResponse.paginat({
					page,
					size,
					total: dict.length,
					list: dict
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
