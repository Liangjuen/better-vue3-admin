import type { App, Directive } from 'vue'
import { SetupDirectivePlugin } from '../type'

/**
 *  create directive setup function
 *
 * @param dirs directives
 */
export const createSetupDirectives = (dirs: { [key: string]: Directive }) => {
	return (): SetupDirectivePlugin => {
		const install = (app: App) => {
			/** install all */
			Object.keys(dirs).forEach((name) => {
				app.directive(name, dirs[name])
			})
		}

		return {
			install
		}
	}
}
