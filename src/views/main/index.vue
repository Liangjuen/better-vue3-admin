<template>
	<app-layout
		v-model:collapse="isFold"
		:hiddeSider="layoutMode == 'horizontal'"
		:hidde-tab="showTabbar"
		:class="layout"
		:is-mobile="isMobile"
		view-padding="var(--theme-padding)"
	>
		<template #topbar>
			<app-topbar :back-mode="topbarBackMode">
				<template #left v-if="layoutMode == 'horizontal'">
					<app-logo />
					<app-menu
						mode="horizontal"
						class="app-topbar-manu"
						:backMode="menuBackMode"
						:list="tree"
						:collapse="false"
					/>
				</template>
			</app-topbar>
		</template>
		<template #tab>
			<app-tab :type="tabStyle" />
		</template>
		<template #sider>
			<app-logo :showLabel="!isFold" />
			<el-scrollbar class="app-side-menu-scroller">
				<app-menu
					class="app-side-menu"
					:list="tree"
					:collapse="isFold"
					:mode="layoutMode"
					:backMode="menuBackMode"
				/>
			</el-scrollbar>
		</template>
		<template #view>
			<app-view />
		</template>
		<template #app-layout-drawer-provider><app-setup-drawer /></template>
	</app-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import AppLayout from './layout/index.vue'
import AppSetupDrawer from './layout/app-setup-drawer/index.vue'
import AppTopbar from './layout/app-topbar/index.vue'
import AppView from './layout/app-view/index.vue'
import AppMenu from './layout/app-menu/index.vue'
import AppTab from './layout/app-tab/index.vue'
import AppLogo from './layout/app-logo/index.vue'
import { useGlobal } from '~/views'

const { appStore, menuStore } = useGlobal()
const {
	isFold,
	menuBackMode,
	layoutMode,
	tabStyle,
	topbarBackMode,
	isMobile,
	showTabbar
} = storeToRefs(appStore)
const { tree } = storeToRefs(menuStore)

const layout = computed(() => {
	return [
		`menu-${appStore.layoutMode}`,
		`menu-back-${appStore.menuBackMode || 'auto'}`
	]
})
</script>

<style lang="scss">
.app-layout.menu-horizontal {
	.app-topbar-manu {
		width: calc(100vw - 356px);
		height: calc(100% - (var(--theme-padding) * 2));
		max-height: 40px;
		min-height: 30px;
		border: none;
	}
}

.app-layout.menu-vertical {
	.app-side-menu-scroller {
		height: calc(100% - var(--layout-topbar-height));
		.app-side-menu {
			height: 100%;
		}
	}
}
.app-layout.menu-back-dark {
	&.menu-horizontal {
		.app-topbar {
			background-color: var(--dark-bg-color);
			color: #fff;
		}
	}
	.app-layout-sider {
		background-color: var(--dark-bg-color);
		color: #fff;
	}
}

.app-layout.menu-back-primary {
	&.menu-horizontal {
		.app-topbar {
			background-color: var(--el-color-primary-light-3);
			color: #fff;
		}
	}
	.app-layout-sider {
		background-color: var(--el-color-primary-light-3);
		color: #fff;
	}
}
</style>
