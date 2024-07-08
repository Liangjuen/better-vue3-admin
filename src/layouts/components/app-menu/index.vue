<template>
	<el-menu
		ellipsis
		:class="{ simple }"
		:collapse-transition="false"
		:collapse="collapse"
		:default-active="route.path"
		:mode="mode"
		:popper-offset="10"
		:popper-class="popperClass"
		v-bind="style"
	>
		<sub-menu v-for="item in list" :key="item.name" :item="item" />
	</el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuProps } from 'element-plus'
import { createMenuStyle } from './utils'
import SubMenu from './sub-menu.vue'
import './menu.scss'

defineOptions({
	name: 'app-menu'
})

const props = withDefaults(
	defineProps<{
		list: Menu.List
		collapse: boolean
		mode?: MenuProps['mode']
		backMode?: App.BackgroundColorMode
		simple?: boolean
	}>(),
	{
		mode: 'horizontal',
		backMode: 'auto',
		simple: false
	}
)

const style = computed(() => createMenuStyle(props.backMode, props.simple))
const popperClass = computed(() => (props.simple ? 'simple' : ''))
const route = useRoute()
</script>

<style lang="scss"></style>
