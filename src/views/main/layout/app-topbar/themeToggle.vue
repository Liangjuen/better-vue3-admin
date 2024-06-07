<template>
	<button class="theme-toggle" @click="toggleDark()">
		<svg-icon v-if="isDark" icon="moon" :size="16" />
		<svg-icon v-else icon="sun" :size="16" />
	</button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped>
.theme-toggle {
	border: unset;
	background-color: unset;
}
</style>
