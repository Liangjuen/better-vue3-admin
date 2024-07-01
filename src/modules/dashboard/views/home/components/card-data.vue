<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
	name: 'card-data'
})

interface CardData {
	title: string
	value: number
	unit: string
	color: {
		start: string
		end: string
	}
	icon: string
}

const data = [
	{
		title: '总访问量',
		value: 9548,
		unit: '',
		color: {
			start: '#3c40c6',
			end: '#575fcf'
		},
		icon: 'chart-bar'
	},
	{
		title: '用户量',
		value: 4987,
		unit: '',
		color: {
			start: '#A3CB38',
			end: '#C4E538'
		},
		icon: 'users'
	},
	{
		title: '销售额',
		value: 997845,
		unit: '￥',
		color: {
			start: '#b955a4',
			end: '#ec4786'
		},
		icon: 'yuan'
	},
	{
		title: '成交量',
		value: 2484,
		unit: '',
		color: {
			start: '#05c46b',
			end: '#0be881'
		},
		icon: 'building-library'
	}
]
const startValue = ref(0)
const cardData = ref<Array<CardData>>(data)

function getGradientColor(color: CardData['color']) {
	return `linear-gradient(to right bottom, ${color.start}, ${color.end})`
}
</script>

<template>
	<el-row :gutter="10">
		<el-col
			:xs="24"
			:sm="12"
			:md="12"
			:lg="6"
			:xl="6"
			:key="item.icon"
			v-for="item in cardData"
		>
			<el-card
				shadow="never"
				:style="{ background: getGradientColor(item.color) }"
			>
				<h3>{{ item.title }}</h3>
				<div class="card-data-content">
					<div class="icon-wrap">
						<svg-icon
							:icon="item.icon"
							:size="30"
							:stroke-width="1.5"
						/>
					</div>
					<count-to
						:prefix="item.unit"
						:start-value="startValue"
						:end-value="item.value"
					/>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<style lang="scss" scoped>
.el-card {
	border: unset;
	--el-card-padding: var(--theme-padding);
	margin-bottom: var(--theme-margin);
	color: #fff;
}

.card-data-content {
	display: flex;
	margin-top: var(--theme-margin);
	font-size: 28px;
	justify-content: space-between;
	align-items: center;
	.icon-wrap {
		padding: 10px;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
		border-radius: 10px;
	}
}
</style>
