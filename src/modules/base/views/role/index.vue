<script setup lang="ts">
defineOptions({
	name: 'base-role'
})
</script>

<template>
	<div class="base-role-workspace">
		<el-form class="page-head">
			<el-row :gutter="24">
				<el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
					<el-form-item label="名称"><el-input /></el-form-item>
				</el-col>
				<el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6">
					<el-form-item label="名称"><el-input /></el-form-item>
				</el-col>
				<el-col :xs="24" :sm="8" :md="8" :lg="12" :xl="12">
					<el-form-item>
						<div class="flex-1"></div>
						<el-button>
							<svg-icon icon="refresh" class="mr-8" />
							<span>重置</span>
						</el-button>
						<el-button type="primary">
							<svg-icon icon="search" class="mr-8" />
							<span>查询</span>
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="page-body flex-1">
			<el-table style="width: 100%">
				<template #empty><el-empty /></template>
			</el-table>
			<el-pagination
				class="mt-8"
				background
				layout="prev, pager, next"
				:total="1000"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.base-role-workspace {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;

	.page-head {
		background-color: var(--el-bg-color);
		border-radius: var(--el-border-radius-base);
		margin-bottom: var(--theme-margin);
		padding: var(--theme-padding) var(--theme-padding) 0
			var(--theme-padding);
	}

	.page-body {
		padding: var(--theme-padding);
		background-color: var(--el-bg-color);
		border-radius: var(--el-border-radius-base);
	}

	.el-form-item {
		margin-bottom: var(--theme-margin);
	}
}
</style>
