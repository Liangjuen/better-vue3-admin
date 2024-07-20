<template>
	<router-view v-slot="{ Component }">
		<transition :name="appStore.animationName" appear mode="out-in">
			<keep-alive :include="processStore.caches" :key="key">
				<component :is="Component" />
			</keep-alive>
		</transition>
	</router-view>
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

<style></style>
