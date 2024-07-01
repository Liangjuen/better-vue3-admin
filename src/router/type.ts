import { Router as VueRouter, RouteRecordRaw } from 'vue-router'

export interface RouteAppendData {
	name?: string
	path: string
	component?: any
	meta?: Menu.RouteMeta
	props?: Record<string, any>
}

export declare interface Router extends VueRouter {
	find(path: string): RouteRecordRaw | undefined
	append(data: RouteAppendData[] | RouteAppendData): void
	register(
		path: string
	): Promise<{ route: RouteRecordRaw | undefined; isReg: boolean }>
	[key: string]: any
}
