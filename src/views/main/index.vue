<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import AppLayout from '~/layouts/app-layout/index.vue'
import AppSetupDrawer from '~/layouts/components/app-setup-drawer/index.vue'
import AppHeader from '~/layouts/components/app-header/index.vue'
import AppView from '~/layouts/components/app-view/index.vue'
import AppMenu from '~/layouts/components/app-menu/index.vue'
import AppTab from '~/layouts/components/app-tab/index.vue'
import AppLogo from '~/layouts/components/app-logo/index.vue'
import AppSider from '~/layouts/components/app-sider/index.vue'
import AppBacktop from '~/layouts/components/app-backtop/index.vue'
import { useGlobal } from '~/store'
import { useBetter } from '~/hooks'

import type { Layout } from '~/layouts/app-layout'

const { mitt } = useBetter()
const { appStore, menuStore } = useGlobal()
const {
	isFold,
	siderBackMode,
	tabStyle,
	headerBackMode,
	isMobile,
	showTabbar
} = storeToRefs(appStore)
const { tree, secondLevelMenus } = storeToRefs(menuStore)

/** content fullscreen */
const viewFull = ref(false)

const layoutRef = ref()

const layoutMode = computed(() => {
	const vertical: Layout.Mode = 'vertical'
	const horizontal: Layout.Mode = 'horizontal'
	return appStore.layoutMode.includes('vertical') ||
		appStore.layoutMode == 'horizontal-mix'
		? vertical
		: horizontal
})

function toggleFullscreen(full: boolean) {
	viewFull.value = full
}

function scrollToTop() {
	if (layoutRef.value) {
		layoutRef.value.backTop()
	}
}

onMounted(() => {
	mitt.on('view.toggle.fullscreen', toggleFullscreen)
	mitt.on('view.refresh', scrollToTop)
})

onUnmounted(() => {
	mitt.off('view.toggle.fullscreen')
	mitt.off('view.refresh')
})
</script>

<template>
	<app-layout
		v-model:siderCollapse="isFold"
		v-model:fullView="viewFull"
		:ref="layoutRef"
		:mode="layoutMode"
		:mobile="isMobile"
		:hide-tab="!showTabbar"
	>
		<template #header>
			<app-header :back-mode="headerBackMode">
				<template v-if="appStore.layoutMode == 'horizontal'" #left>
					<app-logo />
					<app-menu
						mode="horizontal"
						class="app-header-manu"
						:backMode="headerBackMode"
						:list="tree"
						:collapse="false"
					/>
				</template>
				<template
					v-else-if="appStore.layoutMode == 'horizontal-mix'"
					#left
				>
					<app-logo />
					<app-menu
						mode="horizontal"
						class="app-header-manu"
						:backMode="headerBackMode"
						:list="secondLevelMenus"
						:collapse="false"
						:simple="headerBackMode == 'auto'"
					/>
				</template>
			</app-header>
		</template>
		<template #tab><app-tab :type="tabStyle" /></template>
		<template #sider>
			<app-sider
				:list="tree"
				:mode="appStore.layoutMode"
				:back-mode="siderBackMode"
				v-model:collapse="isFold"
			/>
		</template>
		<app-view />
		<app-setup-drawer />
		<app-backtop target=".app-layout__view" />
		<template #footer> </template>
	</app-layout>
</template>

<style lang="scss">
.app-header-manu {
	flex: 1;
	height: calc(100% - (var(--theme-padding) * 2));
	overflow: hidden;
	max-height: 40px;
	min-height: 30px;
	border: unset !important;
}
</style>
