export interface AppLayoutProps {
	// 菜单布局
	menuLayout?: Theme.MenuLayoutMode
	// 菜单背景
	menuBack?: Theme.MenuBackMode
	// 是否处于移动端
	isMobile?: boolean
	// 是否折叠左侧菜单
	isFold?: boolean
	// 是否隐藏 sider
	hiddeSider?: boolean
	// 是否隐藏 topbar
	hiddeTopbar?: boolean
	// 是否隐藏 tab
	hiddeTab?: boolean
	// 是否隐藏 footer
	hiddeFooter?: boolean
	// 视图内边距
	viewPadding?: number | string
}

export const defaultProps: AppLayoutProps = {
	menuLayout: 'horizontal',
	menuBack: 'auto',
	isMobile: false,
	isFold: false,
	hiddeFooter: true
}
