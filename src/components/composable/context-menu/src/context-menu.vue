<template>
	<div
		class="b-context-menu__content"
		:style="{ width: `${width}px` }"
		ref="contextMenuContent"
	>
		<div
			v-for="(item, index) in menuList"
			v-show="!item.hidden"
			:key="index"
			class="b-context-menu__item"
			:class="{
				disabled: item.disabled,
				ellipsis: item.ellipsis
			}"
			@click.stop="handleClick(item)"
		>
			<div class="prefix">
				<svg-icon v-if="item.icon" :icon="item.icon" :size="16" />
			</div>

			<div class="content">
				<span v-if="typeof item.context == 'string'">
					{{ item.context }}
				</span>
				<template v-else>
					<component :is="item.context" />
				</template>
			</div>

			<div class="suffix">
				<template v-if="item.children && item.children.length">
					<svg-icon v-show="!item.isActive" icon="chevron-right" />
					<svg-icon v-show="item.isActive" icon="chevron-down" />
				</template>
			</div>

			<component
				:is="CMComponent"
				class="sub"
				ref="subContextMenuContent"
				v-if="item.children && item.children.length && item.isActive"
				:list="item.children"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef, nextTick } from 'vue'
import { contextMenu as cm } from './context-menu'
import { IContextMenu, ContextMenuProps } from './type'
import CMComponent from './context-menu.vue'
import { uuid } from '~/utils'

defineOptions({
	name: 'b-context-menu'
})

const props = withDefaults(defineProps<ContextMenuProps>(), {
	width: 140
})

const menuList = ref(props.list.map(mapMenuList))

const contextMenuContent = ref<HTMLDivElement>()

// 监听点击事件执行指定回调
const handleClick = (item: IContextMenu.Item) => {
	if (item.disabled) return
	if (item.children && item.children.length) {
		const mapList = (i: IContextMenu.Item) => {
			if (i.children && i.children.length) {
				i.children.forEach(mapList)
			}
			if (i.uid !== item.uid) i.isActive = false
		}
		menuList.value.forEach(mapList)
		item.isActive = !item.isActive
	}

	// 调用 done 函数关闭
	if (item.callback) {
		const done = () => cm.destroy(undefined, true)
		item.callback(done)
	}
}

function mapMenuList(item: IContextMenu.Item) {
	// 将组件转为非响应式数据
	if (typeof item.context !== 'string')
		item.context = shallowRef(item.context)

	if (item.children && item.children.length) {
		item.children = item.children.map(mapMenuList)
	}
	return {
		...item,
		uid: uuid()
	}
}
// 设置菜单打开时的位置
nextTick(() => {
	// 获取视口宽高
	const vw = window.innerWidth
	const vh = window.innerHeight
	if (!contextMenuContent.value) return
	const rect = contextMenuContent.value?.getBoundingClientRect()

	// 获取元素宽高、及视口位置
	const { width, height, left, top } = rect as DOMRect
	const bottom = vh - top - height
	const right = vw - left - width

	let offsetTop: number = 0
	let offsetRight: number = 0

	// 判断是否超过临界值(超出视口区域)，进行调整
	if (bottom < 5) offsetTop = 5 - height // 超出下边界，向上打开子菜单
	if (right < 5) offsetRight = width + 5 // 查出有边界，向左打开子菜单

	// 设置定位信息(相对于父节点)
	if (offsetTop) contextMenuContent.value.style.top = offsetTop + 'px'
	if (offsetRight) contextMenuContent.value.style.right = offsetRight + 'px'
	cm.createAnimation(contextMenuContent.value)
})
</script>

<style lang="scss">
.b-context-menu {
	position: absolute;
	z-index: 9999;
	&__content {
		background-color: var(--el-bg-color);
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		border-radius: 4px;
		position: absolute;
		z-index: auto;
		padding: var(--theme-padding) 0;
		&.sub {
			right: calc(-100% - 5px);
			top: 16px;
		}
	}
	&__item {
		position: relative;
		display: flex;
		line-height: 34px;
		align-items: center;
		color: var(--el-text-color-primary);
		cursor: pointer;
		font-size: 13px;
		transition:
			color var(--ani-duration),
			background-color var(--ani-duration);
		.prefix,
		.suffix {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 var(--theme-padding);
		}
		&:not(.disabled):hover {
			background-color: var(--el-fill-color-dark);
		}

		&.disabled {
			color: var(--el-disabled-text-color);
			cursor: not-allowed;
		}
		&.ellipsis .content {
			flex: 1;
			span {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}
		}
	}
}
</style>
