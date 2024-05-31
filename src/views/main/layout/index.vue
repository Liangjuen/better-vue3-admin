<template>
	<div class="app-views">
		<router-view v-slot="{ Component, route }">
			<el-scrollbar height="100%" :key="key" :ref="scrollbarRef">
				<transition :name="appStore.animationName" appear mode="out-in">
					<keep-alive :include="processStore.caches">
						<component :is="Component" :key="route.path" />
					</keep-alive>
				</transition>
			</el-scrollbar>
		</router-view>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGlobal } from '~/views'
const { appStore, processStore } = useGlobal()
import { useBetter } from '~/hooks'
defineOptions({
	name: 'app-view'
})
const { mitt } = useBetter()

const scrollbarRef = ref()

const key = ref(1)

// 刷新页面
function refresh() {
	key.value += 1
}

function scrollTo({ el, top }: { el?: string; top?: number }) {
	if (el) {
		top = scrollbarRef.value.wrapRef.querySelector(el).offsetTop
	}

	scrollbarRef.value.wrapRef.scrollTo({
		top,
		behavior: 'smooth'
	})
}

onMounted(() => {
	mitt.on('view.scrollTo', scrollTo)

	mitt.on('view.refresh', refresh)
})

onUnmounted(() => {
	mitt.off('view.scrollTo')

	mitt.off('view.refresh')
})
</script>

<style lang="scss" scoped></style>
