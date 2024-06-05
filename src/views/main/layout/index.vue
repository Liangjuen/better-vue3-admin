<script setup lang="ts">
import { computed } from 'vue'
import { AppLayoutProps, defaultProps } from './type'

defineOptions({
	name: 'app-layout'
})

const props = withDefaults(defineProps<AppLayoutProps>(), defaultProps)

const appLayoutClasses = computed(() => {
	return {
		collapse: props.isFold,
		mobile: props.isMobile,
		'app-layout': true,
		'hidde-sider': props.hiddeSider,
		'hidde-topbar': props.hiddeTopbar,
		'hidde-tab': props.hiddeTab,
		'hidde-footer': props.hiddeFooter
	}
})

const appLayoutStyles = computed(() => {
	return {
		...(props.viewPadding && {
			'--layout-view-padding':
				typeof props.viewPadding == 'number'
					? `${props.viewPadding}px`
					: props.viewPadding
		})
	}
})
</script>

<template>
	<div :class="appLayoutClasses" :style="appLayoutStyles">
		<!-- 左侧 -->

		<aside class="app-layout-sider">
			<slot name="sider"></slot>
		</aside>
		<!-- 主体 -->
		<slot name="app-layout-main">
			<div class="app-layout-main">
				<div class="app-layout-topbar">
					<slot name="topbar"></slot>
				</div>
				<div class="app-layout-tab">
					<slot name="tab"></slot>
				</div>
				<div class="app-layout-view">
					<slot name="view"></slot>
				</div>
				<div class="app-layout-footer" v-if="!hiddeFooter">
					<slot name="footer"></slot>
				</div>
			</div>
		</slot>
		<!-- 抽屉注入器 -->
		<div class="app-layout-drawer-provider">
			<slot name="app-layout-drawer-provider"></slot>
		</div>
		<Transition name="fade" appear mode="out-in">
			<div class="app-layout-mask" v-if="isFold && isMobile"></div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.app-layout {
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: var(--el-bg-color-page);
}
</style>

<style lang="scss">
.app-layout {
	--layout-view-height: calc(
		100vh -
			(
				var(--topbar-height) + var(--layout-footer-height) +
					var(--layout-tab-height)
			)
	);
	&-sider {
		width: var(--layout-sider-width);
		height: 100%;
		overflow: hidden;
		transition: transform var(--ani-duration) var(--ani-timing-function);
		z-index: var(--layout-sider-z-index);
		box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
	}

	&-main {
		width: calc(100% - var(--layout-sider-width));
		height: 100%;
	}

	&-main,
	&-sider {
		transition: width var(--ani-duration) var(--ani-timing-function);
	}

	&-topbar {
		position: relative;
		width: 100%;
		height: var(--layout-topbar-height);
		z-index: var(--layout-topbar-z-index);
		box-shadow: rgba(0, 0, 0, 0.08) 1px 1px 2px;
	}

	&-tab {
		position: relative;
		width: 100%;
		height: var(--layout-tab-height);
		z-index: var(--layout-tab-z-index);
	}

	&-view {
		width: 100%;
		height: var(--layout-view-height);
		padding: var(--layout-view-padding);
		overflow: auto;
	}

	&-footer {
		width: 100%;
		height: var(--layout-footer-height);
	}

	&-drawer-provider {
		position: absolute;
	}

	&-topbar,
	&-sider,
	&-tab,
	&-footer {
		background-color: var(--el-bg-color);
	}

	.padding &-topbar,
	.padding &-tab,
	.padding &-view,
	.padding &-footer {
		padding: var(--layout-padding);
	}

	&.hidde-topbar {
		--layout-topbar-height: 0px;
	}

	&.hidde-sider {
		--layout-sider-width: 0px;
	}

	&.hidde-tab {
		--layout-tab-height: 0px;
	}

	&.hidde-footer {
		--layout-footer-height: 0px;
	}

	&.collapse {
		.app-layout-sider {
			width: var(--layout-collapse-aside-width);
		}

		.app-layout-main {
			width: calc(100% - var(--layout-collapse-aside-width));
		}
	}

	&-mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background-color: var(--el-overlay-color-lighter);
		backdrop-filter: blur(var(--filter));
	}
}

.mobile {
	&.app-layout {
		.app-layout-main {
			width: 100%;
		}
		.app-layout-sider {
			position: absolute;
			z-index: 9999;
		}
	}
	&.collapse.app-layout {
		.app-layout-sider {
			transform: translateX(-100%);
		}
	}
}
</style>
