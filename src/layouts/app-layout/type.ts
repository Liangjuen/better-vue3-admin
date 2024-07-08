import { Kebab } from '~/utils'

export namespace Layout {
	/** layout z-index */
	export enum RZIndex {
		Sider = 1,
		Mask,
		Header,
		Tab,
		Footer
	}
	export type Mode = 'horizontal' | 'vertical'
	type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
		? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
		: S

	export type Item = 'header' | 'sider' | 'tab' | 'footer' | 'view' | 'mask'
	export type Prefix = '--b-layout-'
	export type Name = 'app-layout'
	export interface HeaderConfig {
		headerHeight?: number
		hideHeader?: boolean
		headerClass?: string
	}

	export interface SiderConfig {
		siderCollapse?: boolean
		siderWidth?: number
		hideSider?: boolean
		mobileSiderClass?: string
		siderClass?: string
		siderCollapsedWidth?: number
	}

	export interface TabConfig {
		tabHeight?: number
		tabClass?: string
		hideTab?: boolean
	}

	export interface ViewConfig {
		contentClass?: string
		fullView?: boolean
	}

	export interface FooterConfig {
		footerHeight?: number
		hideFooter?: boolean
		footerClass?: string
	}

	export interface MaskConfig {
		maskClass?: string
	}

	export interface Props
		extends HeaderConfig,
			SiderConfig,
			TabConfig,
			ViewConfig,
			FooterConfig,
			MaskConfig {
		mode?: Mode
		mobile?: boolean
		maxZIndex?: number
	}

	type SlotFn = (props?: Record<string, unknown>) => any

	export interface Slots {
		/** Main */
		default?: SlotFn
		/** Header */
		header?: SlotFn
		/** Tab */
		tab?: SlotFn
		/** Sider */
		sider?: SlotFn
		/** Footer */
		footer?: SlotFn
	}

	export interface Emits {
		(e: 'update:siderCollapse', value: boolean): void
		(e: 'update:fullView', value: boolean): void
		(e: 'update:mode', value: Mode): void
		(e: 'onViewFullScreenExit'): void
	}

	/**
	 * layout css var config
	 */
	export interface CssVarProps
		extends Pick<
			Props,
			| 'headerHeight'
			| 'siderCollapsedWidth'
			| 'siderWidth'
			| 'tabHeight'
			| 'footerHeight'
		> {
		headerZIndex?: number
		tabZIndex?: number
		siderZIndex?: number
		maskZIndex?: number
		footerZIndex?: number
		mainPaddingLeft?: number
	}

	export type CssVars = {
		[K in keyof CssVarProps as `${Prefix}${KebabCase<K>}`]: string | number
	}

	export type ClassNameSpace = {
		[K in Item]: `${Name}__${KebabCase<K>}`
	}
}
