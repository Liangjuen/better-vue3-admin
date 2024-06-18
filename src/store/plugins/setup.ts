import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/**
 * @description 初始化仓库(pinia)
 * @returns
 */
export function setupPinia() {
	const pinia = createPinia()

	pinia.use(piniaPluginPersistedstate)

	return pinia
}
