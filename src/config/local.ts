/**
 * 菜单
 */
export const menus: Menu.List = [
	{
		name: '首页',
		type: 2,
		path: '/home',
		component: 'dashboard/views/home/index.vue',
		icon: 'home-analytics',
		sort: 0,
		cache: 0,
		hidden: 0,
		status: 1
	},
	{
		name: '关于',
		type: 2,
		path: '/about',
		component: 'dashboard/views/about/index.vue',
		icon: 'feather',
		sort: 999,
		cache: 1,
		hidden: 0,
		status: 1
	}
]

// 国际化
export const langOptions: App.I18n.LangOption[] = [
	{
		label: '中文',
		value: 'zh-CN'
	},
	{
		label: 'English',
		value: 'en-US'
	}
]

// 页面 Transition 组件name
export const viewTransitionNames: App.Config.ViewTransitionNameOption[] = [
	{
		label: 'zoom',
		value: 'zoom'
	},
	{
		label: 'fade',
		value: 'fade'
	},
	{
		label: 'slide-left',
		value: 'slide-left'
	},
	{
		label: 'slide-right',
		value: 'slide-right'
	}
]

export const backModes: App.Config.BackModeOption[] = [
	{
		label: '自适应',
		value: 'auto'
	},
	{
		label: '深色',
		value: 'dark'
	},
	{
		label: '主题',
		value: 'primary'
	}
]

// header 背景
export const headerBackModes = backModes

// sider 背景
export const siderBackModes = backModes

// 标签风格
export const tabStyles: App.Config.TabStyleOption[] = [
	{
		label: '默认',
		value: 'default'
	},
	{
		label: '谷歌',
		value: 'chrome'
	},
	{
		label: '卡片',
		value: 'card'
	}
]

export const local: App.Config.SetOption = {
	layoutMode: 'vertical',
	headerBackMode: 'auto',
	siderBackMode: 'auto',
	color: '#409EFF',
	animationName: 'none',
	showTabbar: true,
	showFooter: true,
	siderWidth: 256,
	radius: 6,
	tabStyle: 'default',
	language: 'zh-CN'
}
