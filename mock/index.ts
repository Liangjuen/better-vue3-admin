import { createProdMockServer } from 'vite-plugin-mock/client'
import menu from './api/menu'

// const modules = import.meta.glob(['./modules/**/api/**/**.ts'])

export function setupProdMockServer() {
	createProdMockServer([...menu])
}
