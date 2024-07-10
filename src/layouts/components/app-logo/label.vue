<template>
	<div class="app-name">{{ config.app.name }}</div>
</template>

<script setup lang="ts">
import { config } from '~/config'
defineOptions({
	name: 'app-name'
})
defineProps<{
	showLabel?: boolean
}>()
</script>

<style lang="scss" scoped>
.app-name {
	height: var(--b-layout-header-height);
	margin-left: 10px;
	line-height: var(--b-layout-header-height);
	white-space: nowrap;
	color: var(--el-color-primary);
}
</style>
