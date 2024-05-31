<template>
	<el-menu
		router
		ellipsis
		class="custom-menu"
		:collapse-transition="false"
		:collapse="appStore.isFold"
		:default-active="route.path"
		:mode="appStore.layoutMode"
		:popper-offset="10"
		v-bind="menuStyle"
	>
		<sub-menu :list="menuStore.tree" />
	</el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SubMenu from './sub-menu.vue'
import { useGlobal } from '~/views'
import { useSet } from './useSet'

defineOptions({
	name: 'nav-menu'
})

const { menuStyle } = useSet()
const route = useRoute()
const { appStore, menuStore } = useGlobal()
</script>

<style lang="scss">
@use './menu.scss';
</style>
