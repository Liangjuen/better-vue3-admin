<template>
	<el-switch
		inline-prompt
		v-model="isDark"
		:active-icon="Moon"
		:inactive-icon="Sunny"
		@change="toggleDark"
	/>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

// 暗黑主题切换
const isDark = useDark()
const toggleDark = () => useToggle(isDark)
</script>
