<script setup lang="ts">
import { useGlobal } from '~/store'
const { appStore } = useGlobal()
interface LayoutPickerOptions {
	mode: App.Layout.Mode
}

const options: Array<LayoutPickerOptions> = [
	{
		mode: 'vertical'
	},
	{
		mode: 'horizontal'
	},
	{
		mode: 'vertical-mix'
	},
	{
		mode: 'horizontal-mix'
	}
]

function handlePickerClick(item: LayoutPickerOptions) {
	if (item.mode == 'horizontal-mix' && appStore.isMobile) return
	appStore.layoutMode = item.mode
}
</script>

<template>
	<div class="layout-picker">
		<div class="layout-picker-title">系统布局/菜单风格</div>
		<div class="layout-picker-wraper">
			<div
				class="layout-picker-item"
				:class="{
					active: item.mode == appStore.layoutMode,
					disabled:
						item.mode.includes('horizontal') && appStore.isMobile
				}"
				v-for="(item, index) in options"
				:key="index"
				@click="handlePickerClick(item)"
			>
				<div class="layout-sider" v-show="item.mode !== 'horizontal'">
					<div
						class="menu vertical-menu"
						v-if="
							item.mode !== 'horizontal' &&
							item.mode !== 'vertical-mix'
						"
					>
						<div class="menu-actived"></div>
					</div>
					<div
						class="vertical-mix-menu"
						v-if="item.mode == 'vertical-mix'"
					>
						<div class="menu first-level-menu">
							<div class="menu-actived"></div>
						</div>
						<div class="menu last-level-menu">
							<div class="menu-actived"></div>
						</div>
					</div>
				</div>
				<div class="layout-main">
					<div class="layout-header">
						<div
							v-if="
								item.mode == 'horizontal' ||
								item.mode == 'horizontal-mix'
							"
							class="menu-actived"
						></div>
					</div>
					<div class="layout-view"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.layout-picker {
	margin-bottom: var(--theme-margin);
	&-title {
		text-align: center;
		margin-bottom: var(--theme-margin);
	}
	&-wraper {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	&-item {
		margin: var(--theme-margin) var(--theme-margin) 0 0;
		display: flex;
		width: 108px;
		height: 64px;
		padding: 5px;
		border: 1px solid transparent;
		box-shadow:
			0 1px 2px -2px #00000014,
			0 3px 6px #0000000f,
			0 5px 12px 4px #0000000a;

		border-radius: 3px;
		background-color: var(--el-bg-color-page);
		cursor: pointer;
		transition: border var(--el-transition-duration);
		&.active,
		&:hover {
			border-color: var(--el-color-primary);
		}
		&:nth-child(3n) {
			margin-right: 0;
		}
		&.active {
			border-width: 2px;
		}
		&.disabled {
			border: unset;
			cursor: not-allowed;
		}
	}
}
.layout-item {
	background-color: var(--el-bg-color);
	border-radius: 2px;
}

.menu-actived {
	width: 100%;
	height: 3px;
	background-color: var(--el-color-primary);
}

.layout-header {
	width: 100%;
	height: 10px;
	padding: 3px;
	margin-bottom: 3.5px;
	background-color: var(--el-color-primary-light-7);
	border-radius: 3px;
	.menu-actived {
		width: 6px;
		height: 4px;
		margin-left: 7px;
	}
}

.layout-main {
	flex: 1;
	flex-direction: column;
	width: 100%;
	display: flex;
}

.layout-sider {
	display: flex;
	min-width: 20px;
	margin-right: 3.5px;
	padding: 1px;
	.menu {
		flex-grow: 1;
		height: 100%;
		padding: 2px;
		background-color: var(--el-color-primary-light-5);
		border-radius: 3px;
		.menu-actived {
			margin-top: 5px;
		}
	}

	.vertical-mix-menu {
		flex: 1;
		display: flex;
		.first-level-menu {
			width: 9px;
		}
		.last-level-menu {
			width: 15px;
			margin-left: 3px;
			.menu-actived {
				margin-top: 12px;
			}
		}
	}
}

.layout-view {
	flex: 1;
	border-radius: 3px;
	background-color: var(--el-color-primary-light-8);
}
</style>
