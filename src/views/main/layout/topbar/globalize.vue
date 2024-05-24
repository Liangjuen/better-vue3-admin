<template>
	<div @click="toggleLanguage">
		<svg-icon icon="language"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
const toggleLanguage = () =>
	ElMessage({ message: '暂未实现，敬请期待', type: 'info' })
</script>
