import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '~/plugins/assets'
import { loading } from '~/plugins'
import App from './App.vue'
import { router } from '~/router'

function bootstrap() {
	loading()

	const app = createApp(App)
	const pinia = createPinia()

	pinia.use(piniaPluginPersistedstate)

	app.use(router)

	app.use(pinia)

	app.mount('#app')
}

bootstrap()
