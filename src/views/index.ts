import { useMainStores } from './main/stores'

/**
 * 全局仓库
 * @returns
 */
export function useGlobal() {
	return {
		...useMainStores()
	}
}
