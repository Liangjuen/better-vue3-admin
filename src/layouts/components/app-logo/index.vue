<template>
	<router-link to="/" class="app-logo">
		<img src="../../../../../public/vite.svg" />
		<span v-show="showLabel">
			<slot name="label">
				<app-logo-label />
			</slot>
		</span>
	</router-link>
</template>

<script setup lang="ts">
import AppLogoLabel from './label.vue'
defineOptions({
	name: 'app-logo'
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
	height: var(--b-layout-header-height);
	background-color: transparent;
	cursor: pointer;
}
</style>
