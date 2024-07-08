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

/**
 * 主题设置
 */
export const theme = {
	// 页面 Transition 组件name
	viewTransitionNames: [
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
	],
	// 背景
	backMode: [
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
	],
	// 标签风格
	tabStyles: [
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
	],
	// 默认配置值
	default: {
		layoutMode: 'vertical',
		headerBackMode: 'auto',
		siderBackMode: 'auto',
		color: '#409EFF',
		animationName: 'none',
		showTabbar: true,
		showFooter: true,
		menuWidth: 256,
		radius: 6,
		tabStyle: 'default'
	}
} as const
