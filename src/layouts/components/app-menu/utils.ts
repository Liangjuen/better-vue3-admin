export const createMenuStyle = (
	back: App.BackgroundColorMode,
	simple?: boolean
) => {
	if (simple)
		return {
			'background-color': 'transparent',
			'active-text-color': 'var(--el-color-primary)'
		}
	let style: any = {
		'background-color': 'transparent',
		'active-text-color': '#fff'
	}

	if (back == 'dark') {
		style = {
			'background-color': 'var(--dark-bg-color)',
			'text-color': '#fff',
			'active-text-color': '#fff'
		}
	} else if (back == 'primary') {
		style = {
			'background-color': 'var(--el-color-primary-light-3)',
			'text-color': '#fff',
			'active-text-color': '#fff'
		}
	}
	return style
}
