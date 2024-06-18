import { ref } from 'vue'
import { defineStore } from 'pinia'
import { StoreName } from '~/enums'

export const useUserStore = defineStore(
	StoreName.USER,
	() => {
		const info = ref(null)
		const token = ref('')

		return {
			info,
			token
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: ['info', 'token']
		}
	}
)
