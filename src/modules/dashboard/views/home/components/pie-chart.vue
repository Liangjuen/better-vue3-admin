<script setup lang="ts">
import { useEcharts } from '~/hooks/common'

defineOptions({
	name: 'pie-chart'
})

const { chartRef, updateOptions, showLoading } = useEcharts(
	() => ({
		title: {
			text: '销售额类别占比'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			bottom: '1%',
			left: 'center',
			itemStyle: {
				borderWidth: 0
			}
		},
		series: [
			{
				color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca', '#3366dd'],
				name: '访问来源',
				type: 'pie',
				roseType: 'area',
				radius: [40, 160],
				center: ['50%', '50%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 8,
					borderColor: '#fff'
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '14'
					}
				},
				labelLine: {
					show: false
				},
				data: [] as { name: string; value: number }[]
			}
		]
	}),
	{
		onRender() {
			showLoading()
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
			{ name: '服装首饰', value: 20 },
			{ name: '个人护理', value: 30 },
			{ name: '家具家装', value: 40 },
			{ name: '饮食生鲜', value: 70 },
			{ name: '电子产品', value: 80 }
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
