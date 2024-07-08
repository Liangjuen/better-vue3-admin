import { Layout } from './type'

/** The max z-index of the layout */
export const LAYOUT_MAX_Z_INDEX = 100

/** layout name */
export const LAYOUT_NAME = 'app-layout'

/**
 * create layout css vars by css var props
 *
 * @param props css vars props
 */
export const createLayoutCssVarsByCssVarProps = (props: Layout.CssVarProps) => {
	const cssVars: Layout.CssVars = {
		'--b-layout-footer-height': `${props.footerHeight}px`,
		'--b-layout-footer-z-index': `${props.footerZIndex}`,
		'--b-layout-header-height': `${props.headerHeight}px`,
		'--b-layout-header-z-index': `${props.headerZIndex}`,
		'--b-layout-mask-z-index': `${props.maskZIndex}`,
		'--b-layout-sider-collapsed-width': `${props.siderCollapsedWidth}px`,
		'--b-layout-sider-width': `${props.siderWidth}px`,
		'--b-layout-sider-z-index': `${props.siderZIndex}`,
		'--b-layout-tab-height': `${props.tabHeight}px`,
		'--b-layout-tab-z-index': `${props.tabZIndex}`,
		'--b-layout-main-padding-left': `${props.mainPaddingLeft}px`
	}

	return cssVars
}

/**
 * create layout work space css vars
 *
 * @param props app layout props
 */
export const createLayoutWorkspaceCssVars = (props: Layout.Props) => {
	const {
		mode,
		mobile,
		siderCollapse,
		maxZIndex = LAYOUT_MAX_Z_INDEX,
		headerHeight,
		tabHeight,
		siderWidth,
		siderCollapsedWidth,
		footerHeight
	} = props

	const mainPaddingLeft =
		mode === 'horizontal' || mobile
			? 0
			: siderCollapse
				? siderCollapsedWidth
				: siderWidth

	const maskZIndex = mobile ? maxZIndex - Layout.RZIndex.Mask : 0
	const headerZIndex = maxZIndex - Layout.RZIndex.Header
	const siderZIndex =
		mode === 'vertical' ? maxZIndex - Layout.RZIndex.Sider : headerZIndex
	const tabZIndex = maxZIndex - Layout.RZIndex.Tab
	const footerZIndex = maxZIndex - Layout.RZIndex.Footer

	const cssProps: Layout.CssVarProps = {
		headerHeight,
		tabHeight,
		siderWidth,
		siderCollapsedWidth,
		footerHeight,
		maskZIndex,
		siderZIndex,
		headerZIndex,
		tabZIndex,
		footerZIndex,
		mainPaddingLeft
	}

	return createLayoutCssVarsByCssVarProps(cssProps)
}

/**
 * return layout item class name space
 * @param item layout item
 */
export const classNameSpace = <T extends Layout.Item>(
	item: T
): `${Layout.Name}__${T}` => `${LAYOUT_NAME}__${item}`

/**
 * create layout class name space
 * @returns
 */
export const createLayoutClassNameSpace = () => {
	const classNmaes: Layout.ClassNameSpace = {
		header: classNameSpace('header'),
		sider: classNameSpace('sider'),
		tab: classNameSpace('tab'),
		footer: classNameSpace('footer'),
		view: classNameSpace('view'),
		mask: classNameSpace('mask')
	}
	return classNmaes
}
