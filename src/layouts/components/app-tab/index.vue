<template>
	<div class="app-tab" :class="tabClass">
		<process :type="type" :is-mobile="appStore.isMobile" />
		<div class="placeholder"></div>
		<oprations :type="type" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Oprations from './operations.vue'
import Process from './process.vue'
import { useGlobal } from '~/store'

const props = withDefaults(
	defineProps<{
		type?: Theme.TabStyle
	}>(),
	{
		type: 'default'
	}
)
defineOptions({
	name: 'app-tab'
})

const { appStore } = useGlobal()

const tabClass = computed(() => {
	return [`app-tab-style-${props.type || 'default'}`]
})
</script>

<style lang="scss">
.app-tab {
	display: flex;
	align-items: center;
	height: 100%;
	padding: var(--layout-padding) var(--layout-padding) 0 var(--layout-padding);

	&-style-chrome {
		background-color: var(--el-bg-color);
		box-shadow: rgba(0, 0, 0, 0.08) 1px 1px 2px;
	}

	&-style-card {
		background-color: var(--el-bg-color);
		padding: calc(var(--layout-padding) / 2) var(--layout-padding);
		min-height: 30px;
		box-shadow: rgba(0, 0, 0, 0.08) 1px 1px 2px;
	}
	.placeholder {
		width: var(--layout-padding);
	}
}
</style>
