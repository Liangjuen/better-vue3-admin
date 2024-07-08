export * from './modules'
import { useAppStore, useProcessStore, useMenuStore } from './modules'
export * from './plugins/setup'

/**
 * 全局仓库
 * @returns
 */
export function useGlobal() {
	const appStore = useAppStore()
	const processStore = useProcessStore()
	const menuStore = useMenuStore()

	return {
		appStore,
		processStore,
		menuStore
	}
}
