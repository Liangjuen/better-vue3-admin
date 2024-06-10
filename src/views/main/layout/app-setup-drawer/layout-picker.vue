<script setup lang="ts">
import { useGlobal } from '~/views'
const { appStore } = useGlobal()
interface LayoutPickerOptions {
	layout: Theme.LayoutMode
	menuBack: Theme.MenuBackMode
	topbarBack: Theme.TopbarBackMode
}

const options: Array<LayoutPickerOptions> = [
	{
		layout: 'horizontal',
		menuBack: 'auto',
		topbarBack: 'auto'
	},
	{
		layout: 'horizontal',
		menuBack: 'primary',
		topbarBack: 'primary'
	},
	{
		layout: 'horizontal',
		menuBack: 'dark',
		topbarBack: 'dark'
	},
	{
		layout: 'vertical',
		menuBack: 'auto',
		topbarBack: 'auto'
	},
	{
		layout: 'vertical',
		menuBack: 'primary',
		topbarBack: 'auto'
	},
	{
		layout: 'vertical',
		menuBack: 'dark',
		topbarBack: 'auto'
	},
	{
		layout: 'vertical',
		menuBack: 'auto',
		topbarBack: 'primary'
	},
	{
		layout: 'vertical',
		menuBack: 'primary',
		topbarBack: 'primary'
	},
	{
		layout: 'vertical',
		menuBack: 'dark',
		topbarBack: 'primary'
	},
	{
		layout: 'vertical',
		menuBack: 'auto',
		topbarBack: 'dark'
	},
	{
		layout: 'vertical',
		menuBack: 'primary',
		topbarBack: 'dark'
	},
	{
		layout: 'vertical',
		menuBack: 'dark',
		topbarBack: 'dark'
	}
]

function handlePickerClick(item: LayoutPickerOptions) {
	appStore.layoutMode = item.layout
	appStore.menuBackMode = item.menuBack
	appStore.topbarBackMode = item.topbarBack
}
</script>

<template>
	<div class="layout-picker">
		<div class="layout-picker-title">系统布局/菜单风格</div>
		<div class="layout-picker-wraper">
			<div
				class="layout-picker-item"
				:class="{
					active:
						item.layout == appStore.layoutMode &&
						item.menuBack == appStore.menuBackMode &&
						item.topbarBack == appStore.topbarBackMode
				}"
				v-for="(item, index) in options"
				:key="index"
				@click="handlePickerClick(item)"
			>
				<div
					v-if="item.layout == 'vertical'"
					class="layout-left layout-item"
					:class="[item.menuBack]"
				>
					<div class="menu-actived"></div>
				</div>
				<div class="layout-main" :class="[item.layout]">
					<div
						class="layout-top layout-item"
						:class="[item.topbarBack]"
					>
						<div
							v-if="item.layout == 'horizontal'"
							class="menu-actived"
						></div>
					</div>
					<div class="layout-view layout-item"></div>
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
		width: 80px;
		height: 50px;
		padding: 3.5px;
		box-shadow:
			0 1px 2px -2px #00000014,
			0 3px 6px #0000000f,
			0 5px 12px 4px #0000000a;
		border: 1px solid var(--el-border-color);
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
	}
}
.layout-item {
	background-color: var(--el-bg-color);
	border-radius: 2px;

	&.primary {
		background-color: var(--el-color-primary-light-5);
	}

	&.dark {
		background-color: var(--dark-bg-color);
	}
}

.menu-actived {
	width: 8px;
	height: 2.5px;
	background-color: var(--el-color-primary);
}

.layout-top {
	width: 100%;
	height: 6px;
	padding: 2px;
	margin-bottom: 3.5px;
	.menu-actived {
		width: 5px;
		height: 2px;
		margin-left: 7px;
	}
}

.layout-main {
	flex: 1;
	flex-direction: column;
	width: 100%;
	display: flex;
}

.layout-left {
	width: 10px;
	margin-right: 3.5px;
	padding: 1px;
	.menu-actived {
		margin-top: 7px;
	}
}

.layout-view {
	flex: 1;
}
</style>
