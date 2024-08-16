<script lang="ts" setup>
import { Data } from '~/enums/permission.enum'
function refresh() {}
</script>

<template>
	<div class="dict-type-list">
		<div class="dict-type-list__header">
			<div class="title">字典类型</div>
			<div class="flex-1"></div>
			<el-tooltip content="刷新">
				<button class="tool-item" @click="refresh">
					<svg-icon icon="refresh" />
				</button>
			</el-tooltip>
			<el-tooltip content="新增">
				<button v-permission="Data.DictType.Create" class="tool-item">
					<svg-icon icon="plus" :size="18" />
				</button>
			</el-tooltip>
		</div>
		<div class="dict-type-list__container">
			<el-scrollbar> </el-scrollbar>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dict-type-list {
	height: 100%;
	display: flex;
	flex-direction: column;

	&__header {
		font-size: 14px;
		display: flex;
		align-items: center;
		position: relative;
		height: var(--b-view-head-height);
		padding: 0 var(--theme-padding);
	}
	&__container {
		flex: 1;
		margin-top: var(--theme-margin);
		padding: 0 var(--theme-padding);
	}
}
</style>
