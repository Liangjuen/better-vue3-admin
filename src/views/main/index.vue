<template>
	<div :class="layout">
		<div
			v-show="!appStore.isFold && appStore.isVertical"
			class="app-layout-mask"
			@click="appStore.isFold = true"
		></div>
		<app-aside
			v-if="appStore.isVertical"
			:class="[
				'app-layout-aside',
				'app-layout-item',
				appStore.menuBackMode
			]"
		/>
		<div class="app-layout-main">
			<app-topbar class="app-layout-item">
				<template #left v-if="!appStore.isVertical">
					<app-logo />
					<app-menu class="app-topbar-manu" />
				</template>
			</app-topbar>
			<app-tabs v-show="appStore.showTabbar" />
			<app-main class="app-views" />
		</div>
		<app-set-opt-drawer class="app-layout-item" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGlobal } from '../index'
const { appStore } = useGlobal()
import AppLogo from './layout/logo/index.vue'
import AppMenu from './layout/menu/index.vue'
import AppAside from './layout/aside/index.vue'
import AppTopbar from './layout/topbar/index.vue'
import AppMain from './layout/index.vue'
import AppTabs from './layout/tabs/index.vue'
import AppSetOptDrawer from './layout/set-opt-drawer/index.vue'

defineOptions({
	name: 'app-layout'
})

let layout = computed(() => {
	return [
		'app-layout',
		appStore.layoutMode,
		`menu-back-${appStore.menuBackMode || 'none'}`,
		{ collapse: appStore.isFold, 'show-tabbar': appStore.showTabbar }
	]
})
</script>

<style lang="scss">
.app-layout {
	--view-height: calc(
		100vh - (var(--theme-margin) * 2 + var(--topbar-height))
	);
	&.show-tabbar {
		--view-height: calc(
			100vh -
				(
					(var(--theme-margin) * 3) + var(--topbar-height) +
						var(--tabs-height)
				)
		);
	}
}
/**
 *	菜单垂直布局
 */
.app-layout.vertical,
.app-layout {
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: var(--el-bg-color-page);
	.app-layout-item {
		background-color: var(--el-bg-color);
	}
	.app-layout-main {
		height: 100%;
		width: 100%;
	}
	.app-layout-aside {
		width: var(--left-aside-width);
		overflow: hidden;
		transition: transform var(--ani-duration) var(--ani-timing-function);
	}
	&.collapse .app-layout-aside {
		width: var(--collapse-left-aside-width);
	}
}

/**
 *	菜单水平布局
 */
.app-layout.horizontal {
	.app-topbar-manu {
		width: calc(100vw - 356px);
		height: calc(100% - (var(--theme-padding) * 2));
		max-height: 40px;
		min-height: 30px;
		border: none;
	}
}

.app-layout.menu-back-dark {
	&.horizontal {
		.app-topbar,
		.username {
			background-color: var(--dark-bg-color);
			color: #fff;
		}
	}
	.app-layout-aside {
		background-color: var(--dark-bg-color);
		color: #fff;
	}
}

.app-layout.menu-back-auto {
	&.horizontal {
		.app-topbar,
		.username {
			background-color: var(--el-color-primary-light-3);
			color: #fff;
		}
	}
	.app-layout-aside {
		background-color: var(--el-color-primary-light-3);
		color: #fff;
	}
}

.app-views {
	position: relative;
	height: var(--view-height);
	margin: 0 var(--theme-margin) var(--theme-margin) var(--theme-margin);
	overflow: hidden;
	.el-scrollbar__view {
		height: 100%;
	}
	.view {
		height: 100%;
		background-color: var(--el-bg-color);
		overflow: hidden auto;
	}

	.view-content-wrap {
		box-sizing: border-box;
		padding: var(--theme-padding);
	}
}

@media only screen and (max-width: 768px) {
	.app-layout.vertical,
	.app-layout {
		.app-layout-main {
			width: 100%;
		}
		.app-layout-aside {
			position: absolute;
			z-index: 9999;
		}
		&.collapse .app-layout-aside {
			transform: translate(-100%);
		}
		.app-layout-mask {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 999;
			background-color: var(--el-overlay-color-lighter);
			backdrop-filter: blur(var(--filter));
			transition: display 0.2s ease-in-out;
		}
	}
}

@media only screen and (min-width: 768px) {
	.app-layout.vertical,
	.app-layout {
		.app-layout-main,
		.app-layout-aside {
			transition: width var(--ani-duration) var(--ani-timing-function);
		}

		&.collapse .app-layout-main {
			width: calc(100% - var(--collapse-left-aside-width));
		}

		.app-layout-main {
			width: calc(100% - var(--left-aside-width));
		}
	}

	.app-layout.horizontal {
		.app-layout-main {
			width: 100%;
		}
	}
}
</style>
