import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { primaryColor } from '~/utils'
import { StoreName } from '~/enums'
import { config } from '~/config'

const defaultOptions = config.theme.default

export const useAppStore = defineStore(
	StoreName.APP,
	() => {
		// 是否折叠左侧菜单
		const isFold = ref(false)

		// 布局模式
		const layoutMode = ref<Theme.LayoutMode>(defaultOptions.layoutMode)

		// 是否为垂直菜单布局
		const isVertical = computed(() => layoutMode.value == 'vertical')

		// 是否显示 tabbar
		const showTabbar = ref(defaultOptions.showTabbar)

		// 是否打开右侧设置
		const showSettings = ref(false)

		// 菜单背景设置
		const menuBackMode = ref<Theme.MenuBackMode>(
			defaultOptions.menuBackMode
		)

		// 主题颜色
		const color = ref(defaultOptions.color)

		// 菜单宽度
		const menuWidth = ref(defaultOptions.menuWidth)

		// 过度动画
		const animationName = ref(defaultOptions.animationName)

		// 当前是否重新加载页面
		const isRefresh = ref(false)

		// 最大缓存路由页面数
		const maxCache = ref(config.maxKeepAlive)

		// 防抖函数 根据需求自行调整
		const debouncedRefreshView = useDebounceFn(() => {
			isRefresh.value = false
		}, 1000)

		// 刷新页面()
		function refreshView() {
			if (isRefresh.value) return
			isRefresh.value = true
			debouncedRefreshView()
		}

		// 重置设置
		function $reset() {
			layoutMode.value = defaultOptions.layoutMode
			menuBackMode.value = defaultOptions.menuBackMode
			color.value = defaultOptions.color
			animationName.value = defaultOptions.animationName
			showTabbar.value = defaultOptions.showTabbar
			menuWidth.value = defaultOptions.menuWidth
		}

		watch(
			layoutMode,
			(val) => {
				isFold.value = val === 'vertical'
			},
			{ immediate: true }
		)

		watch(
			color,
			(val) => {
				if (!val) val = '#409EFF'
				primaryColor.set(val).setGradient()
			},
			{ immediate: true }
		)

		watch(
			menuWidth,
			(val) => {
				document.documentElement.style.setProperty(
					'--left-aside-width',
					`${val}px`
				)
			},
			{
				immediate: true
			}
		)

		return {
			isFold,
			layoutMode,
			isVertical,
			showTabbar,
			showSettings,
			menuBackMode,
			color,
			menuWidth,
			animationName,
			isRefresh,
			maxCache,
			refreshView,
			$reset
		}
	},
	{
		persist: {
			storage: localStorage,
			paths: [
				'isFold',
				'layoutMode',
				'isVertical',
				'showTabbar',
				'showSettings',
				'menuBackMode',
				'color',
				'menuWidth',
				'animationName',
				'maxCache'
			]
		}
	}
)
