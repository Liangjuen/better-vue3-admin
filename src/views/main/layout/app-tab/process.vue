<template>
	<vue-draggable
		v-model="processStore.list"
		:animation="250"
		target=".process-scroller"
		:class="processClass"
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
import { ref, onMounted, watch, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useBetter } from '~/hooks'
import { useGlobal } from '~/views'
const props = defineProps<{
	type: Theme.TabStyle
}>()
defineOptions({
	name: 'app-tab-process'
})
const { processStore } = useGlobal()
const { route, router, mitt } = useBetter()
const scroller = ref<HTMLElement>()

const processClass = computed(() => {
	return [
		'process-container',
		`process-container-style-${props.type || 'default'}`
	]
})
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
html.dark {
	.process-container {
		--process-bgc-fill: var(--el-color-primary-dark-2);
	}
}
.process-container {
	--process-bgc-fill: var(--el-color-primary-light-9);
	flex: 1;
	height: 100%;
	overflow: hidden;
	&-style-chrome {
		.process-scroller {
			.process-item {
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				border-bottom-left-radius: unset;
				border-bottom-right-radius: unset;
				&:first-child {
					margin-left: var(--layout-margin);
				}
				&::before,
				&::after {
					transition: all var(--ani-duration);
				}
				&.active {
					position: relative;
					&::before,
					&::after {
						position: absolute;
						bottom: 0;
						content: '';
						width: 10px;
						height: 15px;
						border-radius: 100%;
						box-shadow: 0 0 0 30px var(--el-color-primary-light-8); /*使用box-shadow不影响尺寸*/
					}

					&::before {
						left: -10px;
						clip-path: inset(50% 0 0 50%);
					}
					&::after {
						right: -10px;
						clip-path: inset(50% 50% 0 0);
					}
				}
			}
		}
	}
	&-style-card {
		.process-item {
			border: 1px solid var(--el-border-color);
			&.active {
				border: 1px solid var(--el-color-primary);
			}
		}
	}
}

.process-scroller {
	display: flex;
	width: 100%;
	height: 100%;
	position: relative;
	overflow-y: hidden;
	overflow-x: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	.process-item {
		--ab-width: calc(var(--layout-tab-height) - var(--layout-padding));
		--offset: calc(var(--ab-width) / 2);
		flex-shrink: 0;
		display: inline-flex;
		height: 100%;
		padding: 0 var(--layout-padding);
		align-items: center;
		font-size: 13.5px;
		margin-right: var(--layout-margin);
		border-radius: 8px;
		background-color: var(--el-bg-color);
		transition: color var(--ani-duration);
		cursor: pointer;
		&:last-child {
			margin: 0;
		}
		&:hover {
			color: var(--el-color-primary);
		}
		&.active {
			background-color: var(--el-color-primary-light-8);
			color: var(--el-color-primary);
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
