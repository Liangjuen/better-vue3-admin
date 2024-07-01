/**
 * 获取模块
 */
export const modules = () =>
	import.meta.glob([
		'~/modules/**/{views,pages}/**/**.vue',
		'!~/modules/**/components/**/**.vue'
	])

/**
 * 获取模块路径
 */
export const modulePaths = (excludes?: string[]) => {
	const files = modules()
	const list = []
	for (const fName in files) {
		const path = fName.substring(13)
		if (excludes && excludes.includes(path)) continue
		list.push(path)
	}

	return list
}
