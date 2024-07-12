<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
	<el-config-provider :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<style lang="scss">
#app {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	filter: grayscale(var(--gray-percent));
}
</style>
