import type { ExtractPropTypes } from 'vue'

const svgIconDefaults = {
	color: undefined,
	size: 14,
	prefix: 'icon',
	strokeWidth: 2
}

export const svgIconProps = {
	/**
	 *  @description icon名
	 */
	icon: {
		type: String,
		required: true
	},
	/**
	 *  @description 自定义颜色
	 */
	color: {
		type: String,
		default: svgIconDefaults.color
	},
	/**
	 *  @description 尺寸
	 */
	size: {
		type: Number
	},
	/**
	 *  @description prefix
	 */
	prefix: {
		type: String,
		default: svgIconDefaults.prefix
	},
	/**
	 *  @description prefix
	 */
	strokeWidth: {
		type: Number,
		default: svgIconDefaults.strokeWidth
	}
} as const

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>
