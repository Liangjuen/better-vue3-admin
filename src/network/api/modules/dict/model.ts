export interface DictTypeModel extends BaseEntity {
	name: string
	key: string
}

export interface DictModel extends BaseEntity {
	name: string
	value: string
	pId: number | null
	typeId: number
	orderNum: number
	remark: string
	children?: Array<DictModel>
}

export namespace DictType {
	export interface Item extends DictTypeModel {}

	export interface Form extends Partial<DictTypeModel> {}
}

export namespace Dict {
	export interface Item extends DictModel {}

	export interface GetList extends API.Pagination {}

	export interface Form extends Partial<DictModel> {}
}
