<template>
	<div @click="toggle">
		<svg-icon v-show="!isFullscreen" icon="fullscreen"></svg-icon>
		<svg-icon v-show="isFullscreen" icon="fullscreen-exit"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>
