<template>
	<section class="app-view">
		<router-view v-slot="{ Component }">
			<transition :name="appStore.animationName" appear mode="out-in">
				<keep-alive :include="processStore.caches" :key="key">
					<component :is="Component" />
				</keep-alive>
			</transition>
		</router-view>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGlobal } from '~/store'
const { appStore, processStore } = useGlobal()
import { useBetter } from '~/hooks'
defineOptions({
	name: 'app-view'
})

const { mitt } = useBetter()

const key = ref(1)

// 刷新页面
function refresh() {
	key.value += 1
}

onMounted(() => {
	mitt.on('view.refresh', refresh)
})

onUnmounted(() => {
	mitt.off('view.refresh')
})
</script>

<style lang="scss" scoped>
.app-view {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	min-height: 100%;
}
</style>
