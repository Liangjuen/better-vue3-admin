export interface DepartModel extends BaseEntity {
	name: string
	pId: number
	orderNum: number
	children?: Array<DepartModel>
}

export interface DepartForm extends Partial<DepartModel> {}
