<template>
	<svg
		aria-hidden="true"
		class="svg-icon"
		:stroke-width="strokeWidth"
		:width="size ? size : '1em'"
		:height="size ? size : '1em'"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<use :href="symbolId" :stroke-width="strokeWidth" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { svgIconProps } from './svg-icon'
const props = defineProps(svgIconProps)

const symbolId = computed(() => `#${props.prefix}-${props.icon}`)
</script>

<style>
.svg-icon {
	fill: none;
	stroke: currentColor;
	overflow: hidden;
	outline: none;
}
</style>
