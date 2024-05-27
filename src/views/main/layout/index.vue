<template>
	<div class="app-views">
		<transition name="fade" appear mode="out-in">
			<div
				v-if="appStore.isRefresh"
				class="loading"
				:style="{ 'z-index': currentZIndex }"
			>
				<div class="loader"></div>
			</div>
		</transition>
		<el-scrollbar height="100%">
			<router-view v-slot="{ Component, route }">
				<transition :name="appStore.animationName" appear mode="out-in">
					<keep-alive :include="processStore.caches">
						<component :is="Component" :key="route.path" />
					</keep-alive>
				</transition>
			</router-view>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { useZIndex } from 'element-plus'
import { useGlobal } from '~/views'
const { appStore, processStore } = useGlobal()
const { currentZIndex } = useZIndex()
defineOptions({
	name: 'app-view'
})
</script>

<style lang="scss" scoped>
.loading {
	position: absolute;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(var(--filter));
	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

.loader {
	width: 40px;
	aspect-ratio: 1;
	--c: linear-gradient(var(--el-color-primary) 0 0);
	--r1: radial-gradient(
		farthest-side at bottom,
		var(--el-color-primary) 93%,
		#0000
	);
	--r2: radial-gradient(
		farthest-side at top,
		var(--el-color-primary) 93%,
		#0000
	);
	background: var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2),
		var(--c), var(--r1), var(--r2);
	background-repeat: no-repeat;
	animation: l2 1s infinite alternate;
}
@keyframes l2 {
	0%,
	25% {
		background-size:
			8px 0,
			8px 4px,
			8px 4px,
			8px 0,
			8px 4px,
			8px 4px,
			8px 0,
			8px 4px,
			8px 4px;
		background-position:
			0 50%,
			0 calc(50% - 2px),
			0 calc(50% + 2px),
			50% 50%,
			50% calc(50% - 2px),
			50% calc(50% + 2px),
			100% 50%,
			100% calc(50% - 2px),
			100% calc(50% + 2px);
	}
	50% {
		background-size:
			8px 100%,
			8px 4px,
			8px 4px,
			8px 0,
			8px 4px,
			8px 4px,
			8px 0,
			8px 4px,
			8px 4px;
		background-position:
			0 50%,
			0 calc(0% - 2px),
			0 calc(100% + 2px),
			50% 50%,
			50% calc(50% - 2px),
			50% calc(50% + 2px),
			100% 50%,
			100% calc(50% - 2px),
			100% calc(50% + 2px);
	}
	75% {
		background-size:
			8px 100%,
			8px 4px,
			8px 4px,
			8px 100%,
			8px 4px,
			8px 4px,
			8px 0,
			8px 4px,
			8px 4px;
		background-position:
			0 50%,
			0 calc(0% - 2px),
			0 calc(100% + 2px),
			50% 50%,
			50% calc(0% - 2px),
			50% calc(100% + 2px),
			100% 50%,
			100% calc(50% - 2px),
			100% calc(50% + 2px);
	}
	95%,
	100% {
		background-size:
			8px 100%,
			8px 4px,
			8px 4px,
			8px 100%,
			8px 4px,
			8px 4px,
			8px 100%,
			8px 4px,
			8px 4px;
		background-position:
			0 50%,
			0 calc(0% - 2px),
			0 calc(100% + 2px),
			50% 50%,
			50% calc(0% - 2px),
			50% calc(100% + 2px),
			100% 50%,
			100% calc(0% - 2px),
			100% calc(100% + 2px);
	}
}
</style>
