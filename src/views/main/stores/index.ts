import { useAppStore } from './app.store'
import { useProcessStore } from './process.store'

export function useMainStores() {
	const appStore = useAppStore()
	const processStore = useProcessStore()

	return {
		appStore,
		processStore
	}
}
