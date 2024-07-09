import { createApp } from 'vue'

import '~/plugins/assets'
import { loading } from '~/plugins'
import App from './App.vue'
import { setupRouter } from '~/router'
import { setupPinia } from '~/store'
import { setupMock } from '../mock'
import { setupDirectives } from '~/directives'

function bootstrap() {
	/** loading */
	loading()

	/** use mock */
	setupMock()

	const app = createApp(App)
	const pinia = setupPinia()
	const router = setupRouter()
	const directives = setupDirectives()

	/** mount router */
	app.use(router)

	/** mount pinia */
	app.use(pinia)

	/** mount custom directives */
	app.use(directives)

	app.mount('#app')
}

bootstrap()
