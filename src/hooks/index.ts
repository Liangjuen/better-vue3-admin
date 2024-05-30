import { useMitt } from './mitt'
import { useRoute, useRouter } from 'vue-router'

export function useBetter() {
	return {
		route: useRoute(),
		router: useRouter(),
		mitt: useMitt()
	}
}
