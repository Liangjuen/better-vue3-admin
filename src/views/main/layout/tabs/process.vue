<template>
	<vue-draggable
		v-model="processStore.list"
		:animation="250"
		target=".process-scroller"
		class="process-container"
	>
		<div ref="scroller" class="process-scroller" @wheel="handleWheel">
			<div
				v-for="item in processStore.list"
				:key="item.path"
				class="process-item"
				:class="{ active: item.active }"
				@click="onChoose(item)"
				@contextmenu="(e: MouseEvent) => openCm(e, item)"
			>
				<span>{{ item?.label || '未知页面' }}</span>
				<svg-icon
					icon="x"
					:size="16"
					@mousedown.stop="processStore.cleanCurrent(item)"
				/>
			</div>
		</div>
	</vue-draggable>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useBetter } from '~/hooks'
import { useGlobal } from '~/views'
const { processStore } = useGlobal()
const { route, router, mitt } = useBetter()
const scroller = ref<HTMLElement>()

// 将当前tab滚动到可视区中间
const scrollToView = () => {
	const active = scroller.value?.querySelector('.active')
	if (active !== null && active !== undefined) {
		const clientWidth = scroller.value!.clientWidth
		const offsetLeft = (active as HTMLLIElement).offsetLeft
		const scrollerOffsetLeft = scroller.value!.offsetLeft
		const width = (active as HTMLLIElement).clientWidth

		scroller.value?.scrollTo({
			left: offsetLeft - scrollerOffsetLeft - clientWidth / 2 + width / 2,
			behavior: 'smooth'
		})
	}
}

// 监听滚轮事件
function handleWheel(event: WheelEvent) {
	// 阻止默认滚动行为
	event.preventDefault()

	// 滚动的速度因子，可以根据需要调整
	const scrollSpeed = 1

	// 计算滚动的距离
	const distance = event.deltaY * scrollSpeed

	scroller.value?.scrollBy({
		left: distance,
		behavior: 'smooth'
	})
}

// 选择
function onChoose(item: Process.Item) {
	router.push({ path: item.path })
}

// 右键菜单
function openCm(e: PointerEvent | MouseEvent, item: Process.Item) {
	BContextMenu.create(e, {
		list: [
			{
				icon: 'rotate-cw',
				context: '重新加载',
				callback: (done) => {
					mitt.emit('view.refresh')
					done()
				},
				hidden: !item.active
			},
			{
				icon: 'x',
				context: '关闭当前',
				callback: (done) => {
					processStore.cleanCurrent(item)
					done()
				},
				hidden: !item.active
			},
			{
				icon: 'trash-2',
				context: '关闭其它',
				callback: (done) => {
					processStore.cleanOther(item)
					done()
				}
			},
			{
				icon: 'arrow-right',
				context: '关闭右侧',
				callback: (done) => {
					processStore.cleanRight(item)
					done()
				},
				hidden: !item.active || processStore.list.length == 1
			},
			{
				icon: 'arrow-left',
				context: '关闭左侧',
				callback: (done) => {
					processStore.cleanLeft(item)
					done()
				},
				hidden: !item.active || processStore.list.length == 1
			},
			{
				icon: 'minus',
				context: '关闭全部',
				callback: (done) => {
					processStore.cleanAll()
					done()
				}
			},
			{
				icon: 'trash',
				hidden: !processStore.caches.length,
				context: '清除缓存',
				callback: (done) => {
					processStore.cleanCache()
					done()
				}
			}
		],
		width: 110
	})
}

// 监测路由变化设置缓存
watch(
	() => route.path,
	() => {
		processStore.setCache(route)
		scrollToView()
	},
	{
		immediate: true
	}
)

onMounted(() => {
	scrollToView()
})
</script>

<style lang="scss" scoped>
.process-container {
	flex: 1;
	height: var(--tabs-height);
	overflow: hidden;
}

.process-scroller {
	display: flex;
	width: 100%;
	height: var(--tabs-height);
	position: relative;
	overflow-y: hidden;
	overflow-x: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	.process-item {
		flex-shrink: 0;
		display: inline-flex;
		height: 100%;
		padding: 0 var(--theme-padding);
		align-items: center;
		font-size: 13.5px;
		margin-right: var(--theme-margin);
		border-radius: var(--el-border-radius-base);
		background-color: var(--el-bg-color);
		transition:
			background-color var(--ani-duration),
			color var(--ani-duration);
		cursor: pointer;

		&:last-child {
			margin: 0;
		}
		&:hover {
			color: var(--el-color-primary);
		}
		&.active {
			background-color: var(--el-color-primary);
			color: var(--el-color-white);
		}
		.svg-icon {
			width: 0;
			transition: width var(--ani-duration);
			&:hover {
				color: var(--el-color-error);
			}
		}
		&.active,
		&:hover {
			.svg-icon {
				width: 16px;
				margin-left: 4px;
			}
		}
	}
}
</style>
