import { App } from 'vue'

/** custom directive */
export interface SetupDirectivePlugin {
	install: (app: App) => void
}
