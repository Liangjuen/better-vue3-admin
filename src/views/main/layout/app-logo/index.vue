<template>
	<router-link to="/" class="app-logo">
		<img src="../../../../../public/vite.svg" />
		<span v-show="showLabel">
			<slot name="label">BETTER-VUE3-ADMIN</slot>
		</span>
	</router-link>
</template>

<script setup lang="ts">
defineOptions({
	name: 'logo'
})
defineProps<{
	showLabel?: boolean
}>()
</script>

<style lang="scss" scoped>
.app-logo {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 48px;
	height: var(--layout-topbar-height);
	max-height: var(--layout-topbar-height);
	background-color: transparent;
	cursor: pointer;
	span {
		margin-left: 10px;
		line-height: 1;
		white-space: nowrap;
		color: var(--el-color-primary);
	}
}
</style>
