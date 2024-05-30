<template>
	<div class="app-views">
		<view-loading v-model="appStore.isRefresh" />
		<el-scrollbar height="100%" :key="key" ref="scrollbarRef">
			<router-view v-slot="{ Component }">
				<transition :name="appStore.animationName" appear mode="out-in">
					<keep-alive :include="processStore.caches">
						<component :is="Component" />
					</keep-alive>
				</transition>
			</router-view>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGlobal } from '~/views'
import ViewLoading from './loading/index.vue'
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
		top = scrollbarRef.value.querySelector(el).offsetTop
	}

	scrollbarRef.value.scrollTo({
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
