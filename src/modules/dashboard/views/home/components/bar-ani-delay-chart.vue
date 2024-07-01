<script setup lang="ts">
import { useEcharts } from '~/hooks/common'

defineOptions({
	name: 'pie-ani-delay-chart'
})

const xAxisData: string[] = []
const data1: number[] = []
const data2: number[] = []
for (var i = 0; i < 60; i++) {
	xAxisData.push('A' + i)
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 6)
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 6)
}

const { chartRef } = useEcharts(() => ({
	toolbox: {
		// y: 'bottom',
		feature: {
			magicType: {
				type: ['stack']
			},
			dataView: {},
			saveAsImage: {
				pixelRatio: 2
			}
		}
	},
	tooltip: {},
	xAxis: {
		data: xAxisData,
		splitLine: {
			show: false
		}
	},
	yAxis: {},
	series: [
		{
			name: 'bar',
			type: 'bar',
			data: data1,
			emphasis: {
				focus: 'series'
			},
			animationDelay: function (idx) {
				return idx * 10
			}
		},
		{
			name: 'bar2',
			type: 'bar',
			data: data2,
			emphasis: {
				focus: 'series'
			},
			animationDelay: function (idx) {
				return idx * 10 + 100
			}
		}
	],
	grid: {
		left: '40px',
		right: '20px',
		bottom: '40px'
	},
	animationEasing: 'elasticOut',
	animationDelayUpdate: function (idx: number) {
		return idx * 5
	}
}))
</script>

<template>
	<div ref="chartRef" style="height: 380px"></div>
</template>

<style scoped></style>
