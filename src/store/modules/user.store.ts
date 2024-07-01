import { ref } from 'vue'
import { defineStore } from 'pinia'
import { StoreName } from '~/enums'

export const useUserStore = defineStore(
	StoreName.USER,
	() => {
		const info = ref<unknown>(null)
		const token = ref('')
		const expiration = ref()

		function $reset() {
			info.value = null
			token.value = ''
			expiration.value = 0
		}

		return {
			info,
			token,
			expiration,
			$reset
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: ['info', 'token', 'expiration']
		}
	}
)
