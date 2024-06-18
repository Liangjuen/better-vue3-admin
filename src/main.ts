import { createApp } from 'vue'

import '~/plugins/assets'
import { loading } from '~/plugins'
import App from './App.vue'
import { setupRouter } from '~/router'
import { setupPinia } from '~/store'

function bootstrap() {
	loading()

	const app = createApp(App)
	const pinia = setupPinia()
	const router = setupRouter()

	app.use(router)

	app.use(pinia)

	app.mount('#app')
}

bootstrap()
