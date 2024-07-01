import dev from './dev'
import prod from './prod'
import { menus, theme } from './local'
// 是否开发模式
export const isDev = import.meta.env.DEV

// 配置
export const config = {
	app: {
		name: import.meta.env.VITE_NAME,
		router: {
			mode: 'history'
		},
		maxMobileSize: 800
	},
	network: {
		timeout: import.meta.env.VITE_TIMEOUT,
		nprogress: {
			easing: 'ease', // 动画方式
			speed: 500, // 递增进度条的速度
			showSpinner: false, // 是否显示加载圆圈
			trickleSpeed: 200, // 自动递增间隔
			minimum: 0.3 // 初始化时的最小百分比
		}
	},
	// 忽略规则
	ignore: {
		// 不显示请求进度条
		NProgress: ['/files/upload'],
		// 页面不需要登录验证
		token: ['/login', '/401', '/403', '/404', '/500', '/502']
	},
	// 最大缓存页面数(路由页面缓存 默认配置)
	maxKeepAlive: 20,
	...(isDev ? dev : prod),

	// 主题配置
	theme,

	// 菜单
	menus
}
