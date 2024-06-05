<template>
	<div @click="changeSetDrawer()">
		<svg-icon icon="settings"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { useGlobal } from '~/views'
const { appStore } = useGlobal()
function changeSetDrawer() {
	appStore.showSettings = true
}
</script>
