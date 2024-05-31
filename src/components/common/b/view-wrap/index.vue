<template>
	<div ref="viewWrap" class="view-wrap view view-content-wrap">
		<el-row class="view-wrap-top-tools" v-if="$slots['tools']">
			<slot name="tools"> </slot>
		</el-row>
		<slot />
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'b-view-wrap'
})
</script>

<style lang="scss">
.view-wrap {
	display: flex;
	position: relative;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	transition:
		width var(--ani-duration),
		height var(--ani-duration);
	.view-wrap-top-tools {
		justify-content: flex-end;
		margin-bottom: 8px;
		align-items: center;
		.tool-item {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 22px;
			height: 22px;
			background-color: unset;
			border: unset;
			cursor: pointer;
			margin-left: 8px;
			border-radius: 4px;
			transition: background-color var(--ani-duration);
			&:first-child {
				margin-left: 0;
			}
			&:hover {
				background-color: var(--el-border-color-light);
			}
		}
	}
}
</style>
