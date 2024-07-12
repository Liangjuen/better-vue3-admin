<template>
	<ul :class="opratClass" @contextmenu="(e: MouseEvent) => openCm(e)">
		<li
			:key="item.icon"
			v-for="item in oprations"
			class="item"
			@click="item.action"
		>
			<svg-icon :icon="item.icon" :size="item.iconSize || 16" />
		</li>
	</ul>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBetter } from '~/hooks'
const props = defineProps<{
	type: Theme.TabStyle
}>()
defineOptions({
	name: 'app-tab-options'
})
const contentFullscreen = ref(false)

const opratClass = computed(() => {
	return [
		'operation-container',
		`operation-container-style-${props.type || 'default'}`
	]
})

const { mitt, router } = useBetter()

const oprations = computed(() => [
	{
		icon: 'home-analytics',
		action: () => router.push('/home'),
		iconSize: 18
	},
	{
		icon: 'refresh',
		action: () => mitt.emit('view.refresh')
	},
	{
		icon: contentFullscreen.value ? 'fullscreen-exit' : 'fullscreen',
		action: () => {
			contentFullscreen.value = !contentFullscreen.value
			mitt.emit('view.toggle.fullscreen', contentFullscreen.value)
		}
	}
])

// 右键菜单
function openCm(e: PointerEvent | MouseEvent) {
	BContextMenu.create(e, {
		list: [
			{
				icon: 'refresh',
				context: '重新加载',
				callback: (done) => {
					mitt.emit('view.refresh')
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
	height: 100%;
	background-color: var(--el-bg-color);
	border-radius: 8px;
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
