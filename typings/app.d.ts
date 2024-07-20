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
			mode: 'chrome' | 'default' | 'card'
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

	/** i18n namespace */
	namespace I18n {
		type Lang = 'en-US' | 'zh-CN'

		interface LangOption {
			label: string
			value: Lang
		}
	}

	/** app config namespace */
	namespace Config {
		/** app set options */
		interface SetOption {
			layoutMode: Layout.Mode
			headerBackMode: BackgroundColorMode
			siderBackMode: BackgroundColorMode
			color: string
			animationName: Theme.TransitionName | 'none'
			showTabbar: boolean
			showFooter: boolean
			siderWidth: number
			radius: number
			tabStyle: Layout.Tab['mode']
			language: I18n.Lang
		}

		interface TabStyleOption {
			label: string
			value: Layout.Tab['mode']
		}

		interface BackModeOption {
			label: string
			value: BackgroundColorMode
		}

		interface ViewTransitionNameOption {
			label: string
			value: Theme.TransitionName | 'none'
		}
	}
}
