import { useAppStore } from './app.store'
import { useProcessStore } from './process.store'
import { useMenuStore } from './menu.store'

export function useMainStores() {
	const appStore = useAppStore()
	const processStore = useProcessStore()
	const menuStore = useMenuStore()

	return {
		appStore,
		processStore,
		menuStore
	}
}
