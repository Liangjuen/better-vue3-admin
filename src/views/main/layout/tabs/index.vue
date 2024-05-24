<template>
	<div class="app-tabs">
		<oprations />
		<process />
	</div>
</template>

<script setup lang="ts">
import Oprations from './operations.vue'
import Process from './process.vue'
defineOptions({
	name: 'tabs'
})
</script>

<style lang="scss">
.app-tabs {
	display: flex;
	align-items: center;
	height: var(--tabs-height);
	padding: 0 var(--theme-padding);
	margin-bottom: var(--theme-margin);
}
</style>
