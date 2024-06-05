<template>
	<div class="aside-wrapper">
		<logo class="aside-logo" :showLabel="appStore.isVertical" />
		<div class="app-aside-menu">
			<nav-menu />
		</div>
	</div>
</template>

<script setup lang="ts">
import NavMenu from '../menu/index.vue'
import Logo from '../logo/index.vue'
import { useGlobal } from '~/views'

defineOptions({
	name: 'aside-menu'
})

const { appStore } = useGlobal()
</script>

<style lang="scss">
.aside-wrapper {
	height: 100%;
	.aside-logo {
		width: 100%;
	}
	.app-aside-menu {
		height: 100%;
	}
}
.app-layout-aside {
	.app-aside-menu {
		height: calc(100% - var(--topbar-height));
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
	}
}

.app-layout {
	&.collapse {
		.aside-wrapper .app-logo > span,
		.horizontal .app-logo > span {
			display: none;
		}
	}
}
</style>
