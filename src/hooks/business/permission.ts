import { useGlobal } from '~/store'

export const usePermission = () => {
	const { menuStore } = useGlobal()

	// 判断是否有权限
	const hasPermission = (point: string | string[]) => {
		if (Array.isArray(point)) {
			let has = false
			point.forEach(
				(p) => (has = !has ? menuStore.perms.includes(p) : has)
			)
			return has
		} else {
			return menuStore.perms.includes(point)
		}
	}

	return {
		hasPermission
	}
}
