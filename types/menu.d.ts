/**
 * 菜单
 */
declare namespace Menu {
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

	interface Item extends BaseEntity {
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
}
