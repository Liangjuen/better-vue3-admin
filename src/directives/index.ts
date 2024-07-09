import { createSetupDirectives } from './plugins/createSetup'
import { lazy } from './common'
import { permission } from './business'

/** setup custom directives */
export const setupDirectives = createSetupDirectives({
	lazy,
	permission
})
