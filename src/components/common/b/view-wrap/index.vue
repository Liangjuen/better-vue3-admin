<template>
	<div ref="viewWrap" class="b-view-wrap view view-content-wrap">
		<div class="b-view-wrap__wrap">
			<el-row class="b-view-wrap-top-tools" v-if="$slots['tools']">
				<slot name="tools"> </slot>
			</el-row>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'b-view-wrap'
})
</script>

<style lang="scss">
.b-view-wrap {
	display: flex;
	height: 100%;

	&__wrap {
		display: flex;
		position: relative;
		flex-direction: column;
		height: 100%;
		width: 100%;
		border-radius: var(--el-border-radius-base);
		background-color: var(--el-bg-color);
		overflow-x: hidden;
		overflow-y: auto;
	}
	.b-view-wrap-top-tools {
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
