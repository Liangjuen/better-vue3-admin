<template>
	<div class="index">
		<div class="item" v-for="item in svgNames" :key="item">
			<div class="div">
				<div class="svg-box">
					<svg-icon class="svg" :icon="item" :size="24"></svg-icon>
				</div>
				<span class="svg-name-span">{{ item }}</span>
			</div>
		</div>
		<div class="placeholder" v-for="i in 8" :key="i"></div>
	</div>
</template>

<script setup lang="ts">
import svgNames from '~/assets/icons/index'
</script>

<script lang="ts">
export default {
	name: 'component-prev-icon-list'
}
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.item {
	padding: 8px;
	margin-bottom: 16px;
}

.item:hover .svg {
	stroke: var(--el-color-primary);
}

.placeholder {
	width: 176px;
	height: 0;
}

.div {
	min-width: 160px;
	width: 100%;
	height: 100%;
	padding-bottom: 16px;
	display: flex;
	flex-direction: column;
	-webkit-box-align: center;
	align-items: center;
	cursor: pointer;
	background-color: var(--el-bg-color);
	border-radius: 6px;
	box-shadow:
		rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
		rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	box-sizing: content-box;
	outline: 0px;
}

.svg-box {
	flex: 1 1 auto;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
}

.svg-name-span {
	flex: 0 0 auto;
	font-size: 12.5px;
	padding-left: 16px;
	padding-right: 16px;
	text-align: center;
	word-break: break-word;
}
</style>
