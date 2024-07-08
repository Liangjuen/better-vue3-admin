<script lang="ts" setup>
import AppLogo from '../app-logo/index.vue'

defineOptions({
	name: 'first-level-menu'
})
const emits = defineEmits<{
	(e: 'change', value: Menu.Item): void
}>()
withDefaults(
	defineProps<{
		mode?: App.Layout.Mode
		list: Menu.List
		activeKey: Menu.Item['name']
	}>(),
	{
		mode: 'vertical'
	}
)

/** handle select events */
function handleSelect(item: Menu.Item) {
	emits('change', item)
}
</script>

<template>
	<div class="first-level-menu">
		<app-logo :show-label="false" />
		<div class="first-level-menu-wraper">
			<el-scrollbar>
				<div
					v-for="item in list"
					class="first-level-menu-item"
					:class="{ 'is-active': activeKey == item.name }"
					:key="item.name"
					:title="item.name"
					@click="handleSelect(item)"
				>
					<svg-icon :icon="item.icon" />
					<span class="first-level-menu-item-title mt-6">
						{{ item.name }}
					</span>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.first-level-menu {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: var(--dark-bg-color);
}

.first-level-menu-wraper {
	flex: 1 1 0%;
	overflow: hidden;
}
.first-level-menu-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 5px;
	margin: 5px;
	border-radius: var(--el-border-radius-base);
	height: 52px;
	list-style: none;
	color: #fff;
	cursor: pointer;
	transition: all var(--ani-duration) var(--ani-timing-function);
	&:not(.is-active):hover {
		color: var(--el-color-primary);
	}
	&.is-active {
		background-color: var(--el-color-primary);
	}
	&-title {
		width: 100%;
		text-align: center;
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
