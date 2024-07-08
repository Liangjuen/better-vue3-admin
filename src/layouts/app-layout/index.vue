<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	createLayoutWorkspaceCssVars,
	createLayoutClassNameSpace
} from './utils'
import './layout.scss'
import { Layout } from './type'

defineOptions({
	name: 'app-layout'
})

/** props */
const props = withDefaults(defineProps<Layout.Props>(), {
	mode: 'vertical',
	maxZIndex: 100,
	headerHeight: 48,
	tabHeight: 38,
	siderCollapse: false,
	siderWidth: 256,
	siderCollapsedWidth: 64,
	footerHeight: 48
})

/** slots */
const slots = defineSlots<Layout.Slots>()

/** emits */
const emits = defineEmits<Layout.Emits>()

/** css vars */
const cssVars = computed(() => createLayoutWorkspaceCssVars(props))

const ns = createLayoutClassNameSpace()

/** config visible */
const showHeader = computed(() => !props.hideHeader && Boolean(slots.header))
const showSider = computed(
	() => !props.hideSider && Boolean(slots.sider) && props.mode == 'vertical'
)
const showMobileSider = computed(
	() => !!props.mobile && !props.hideSider && Boolean(slots.sider)
)
const showTab = computed(() => !props.hideTab && Boolean(slots.tab))
const showFooter = computed(() => !props.hideFooter && Boolean(slots.footer))

/** layout element classes */
const layoutClassName = computed(() => {
	const names = {
		'app-layout': true,
		[props.mode]: true,
		'sider-collapsed': props.siderCollapse,
		'view-full': props.fullView,
		mobile: props.mobile
	}
	return names
})

const contentScrollWrapRef = ref<HTMLElement | null>(null)

/** handle toggle sider collapse events */
function handleToggleSiderCollapse(collapse: boolean) {
	emits('update:siderCollapse', collapse)
}

/** back top */
function scrollToTop() {
	if (contentScrollWrapRef.value) {
		contentScrollWrapRef.value.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
}

/** expose */
defineExpose({
	backTop: scrollToTop
})
</script>

<template>
	<section :class="layoutClassName" :style="cssVars">
		<!-- 左侧 -->
		<template v-if="showSider">
			<aside v-show="!fullView" :class="[siderClass, ns['sider']]">
				<slot name="sider"></slot>
			</aside>
		</template>

		<!-- 主体 -->
		<section class="app-layout__main">
			<!-- header -->
			<template v-if="showHeader">
				<header v-show="!fullView" :class="[headerClass, ns['header']]">
					<slot name="header"></slot>
				</header>
			</template>

			<!-- tab -->
			<template v-if="showTab">
				<div :class="[tabClass, ns['tab']]">
					<slot name="tab"></slot>
				</div>
			</template>

			<!-- view -->
			<main
				ref="contentScrollWrapRef"
				:class="['app-layout-scroll-wraper', ns['view']]"
			>
				<slot></slot>
			</main>

			<!-- footer -->
			<template v-if="showFooter">
				<footer v-show="!fullView" :class="[footerClass, ns['footer']]">
					<slot name="footer"></slot>
				</footer>
			</template>
		</section>

		<template v-if="showMobileSider">
			<transition name="fade" appear mode="out-in">
				<div
					v-show="!siderCollapse"
					:class="[maskClass, ns['mask']]"
					@click="handleToggleSiderCollapse(!siderCollapse)"
				></div>
			</transition>
		</template>
	</section>
</template>

<style lang="scss" scoped></style>
