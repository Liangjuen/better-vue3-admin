declare namespace Process {
	interface Item {
		path: string
		active: boolean
		icon: string
		label: string
		keepAlive: boolean
	}

	type List = Item[]
}
