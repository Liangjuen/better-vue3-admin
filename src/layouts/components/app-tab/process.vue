<template>
	<vue-draggable
		v-model="processStore.list"
		:animation="250"
		:disabled="isMobile"
		target=".process-scroller"
		:class="processClass"
	>
		<div ref="scroller" class="process-scroller" @wheel="handleWheel">
			<div
				v-for="item in processStore.list"
				class="process-item"
				:key="item.path"
				:class="{ active: item.active }"
				@click="onChoose(item)"
				@contextmenu="(e: MouseEvent) => openCm(e, item)"
			>
				<svg-icon
					class="prefix"
					:stroke-width="1.5"
					:icon="item.icon"
				/>
				<div class="content">{{ item?.label || '未知页面' }}</div>
				<svg-icon
					icon="x"
					class="suffix"
					:size="16"
					:stroke-width="1"
					@click.stop="handleClose(item)"
				/>
			</div>
		</div>
	</vue-draggable>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useBetter } from '~/hooks'
import { useGlobal } from '~/store'
const props = defineProps<{
	type: Theme.TabStyle
	isMobile: boolean
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
	const scrollSpeed = 0.8

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

function handleClose(item: Process.Item) {
	processStore.cleanCurrent(item)
}

// 右键菜单
function openCm(e: PointerEvent | MouseEvent, item: Process.Item) {
	BContextMenu.create(e, {
		list: [
			{
				icon: 'refresh',
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
				margin-right: 0;
				padding: 0 var(--theme-padding);
				&:first-child {
					margin-left: var(--theme-margin);
				}
				&::before,
				&::after {
					position: absolute;
					bottom: 0;
					content: '';
					width: 20px;
					height: 20px;
					border-radius: 100%;
					box-shadow: 0 0 0 40px transparent;
				}
				&::before {
					left: -20px;
					clip-path: inset(50% -10px 0 50%);
				}
				&::after {
					right: -20px;
					clip-path: inset(50% 50% 0 -10px);
				}
				&.active {
					position: relative;
					z-index: 1;
					&::before,
					&::after {
						box-shadow: 0 0 0 40px var(--el-color-primary-light-9) !important; /*使用box-shadow不影响尺寸*/
					}
				}
				&:hover:not(.active) {
					position: relative;
					background-color: var(--el-color-info-light-8);
					&::before,
					&::after {
						box-shadow: 0 0 0 40px var(--el-color-info-light-8);
					}
				}
			}
		}
	}
	&-style-card {
		.process-item {
			border: 1px solid var(--el-border-color);
			&:hover {
				border-color: var(--el-color-primary-light-7);
			}
			&.active {
				border: 1px solid var(--el-color-primary-light-7);
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
		border-radius: 5px;
		background-color: var(--el-bg-color);
		cursor: pointer;
		&:last-child {
			margin: 0;
		}
		&:hover {
			color: var(--el-color-primary);
		}
		&.active {
			background-color: var(--el-color-primary-light-9);
			color: var(--el-color-primary);
		}
		.prefix {
			margin-right: calc(var(--layout-margin) / 2);
		}
		.content {
			max-width: 180px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.suffix {
			margin-left: calc(var(--layout-margin) / 2);
			&:hover {
				color: var(--el-color-error);
			}
		}
	}
}
</style>
