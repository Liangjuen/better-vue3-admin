<template>
	<div class="aside-wrapper">
		<div class="app-logo">
			<img src="../../../../../public/vite.svg" />
			<span v-show="appStore.isVertical">COOL-VUE3-ADMIN</span>
		</div>
		<div class="app-aside-menu">
			<el-menu
				router
				ellipsis
				class="custom-menu"
				:collapse-transition="false"
				:collapse="appStore.isFold"
				:default-active="route.path"
				:mode="appStore.layoutMode"
				v-bind="menuStyle"
			>
				<sub-menu :list="[]" />
			</el-menu>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SubMenu from './sub-menu.vue'
import { useGlobal } from '~/views'
import { useSet } from './useSet'

defineOptions({
	name: 'aside-menu'
})

const { menuStyle } = useSet()
const route = useRoute()
const { appStore } = useGlobal()
</script>

<style lang="scss">
.aside-wrapper {
	height: 100%;
	.app-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-width: 48px;
		height: var(--topbar-height);
		max-height: var(--topbar-height);
		background-color: transparent;
		cursor: pointer;
		span {
			margin-left: 10px;
			line-height: 1;
			white-space: nowrap;
		}
	}
	.app-aside-menu {
		height: 100%;
		.el-menu--horizontal.el-menu {
			width: 100%;
			height: 100%;
			padding: var(--menu-item-margin) 0;
			border: none;
		}
		.el-menu--horizontal > {
			.el-menu-item,
			.el-menu-item.is-active,
			.el-sub-menu.is-active .el-sub-menu__title,
			.el-sub-menu .el-sub-menu__title {
				border-bottom: none;
			}
		}
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
</style>

<style lang="scss">
@use './menu.scss';
.el-menu {
	--el-menu-item-font-size: 13.6px;
	border: none;
	.el-sub-menu__title span,
	.el-menu-item span {
		line-height: normal;
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
