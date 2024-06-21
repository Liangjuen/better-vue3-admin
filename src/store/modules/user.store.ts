import { ref } from 'vue'
import { defineStore } from 'pinia'
import { StoreName } from '~/enums'

export const useUserStore = defineStore(
	StoreName.USER,
	() => {
		const info = ref<unknown>(null)
		const token = ref('')
		const expiration = ref()

		return {
			info,
			token,
			expiration
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: ['info', 'token', 'expiration']
		}
	}
)
