<template>
	<el-row class="b-row">
		<slot></slot>
	</el-row>
</template>

<script setup lang="ts">
defineOptions({
	name: 'b-row'
})
</script>

<style lang="scss">
.b-row {
	--co-search-item-width: 160px;
	--co-row-child-margin: calc(var(--theme-margin) * 0.8);
	& > * {
		margin: 0 var(--co-row-child-margin) var(--co-row-child-margin) 0;
	}
	& > *:last-child {
		margin-right: 0;
	}
	.el-form-item {
		.el-input,
		.el-select {
			width: var(--co-search-item-width);
		}
	}
	// 修改 element plus 默认样式
	.el-button + .el-button {
		margin-left: 0;
	}
}
</style>
