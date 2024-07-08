import { ref, effectScope, nextTick, onScopeDispose, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import * as echarts from 'echarts/core'
import {
	BarChart,
	GaugeChart,
	LineChart,
	PictorialBarChart,
	PieChart,
	RadarChart,
	ScatterChart
} from 'echarts/charts'
import type {
	BarSeriesOption,
	GaugeSeriesOption,
	LineSeriesOption,
	PictorialBarSeriesOption,
	PieSeriesOption,
	RadarSeriesOption,
	ScatterSeriesOption
} from 'echarts/charts'
import {
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useGlobal } from '~/store'

import type {
	DatasetComponentOption,
	GridComponentOption,
	LegendComponentOption,
	TitleComponentOption,
	ToolboxComponentOption,
	TooltipComponentOption
} from 'echarts/components'

/**
 * use echarts hooks options
 */
export type UseEchartsOptions = echarts.ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| PieSeriesOption
	| ScatterSeriesOption
	| PictorialBarSeriesOption
	| RadarSeriesOption
	| GaugeSeriesOption
	| TitleComponentOption
	| LegendComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| ToolboxComponentOption
	| DatasetComponentOption
>

echarts.use([
	TitleComponent,
	LegendComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	ToolboxComponent,
	BarChart,
	LineChart,
	PieChart,
	ScatterChart,
	PictorialBarChart,
	RadarChart,
	GaugeChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer
])

/**
 * charts events
 */
interface ChartEvents {
	onRender?: (chart: echarts.ECharts) => void | Promise<void>
	onUpdated?: (chart: echarts.ECharts) => void | Promise<void>
	onDestroy?: (chart: echarts.ECharts) => void | Promise<void>
}

/**
 * create charts default events
 *
 * @returns emitters
 */
const createChartsEvents = (): ChartEvents => {
	const onRender = (_instance: echarts.ECharts) => {
		// do some thing ...
	}

	const onUpdated = (_instance: echarts.ECharts) => {
		// do some thing ...
	}

	const onDestroy = (_instance: echarts.ECharts) => {
		// do some thing ...
	}

	return {
		onRender,
		onUpdated,
		onDestroy
	}
}

/**
 * use echarts
 * @param optionsFactory echarts options factory function
 * @param events events
 * @returns
 */
export const useEcharts = <T extends UseEchartsOptions>(
	optionsFactory: () => T,
	events: ChartEvents = {}
) => {
	const scope = effectScope()

	const { appStore } = useGlobal()

	const echartsOptions = optionsFactory()

	const chartRef = ref<HTMLElement | null>(null)

	const initialSize = { width: 0, height: 0 }

	const { width, height } = useElementSize(chartRef, initialSize)

	let chart: echarts.ECharts | null = null

	const { onRender, onUpdated, onDestroy } = {
		...createChartsEvents(),
		...events
	}

	/**
	 * whether can render chart
	 *
	 * when domRef is ready and initialSize is valid
	 */
	function isReady() {
		return chartRef.value && initialSize.width > 0 && initialSize.height > 0
	}

	/**
	 * is chart rendered
	 */
	function isRendered() {
		return Boolean(chartRef.value && chart)
	}

	/**
	 * show chart loading ...
	 */
	function showLoading() {
		if (!chart) return
		const { appStore } = useGlobal()

		chart.showLoading({
			text: '',
			color: appStore.color,
			fontSize: 14,
			textColor: appStore.isDark
				? 'rgb(224, 224, 224)'
				: 'rgb(31, 31, 31)',
			maskColor: appStore.isDark
				? 'rgba(0, 0, 0, 0.4)'
				: 'rgba(255, 255, 255, 0.8)'
		})
	}

	/**
	 * hidde loading
	 */
	function hideLoading() {
		chart?.hideLoading()
	}

	/**
	 * update chart options
	 * @param callback callback function
	 */
	async function updateOptions(
		callback: (opts: T, optsFactory: () => T) => UseEchartsOptions
	) {
		if (isRendered()) {
			const updateOpts = callback(echartsOptions, optionsFactory)

			Object.assign(echartsOptions, updateOpts)

			chart?.clear()

			chart?.setOption({ backgroundColor: 'transparent', ...updateOpts })

			await onUpdated?.(chart!)
		}
	}

	function setOptions(options: T) {
		chart?.setOption(options)
	}

	/**
	 * render chart
	 */
	async function render() {
		if (!isRendered()) {
			const theme = appStore.isDark ? 'dark' : 'light'
			await nextTick()

			chart = echarts.init(chartRef.value, theme)

			chart.setOption({
				backgroundColor: 'transparent',
				...echartsOptions
			})

			await onRender?.(chart)
		}
	}

	/**
	 * resize chart
	 */
	function resize() {
		chart?.resize()
	}

	/**
	 * destroy chart
	 */
	async function destroy() {
		if (!chart) return

		await onDestroy?.(chart)
		chart?.dispose()
		chart = null
	}

	/**
	 * on chart theme changed
	 */
	async function onThemeChange() {
		await destroy()
		await render()
		await onUpdated?.(chart!)
	}

	async function onSizeChange(w: number, h: number) {
		initialSize.width = w
		initialSize.height = h

		// size is abnormal, destroy chart
		if (!isReady()) {
			await destroy()

			return
		}

		// resize chart
		if (isRendered()) {
			resize()
		}

		// render chart
		await render()
	}

	scope.run(() => {
		watch([width, height], ([newWidth, newHeight]) => {
			onSizeChange(newWidth, newHeight)
		})

		watch(
			() => appStore.isDark,
			() => {
				onThemeChange()
			}
		)
	})

	onScopeDispose(() => {
		destroy()
		scope.stop()
	})

	return {
		chartRef,
		width,
		height,
		showLoading,
		hideLoading,
		updateOptions,
		isReady,
		isRendered,
		render,
		resize,
		destroy,
		setOptions
	}
}
