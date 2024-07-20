<template>
	<div class="icon-list padding-theme">
		<div
			class="item"
			v-for="item in svgNames"
			:key="item"
			@click="handleClick(item)"
		>
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
import { useClipboard } from '@vueuse/core'
import svgNames from '~/assets/icons/index'
const { copy } = useClipboard()

function handleClick(item: string) {
	const content = `<svg-icon icon="${item}" />`
	copy(content)
	ElMessage.success({
		message: `已拷贝${content}`
	})
}
</script>

<script lang="ts">
export default {
	name: 'component-prev-icon-list'
}
</script>

<style lang="scss" scoped>
.icon-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.item {
	padding: var(--theme-padding);
	margin-bottom: var(--theme-margin);
	.svg {
		transition: transform 0.3s;
	}
}

.item:hover {
	.svg {
		stroke: var(--el-color-primary);
		transform: scale(1.1);
	}
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
		rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
		rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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
