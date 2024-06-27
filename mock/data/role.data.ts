import { Base } from './perm.data'

export const roleData = [
	{
		id: 1,
		name: 'admin',
		code: 'Admin',
		menuIdList: [],
		perms: [],
		remark: '超级管理员',
		status: 1,
		createdAt: '2024-6-18 14:00',
		updatedAt: '2024-6-18 14:01'
	},
	{
		id: 2,
		name: 'editor',
		code: 'Editor',
		menuIdList: [29, 30, 34, 1, 2, 42, 4, 5, 35, 36, 33, 31],
		perms: [
			Base.MenuList,
			Base.MenuGet,
			Base.MenuCreate,
			Base.MenuUpdate,
			Base.MenuRemove,
			Base.PermList,
			Base.RoleList,
			Base.RoleGet,
			Base.RoleCreate,
			Base.RoleUpdate,
			Base.RoleRemove,
			Base.DepartmentCreate,
			Base.DepartmentGet,
			Base.DepartmentUpdate,
			Base.DepartmentList,
			Base.DepartmentRemove,
			Base.UserList,
			Base.UserGet,
			Base.UserCreate,
			Base.UserUpdate,
			Base.UserRemove,
			Base.UserResetPassword
		],
		remark: '管理员',
		status: 1,
		createdAt: '2024-6-18 15:00',
		updatedAt: '2024-6-18 15:01'
	},
	{
		id: 3,
		name: 'ghost',
		code: 'Ghost',
		menuIdList: [],
		perms: [],
		remark: '游客',
		status: 1,
		createdAt: '2024-6-18 16:00',
		updatedAt: '2024-6-18 16:01'
	}
]
