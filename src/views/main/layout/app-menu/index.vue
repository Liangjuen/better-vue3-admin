<template>
	<el-menu
		ellipsis
		:collapse-transition="false"
		:collapse="collapse"
		:default-active="route.path"
		:mode="mode"
		:popper-offset="10"
		v-bind="menuStyle"
	>
		<sub-menu v-for="(item, index) in list" :key="index" :item="item" />
	</el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SubMenu from './sub-menu.vue'
import { useSet } from './useSet'

defineOptions({
	name: 'nav-menu'
})

withDefaults(
	defineProps<{
		list: Menu.List
		collapse: boolean
		mode?: Theme.MenuLayoutMode
		backMode?: Theme.MenuBackMode
	}>(),
	{
		mode: 'horizontal',
		backMode: 'auto'
	}
)

const { menuStyle } = useSet()
const route = useRoute()
</script>

<style lang="scss">
@use './menu.scss';
</style>
