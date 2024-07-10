/** cureent environment: development? */
export const isDev = () => import.meta.env.MODE == 'dev'

/** cureent environment: production? */
export const isProd = () => import.meta.env.MODE == 'prod'

/** cureent environment: test? */
export const isTest = () => import.meta.env.MODE == 'test'
