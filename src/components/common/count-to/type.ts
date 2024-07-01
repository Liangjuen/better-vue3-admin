import { TransitionPresets } from '@vueuse/core'

export interface CountToProps {
	/**
	 * 初始值(动画执行前显示的值)
	 */
	startValue?: number
	/**
	 * 最终值(动画执行结束后显示的值)
	 */
	endValue?: number
	/**
	 * 动画执行持续时间
	 */
	duration?: number
	/**
	 * 自动播放?
	 */
	autoplay?: boolean
	/**
	 * 数值的前缀
	 */
	prefix?: string
	/**
	 * 数值的后缀
	 */
	suffix?: string
	/**
	 * 分割符号(例如用 ',' 分割：999,978)
	 */
	separator?: string
	/**
	 * 保留的小数位数
	 */
	decimals?: number
	/**
	 * 小数分割符
	 */
	decimal?: string
	/**
	 * 应用过度
	 */
	easing?: boolean
	/**
	 * 执行过度动画名
	 */
	transition?: keyof typeof TransitionPresets
	/**
	 * 自定义 format
	 * @param value number
	 * @returns string
	 */
	format?: (value: number) => string
}
