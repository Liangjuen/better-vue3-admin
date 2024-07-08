<template>
	<div class="app-name">BETTER-VUE3-ADMIN</div>
</template>

<script setup lang="ts">
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
