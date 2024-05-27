import { Component } from 'vue'
export declare namespace IContextMenu {
	interface Item {
		uid?: string
		context: string | Component
		icon?: string
		ellipsis?: boolean
		disabled?: boolean
		hidden?: boolean
		callback?(done: () => void): void
		children?: List
		isActive?: boolean
	}

	type List = Array<Item>

	interface Options {
		list: List
	}
}

export type ContextMenuProps = {
	list: Array<IContextMenu.Item>
	width?: number
}
