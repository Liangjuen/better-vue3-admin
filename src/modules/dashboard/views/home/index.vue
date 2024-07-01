<script setup lang="ts">
import HeaderBanner from './components/header-banner.vue'
import CardData from './components/card-data.vue'
import PieChart from './components/pie-chart.vue'
import BarChart from './components/bar-chart.vue'
import BarAniDelayChart from './components/bar-ani-delay-chart.vue'

defineOptions({ name: 'home' })
</script>

<template>
	<div class="home-analytics-workspace">
		<header-banner />
		<card-data />
		<el-row :gutter="10">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-card shadow="never"> <bar-ani-delay-chart /></el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
				<el-card shadow="never"> <bar-chart /></el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
				<el-card shadow="never"> <pie-chart /></el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
.home-analytics-workspace {
	.el-card {
		border: unset;
		--el-card-padding: var(--theme-padding);
		margin-bottom: var(--theme-margin);
	}
}
</style>
