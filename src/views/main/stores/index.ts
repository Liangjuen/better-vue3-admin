import { useAppSotre } from './app.store'

export function useMainStores() {
	const appStore = useAppSotre()

	return {
		appStore
	}
}
