export const departData = [
	{
		id: 1,
		pId: null,
		createdAt: '2024-02-19',
		updatedAt: '2024-03-13',
		name: 'better',
		orderNum: 1
	},
	{
		id: 2,
		pId: 1,
		createdAt: '2024-02-19',
		updatedAt: '2024-03-13',
		name: '技术',
		orderNum: 2
	},
	{
		id: 3,
		pId: 1,
		createdAt: '2024-02-19',
		updatedAt: '2024-03-13',
		name: '销售',
		orderNum: 3
	},
	{
		id: 4,
		pId: 2,
		createdAt: '2024-02-19',
		updatedAt: '2024-03-13',
		name: '后端',
		orderNum: 4
	},
	{
		id: 5,
		pId: 2,
		createdAt: '2024-02-19',
		updatedAt: '2024-03-13',
		name: '前端',
		orderNum: 5
	},
	{
		id: 6,
		pId: 2,
		createdAt: '2024-02-19',
		updatedAt: '2024-03-13',
		name: '运维',
		orderNum: 6
	}
].sort((a, b) => a.orderNum - b.orderNum)
