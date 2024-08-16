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

export namespace Data {
	export enum DictType {
		Get = 'data:dictType:get',
		List = 'data:dictType:list',
		Create = 'data:dictType:create',
		Update = 'data:dictType:update',
		Remove = 'data:dictType:remove'
	}

	export enum Dict {
		Get = 'data:dict:get',
		List = 'data:dict:list',
		Create = 'data:dict:create',
		Update = 'data:dict:update',
		Remove = 'data:dict:remove'
	}

	export enum StorageType {
		Get = 'data:storageType:get',
		List = 'data:storageType:list',
		Create = 'data:storageType:create',
		Update = 'data:storageType:update',
		Remove = 'data:storageType:remove'
	}

	export enum Storage {
		Get = 'data:storage:get',
		List = 'data:storage:list',
		Create = 'data:storage:create',
		Update = 'data:storage:update',
		Remove = 'data:storage:remove'
	}
}

const base = enumToList(Base)
const dict = enumToList(Data.Dict)
const dictType = enumToList(Data.DictType)
const storage = enumToList(Data.Storage)
const storageType = enumToList(Data.StorageType)

export const permData = [
	...base,
	...dict,
	...dictType,
	...storage,
	...storageType
]
