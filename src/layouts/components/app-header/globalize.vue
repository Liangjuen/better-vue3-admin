<template>
	<el-dropdown @command="handleCommand" trigger="click">
		<button class="language-button">
			<svg-icon icon="language"></svg-icon>
		</button>
		<template #dropdown>
			<el-dropdown-item
				v-for="item in config.langOptions"
				:key="item.value"
				:command="item.value"
			>
				<span
					:class="{ 'is-active': appStore.language == item.value }"
					>{{ item.label }}</span
				>
			</el-dropdown-item>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { config } from '~/config'
import { useAppStore } from '~/store'
const appStore = useAppStore()

function handleCommand(command: App.I18n.Lang) {
	appStore.language = command
}
</script>

<style lang="scss" scoped>
.language-button {
	display: flex;
	justify-content: center;
	align-items: center;
	outline: none;
	width: 100%;
	height: 100%;
	border: none;
	background-color: transparent;
	color: currentColor;
	cursor: pointer;
}

.el-dropdown-menu__item {
	.is-active {
		color: var(--el-dropdown-menuItem-hover-color);
	}
}
</style>
