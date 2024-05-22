import { adjustLightness } from '../color'

export class PrimaryColor {
	protected default = {
		namespace: '--el-color-primary',
		lightLevels: [3, 5, 7, 8, 9],
		darkLevels: [2],
		color: '#409eff',
		mixWhite: '#ffffff',
		mixBlack: '#000000'
	}

	/**
	 * @description 设置主题颜色
	 * @param hex 颜色(支持十六进制)
	 * @returns
	 */
	set(hex: string) {
		const { namespace } = this.default
		this.setPropertyColor(namespace, hex)
		this.default.color = hex
		return this
	}

	/**
	 * @description 设置css变量
	 * @param varName css 变量名
	 * @param color 颜色
	 */
	setPropertyColor(varName: string, color: string) {
		document.documentElement.style.setProperty(varName, color)
	}

	/**
	 * @description 设置颜色梯度
	 * @param varName css 变量名
	 * @param color 颜色
	 * @param levels 梯度集合[3,5,7,8,9]
	 */
	setGradient(options?: {
		varName: string
		color: string
		lightLevels?: number[]
		darkLevels?: number[]
	}) {
		const {
			varName,
			color,
			lightLevels = this.default.lightLevels,
			darkLevels = this.default.darkLevels
		} = options || {
			...this.default,
			varName: this.default.namespace
		}

		lightLevels.forEach((l) => {
			if (l < 1 || l > 10) return
			this.setPropertyColor(
				`${varName}-light-${l}`,
				// 获取梯度值
				adjustLightness(color, this.default.mixWhite, l)
			)
		})

		darkLevels.forEach((l) => {
			if (l < 1 || l > 10) return
			this.setPropertyColor(
				`${varName}-dark-${l}`,
				// 获取梯度值
				adjustLightness(color, this.default.mixWhite, l, false)
			)
		})
	}
}

export const primaryColor = new PrimaryColor()
