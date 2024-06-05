import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStores } from '../../stores'

export const useSet = () => {
	const { appStore } = useMainStores()
	const { menuBackMode } = storeToRefs(appStore)

	const menuStyle = computed(() => {
		let style: any = {
			'background-color': 'transparent',
			'active-text-color': '#fff'
		}
		if (menuBackMode.value) {
			if (menuBackMode.value == 'dark') {
				style = {
					'background-color': 'var(--dark-bg-color)',
					'text-color': '#fff',
					'active-text-color': '#fff'
				}
			} else {
				style = {
					'background-color': 'var(--el-color-primary-light-3)',
					'text-color': '#fff',
					'active-text-color': '#fff'
				}
			}
		}
		return style
	})

	return {
		menuStyle
	}
}
