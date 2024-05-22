/**
 * @description 获取.vue文件路径
 * @returns
 */
export const vueFilePaths = () => {
	const files = import.meta.glob('/src/modules/**/*.vue')
	const list = []
	for (const fName in files) {
		list.push(fName.substring(13))
	}

	return list
}
