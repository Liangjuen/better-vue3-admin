import { defineMock, mockResponse } from '../utils'
import { menuData, access, userData, permData, Base, roleData } from '../data'

export default defineMock({
	mockList: [
		{
			method: 'post',
			path: '/auth/login',
			response: (req: any) => {
				const body = JSON.parse(req.body)
				const usernameList = userData.list.map((i) => i.username)

				if (
					!body.username ||
					!usernameList.includes(body.username) ||
					body.password !== 'better123'
				) {
					return mockResponse.fail('用户名或密码错误')
				}
				const username = body.username as 'admin' | 'editor' | 'ghost'

				const menuIds = username == 'ghost' ? roleData[2] : roleData[1]

				const otherMenus = menuData.filter((item) => {
					return menuIds.menuIdList.includes(item.id)
				})

				const menus = username == 'admin' ? menuData : otherMenus
				const perms = {
					admin: permData,
					editor: [
						Base.UserList,
						Base.DepartmentList,
						Base.MenuList,
						Base.RoleList,
						Base.ConfigList
					],
					ghost: [Base.ConfigList]
				}

				return mockResponse.ok({
					access,
					menus,
					perms: perms[username],
					user: userData[username]
				})
			}
		}
	]
})
