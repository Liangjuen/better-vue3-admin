<template>
	<div
		class="b-view-group"
		:style="{ '--b-view-left-width': leftWidth }"
		:class="{ collapse }"
	>
		<div class="b-view-group__wrap">
			<!-- 左侧视图 -->
			<div class="b-view-group__left">
				<slot name="left">
					<div class="head">
						<div class="title">{{ leftViewTitle }}</div>
						<div class="tools">
							<slot name="left-tools" />
						</div>
					</div>
					<div class="content">
						<slot name="left-content" />
					</div>
				</slot>
				<div class="collapse-switch" @click="toggle">
					<svg-icon icon="chevron-right" :size="22" />
				</div>
			</div>

			<!-- 右侧视图 -->
			<div class="b-view-group__right">
				<slot name="right">
					<div class="head">
						<button class="tool-item toggle" @click="toggle">
							<svg-icon
								:icon="
									collapse ? 'chevron-right' : 'chevron-left'
								"
								:size="18"
							/>
						</button>
						<div class="title">{{ rightViewTitel }}</div>
						<div class="tools">
							<slot name="right-tools" />
						</div>
					</div>
					<div class="content">
						<slot name="right-content" />
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ViewGroupProps } from './type'
const props = withDefaults(defineProps<ViewGroupProps>(), {
	viewLeftWidth: 320,
	leftViewTitle: '标题',
	rightViewTitel: '标题'
})

const collapse = ref(false)

const leftWidth = computed(() =>
	typeof props.viewLeftWidth == 'number'
		? props.viewLeftWidth + 'px'
		: props.viewLeftWidth
)
const toggle = () => (collapse.value = !collapse.value)

defineExpose({
	collapse
})
defineOptions({
	name: 'b-view-group'
})
</script>

<style lang="scss">
.b-view-group {
	--b-view-head-height: 40px;
	overflow: hidden;
	&.collapse {
		.b-view-group__right {
			width: 100%;
			border-left: none;
		}
	}
	width: 100%;
	height: 100%;
	&__wrap {
		display: flex;
		position: relative;
		height: 100%;
		width: 100%;
	}

	&__left {
		width: var(--b-view-left-width);
		height: 100%;
		background-color: var(--el-bg-color);
		position: relative;
		transition: transform var(--ani-duration) var(--ani-timing-function);
		.head {
			justify-content: space-between;
		}
		.collapse-switch {
			display: none;
			width: 38px;
			height: 38px;
			background-color: var(--el-color-primary);
			box-shadow: var(--el-color-primary-dark-2) 0px 5px 15px;
			.svg-icon {
				color: #fff;
			}
			cursor: pointer;
		}
	}

	&__left,
	&__right {
		border-radius: var(--el-border-radius-base);
		.head {
			display: flex;
			align-items: center;
			position: relative;
			height: var(--b-view-head-height);
			padding: 0 var(--theme-padding);
			.title {
				font-size: 14px;
			}
			.tools {
				display: flex;
			}
		}
	}

	&__left .content,
	&__right .content {
		height: calc(100% - var(--b-view-head-height));
		overflow-x: hidden;
	}

	&__right {
		position: absolute;
		width: calc(100% - var(--b-view-left-width) - var(--theme-margin));
		height: 100%;
		right: 0;
		top: 0;
		background-color: var(--el-bg-color);
		transition: width var(--ani-duration) var(--ani-timing-function);
		.head {
			justify-content: center;
			.toggle {
				position: absolute;
				left: var(--theme-padding);
				top: 50%;
				transform: translateY(-50%);
			}
			.tools {
				position: absolute;
				right: var(--theme-padding);
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}

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
			color: var(--el-color-primary);
		}
	}
}
</style>

<style lang="scss">
@media only screen and (max-width: 768px) {
	.b-view-group {
		&__left {
			width: 100%;
			z-index: 10;
			.collapse-switch {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				border-radius: 50%;
				right: var(--theme-padding);
				bottom: var(--theme-padding);
			}
		}

		&__right {
			width: 100%;
			border: none;
		}

		&.collapse {
			.b-view-group__left {
				transform: translateX(-100%);
			}
		}
	}
}
</style>
