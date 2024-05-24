<template>
	<div class="app-views">
		<el-scrollbar height="100%">
			<router-view
				v-slot="{ Component, route }"
				v-if="!appStore.isRefresh"
			>
				<transition :name="appStore.animationName" appear mode="out-in">
					<keep-alive :include="processStore.caches">
						<component :is="Component" :key="route.path" />
					</keep-alive>
				</transition>
			</router-view>
			<div v-else class="loading" v-loading="appStore.isRefresh"></div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { useGlobal } from '~/views'
const { appStore, processStore } = useGlobal()
defineOptions({
	name: 'app-view'
})
</script>

<style lang="scss" scoped>
.loading {
	width: 100%;
	height: 100%;
}
</style>
