<script setup lang="ts">
import * as echarts from 'echarts'
import { useEcharts } from '~/hooks/common'

defineOptions({
	name: 'bar-chart'
})

const dataAxis = [
	'1月',
	'2月',
	'3月',
	'4月',
	'5月',
	'6月',
	'7月',
	'8月',
	'9月',
	'10月',
	'11月',
	'12月'
]

const zoomSize = 6

const { chartRef, updateOptions, showLoading } = useEcharts(
	() => ({
		title: {
			text: '销售额'
		},
		xAxis: {
			data: dataAxis,
			axisLabel: {
				inside: true,
				color: '#fff'
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#999'
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: [
			{
				type: 'bar',
				showBackground: true,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#83bff6' },
						{ offset: 0.5, color: '#188df0' },
						{ offset: 1, color: '#188df0' }
					])
				},
				emphasis: {
					itemStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: '#2378f7' },
							{ offset: 0.7, color: '#2378f7' },
							{ offset: 1, color: '#83bff6' }
						])
					}
				},
				data: [] as number[]
			}
		],
		grid: {
			left: '40px',
			right: '20px',
			bottom: '20px'
		}
	}),
	{
		onRender(chart) {
			showLoading()
			chart.on('click', (params) => {
				chart.dispatchAction({
					type: 'dataZoom',
					startValue:
						dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
					endValue:
						dataAxis[Math.min(params.dataIndex + zoomSize / 2, 11)]
				})
			})
		},
		onUpdated(chart) {
			chart.hideLoading()
		}
	}
)

async function mockData() {
	await new Promise((resolve) => {
		setTimeout(resolve, 1000)
	})

	updateOptions((opts) => {
		opts.series[0].data = [
			220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149
		]

		return opts
	})
}

function init() {
	mockData()
}

init()
</script>

<template>
	<div ref="chartRef" style="height: 380px"></div>
</template>

<style scoped></style>
