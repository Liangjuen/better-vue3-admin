declare namespace Theme {
	type LayoutMode =
		| 'horizontal'
		| 'vertical'
		| 'mix-vertical'
		| 'mix-horizontal'

	type MenuLayoutMode = LayoutMode

	type BackMode = 'primary' | 'dark' | 'auto'

	type MenuBackMode = BackMode

	type TopbarBackMode = BackMode

	type TabStyle = 'chrome' | 'default' | 'card'
}
