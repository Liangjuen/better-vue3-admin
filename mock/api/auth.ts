import { defineMock, mockResponse } from '../utils'
import { menuData, access, userData, permData, Base } from '../data'

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

				const ghostMenuNameExclude = [
					'系统管理',
					'菜单管理',
					'用户列表',
					'角色管理'
				]

				const ghostMenus = menuData.filter(
					(item) => !ghostMenuNameExclude.includes(item.name)
				)

				return mockResponse.ok({
					access,
					menus: username == 'ghost' ? ghostMenus : menuData,
					perms: perms[username],
					user: userData[username]
				})
			}
		}
	]
})
