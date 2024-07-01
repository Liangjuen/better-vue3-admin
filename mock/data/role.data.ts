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
		menuIdList: [
			1, 2, 3, 5, 10, 11, 12, 20, 21, 200, 201, 210, 211, 220, 30, 31, 32
		],
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
		menuIdList: [1, 6, 10, 11, 12],
		perms: [],
		remark: '游客',
		status: 1,
		createdAt: '2024-6-18 16:00',
		updatedAt: '2024-6-18 16:01'
	}
]
