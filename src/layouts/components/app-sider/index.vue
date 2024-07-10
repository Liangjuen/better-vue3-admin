<script setup lang="ts">
import { computed, watch } from 'vue'
import { useBetter } from '~/hooks'
import { useGlobal } from '~/store'
import FirstLevelMenu from '../app-menu/first-level-menu.vue'
import AppMenu from '../app-menu/index.vue'
import AppLogo from '../app-logo/index.vue'
import AppName from '../app-logo/label.vue'

defineOptions({
	name: 'app-sider'
})
const emits = defineEmits<{
	(e: 'update:collapse', value: boolean): void
}>()
const props = withDefaults(
	defineProps<{
		collapse?: boolean
		mode?: App.Layout.Mode
		list: Menu.List
		backMode?: App.BackgroundColorMode
	}>(),
	{
		collapse: false,
		mode: 'vertical',
		backMode: 'auto'
	}
)

const { route, router } = useBetter()

const { menuStore } = useGlobal()

const activeFirstLevelMenu = computed(() => {
	const find = (item: Menu.Item): boolean => {
		if (item.path == route.path) return true
		if (item.children && item.children.length) {
			return !!item.children.find(find)
		}
		return false
	}
	return props.list.find(find)
})

/** handle vertical-mix layout first level menu select */
function handleVerticalMixMenuSelect(item: Menu.Item) {
	if (item.path) {
		router.push(item.path)
	} else if (item.children) {
		emits('update:collapse', false)
		menuStore.secondLevelMenus = item.children
	}
}

/** handle horizontal-mix layout first level menu select */
function handleHorizonatlMixMenuSelect(item: Menu.Item) {
	if (item.path) {
		router.push(item.path)
	} else if (item.children) {
		menuStore.secondLevelMenus = item.children
	}
}

watch(
	() => activeFirstLevelMenu.value,
	(menu) => {
		if (!menu) return
		if (menu.path) {
			menuStore.secondLevelMenus = [{ ...menu, children: [] }]
		} else if (menu.children) {
			menuStore.secondLevelMenus = menu.children
		}
	},
	{
		immediate: true
	}
)
</script>

<template>
	<div class="app-sider" :class="[`bgc-${props.backMode}`]">
		<app-logo v-if="mode == 'vertical'" :show-label="!collapse" />
		<div class="menu-scroll-wraper">
			<!-- vertical -->
			<template v-if="mode == 'vertical'">
				<el-scrollbar>
					<app-menu
						mode="vertical"
						:back-mode="props.backMode"
						:list="list"
						:collapse="collapse"
					/>
				</el-scrollbar>
			</template>
			<!-- vertical-mix -->
			<template v-else-if="mode == 'vertical-mix'">
				<div class="vertical-mix-wraper">
					<first-level-menu
						:list="list"
						:activeKey="activeFirstLevelMenu?.name || ''"
						@change="handleVerticalMixMenuSelect"
					/>
					<div class="vertical-mix-menu-wraper" v-show="!collapse">
						<app-name />
						<el-scrollbar>
							<app-menu
								mode="vertical"
								:back-mode="props.backMode"
								:list="menuStore.secondLevelMenus"
								:collapse="false"
								:simple="props.backMode == 'auto'"
							/>
						</el-scrollbar>
					</div>
				</div>
			</template>
			<!-- horizontal-mix -->
			<template v-else-if="mode == 'horizontal-mix'">
				<div class="horizontal-mix-wraper">
					<first-level-menu
						:list="list"
						:activeKey="activeFirstLevelMenu?.name || ''"
						@change="handleHorizonatlMixMenuSelect"
					/>
				</div>
			</template>
		</div>
	</div>
</template>

<style lang="scss">
.app-sider {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	box-shadow: rgba(17, 12, 46, 0.15) 0px 6px 10px 0px;

	&.bgc-auto {
		background-color: var(--el-bg-color);
	}

	&.bgc-dark {
		background-color: var(--dark-bg-color);
	}

	&.bgc-primary {
		background-color: var(--el-color-primary-light-3);
	}
}

.menu-scroll-wraper,
.vertical-mix-menu-wraper {
	flex: 1 1 0%;
	overflow: hidden;
}
.first-level-menu {
	box-shadow: rgba(17, 12, 46, 0.15) 0px 6px 10px 0px;
	width: var(--b-layout-sider-collapsed-width);
}

.vertical-mix-wraper,
.horizontal-mix-wraper {
	display: flex;
	height: 100%;
	overflow: hidden;
}
</style>
