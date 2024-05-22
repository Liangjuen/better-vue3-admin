/**
 * @description 调整颜色亮度
 * @param hexColor 颜色(十六进制)
 * @param lightness 亮度 1 - 10
 * @returns
 */
export function adjustLightness(
	hexColor: string,
	misColor: string,
	lightness: number,
	light: boolean = true
) {
	lightness = lightness * 0.1

	// 将十六进制颜色转换为RGB格式
	const r1 = parseInt(hexColor.substring(1, 3), 16)
	const g1 = parseInt(hexColor.substring(3, 5), 16)
	const b1 = parseInt(hexColor.substring(5, 7), 16)

	// 混入的颜色
	const r2 = parseInt(misColor.substring(1, 3), 16)
	const g2 = parseInt(misColor.substring(3, 5), 16)
	const b2 = parseInt(misColor.substring(5, 7), 16)

	const base = (c: number, m: number) =>
		light ? c * (1 - lightness) + m * lightness : c * (1 - lightness)

	// 计算新的RGB值
	const newR = ('0' + (Math.round(base(r1, r2)) || 0).toString(16)).slice(-2)
	const newG = ('0' + (Math.round(base(g1, g2)) || 0).toString(16)).slice(-2)
	const newB = ('0' + (Math.round(base(b1, b2)) || 0).toString(16)).slice(-2)

	// 返回新的十六进制颜色值
	return '#' + newR + newG + newB
}
