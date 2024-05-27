<template>
	<ul class="operation-container" @contextmenu="(e: MouseEvent) => openCm(e)">
		<li
			:key="item.icon"
			v-for="item in oprations"
			class="item"
			@click="item.action"
		>
			<svg-icon :icon="item.icon" :size="16" />
		</li>
	</ul>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGlobal } from '~/views'

const router = useRouter()
const { appStore } = useGlobal()

const oprations = [
	{
		icon: 'chevron-left',
		action: () => router.back()
	},
	{
		icon: 'rotate-cw',
		action: () => appStore.refreshView()
	},
	{
		icon: 'home',
		action: () => router.push('/')
	}
]

// 右键菜单
function openCm(e: PointerEvent | MouseEvent) {
	BContextMenu.create(e, {
		list: [
			{
				icon: 'rotate-cw',
				context: '重新加载',
				callback: (done) => {
					appStore.refreshView()
					done()
				}
			}
		],
		width: 110
	})
}
</script>

<style lang="scss" scoped>
.operation-container {
	display: flex;
	background-color: var(--el-bg-color);
	height: var(--tabs-height);
	border-radius: var(--el-border-radius-base);
	margin-right: var(--theme-margin);
	.item {
		padding: 7px 7px;
		border-radius: 4px;
		cursor: pointer;
		&:hover {
			color: var(--el-color-primary);
		}
		&:nth-child(2) {
			margin: 0 6px;
		}
	}
}
</style>
