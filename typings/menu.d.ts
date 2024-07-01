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
		link?: string | null
		iframe?: string | null
		openNewWindow?: boolean
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

	interface RouteMeta
		extends Pick<Item, 'iframe' | 'openNewWindow' | 'link'> {
		isPage?: boolean
		keepAlive?: boolean
		label?: string
		dynamic?: boolean
		[key: string]: any
	}

	type List = Array<Item>
}
