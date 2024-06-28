import { enumToList } from '../utils'
export enum Base {
	DepartmentList = 'base:department:list',
	DepartmentGet = 'base:department:get',
	DepartmentCreate = 'base:department:create',
	DepartmentUpdate = 'base:department:update',
	DepartmentRemove = 'base:department:remove',
	UserList = 'base:user:list',
	UserGet = 'base:user:get',
	UserCreate = 'base:user:create',
	UserUpdate = 'base:user:update',
	UserResetPassword = 'base:user:resetPassword',
	UserRemove = 'base:user:remove',
	RoleList = 'base:role:list',
	RoleGet = 'base:role:get',
	RoleCreate = 'base:role:create',
	RoleUpdate = 'base:role:update',
	RoleRemove = 'base:role:remove',
	MenuList = 'base:menu:list',
	MenuGet = 'base:menu:get',
	MenuCreate = 'base:menu:create',
	MenuUpdate = 'base:menu:update',
	MenuRemove = 'base:menu:remove',
	PermList = 'base:perm:list',
	ConfigGet = 'base:config:get',
	ConfigList = 'base:config:list',
	ConfigCreate = 'base:config:create',
	ConfigUpdate = 'base:config:update',
	ConfigRemove = 'base:config:remove'
}

export const permData = enumToList(Base)
