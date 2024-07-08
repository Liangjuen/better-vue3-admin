/**
 * The global namespace for the app
 */
declare namespace App {
	/** common background color mode */
	type BackgroundColorMode = 'primary' | 'dark' | 'auto'

	/** layout */
	namespace Layout {
		/** layout mode */
		type Mode =
			| 'horizontal'
			| 'vertical'
			| 'vertical-mix'
			| 'horizontal-mix'

		/** layout sider */
		interface Sider {
			hide: boolean
			collapsed: boolean
			width: number
			mixWidth: number
			collapsedWidth: number
			mixCollapsedWidth: number
			bgcMode: BackgroundColorMode
		}

		/** layout header */
		interface Header {
			hide: boolean
			height: number
			bgcMode: BackgroundColorMode
		}

		/** layout tab */
		interface Tab {
			hide: boolean
			height: number
			cache: boolean
			mode: 'chrome' | 'default' | 'button'
		}

		/** layout footer */
		interface Footer {
			hide: boolean
			height: number
		}

		/** layout header */
		interface View {
			full: boolean
		}
	}

	/** theme namepsace */
	namespace Theme {
		/** theme mode */
		type Mode = 'dark' | 'light' | 'auto'

		/** transition names */
		type TransitionName = 'zoom' | 'fade' | 'slide-left' | 'slide-right'

		/** theme setting options */
		interface SetOptions {
			theme: {
				mode: Mode
				color: string
			}
			layout: Layout.Mode
			header: Pick<Layout.Header, 'bgcMode' | 'height'>
			tab: Layout.Tab
			sider: Pick<Layout.Sider, 'hide' | 'bgcMode' | 'width'>
			footer: Layout.Footer
			viewTransition: TransitionName
		}
	}
}
