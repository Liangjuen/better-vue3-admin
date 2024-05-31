/**
 * 菜单
 */
namespace Menu {
	enum Status {
		disable = 0,
		normal
	}

	enum Cache {
		off = 0,
		on
	}

	enum Hidden {
		off = 0,
		on
	}

	enum Type {
		directory = 1,
		view,
		perms
	}

	interface Item extends Entity {
		id?: number
		pid: number | null
		path: string | null
		name: string
		cache: Cache
		sort: number
		icon: string
		type: Type
		hidden: Hidden
		perms: string[]
		component: string
		status: Status
		children?: Array<Item> | null
		disabled?: boolean
	}

	type List = Array<Item>

	interface GetList extends BaseQueryCondition {
		name?: string
		status?: Status
	}

	interface Form
		extends Omit<Item, 'createAt' | 'updatedAt' | 'id' | 'children'> {}

	interface Create extends Form {}

	interface Update extends Form {}
}
