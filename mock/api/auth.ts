import { defineMock, mockResponse } from '../utils'
import { menuData, access, userData } from '../data'

export default defineMock({
	mockList: [
		{
			method: 'post',
			path: '/auth/login',
			response: () => {
				return mockResponse.ok({
					access,
					menus: menuData,
					perms: [],
					user: userData.info
				})
			}
		}
	]
})
