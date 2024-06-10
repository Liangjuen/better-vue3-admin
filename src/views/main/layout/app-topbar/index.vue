<template>
	<div :class="appTopbarClasses">
		<slot name="left">
			<div class="panel-left">
				<button
					v-show="appStore.isVertical"
					class="topbar-ham app-topbar-action-hover"
					@click="toggleAsideMode"
				>
					<span class="ham-container">
						<span :class="['ham-top', activeClass]"></span>
						<span :class="['ham-middle', activeClass]"></span>
						<span :class="['ham-bottom', activeClass]"></span>
					</span>
				</button>
			</div>
		</slot>

		<!-- 右侧工具栏 -->
		<slot name="right">
			<div class="panel-right">
				<div class="right-tools">
					<setting class="tool-item app-topbar-action-hover" />
					<globalize class="tool-item app-topbar-action-hover" />
					<fullscreen class="tool-item app-topbar-action-hover" />
					<theme-toggle class="tool-item app-topbar-action-hover" />
				</div>
				<el-dropdown
					trigger="click"
					class="right-user ml-12 app-topbar-action-hover"
				>
					<div class="user-info">
						<span class="username mr-8 ellipsis">尼克胡</span>

						<img
							class="avatar"
							src="../../../../assets/images/portrait.jpeg"
						/>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>
								<router-link to="/personal">
									<span>
										<svg-icon icon="user" class="mr-8" />
										个人中心
									</span>
								</router-link>
							</el-dropdown-item>
							<el-dropdown-item>
								<span @click="logout">
									<svg-icon icon="log-out" />
									退出登录
								</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Globalize from './globalize.vue'
import Fullscreen from './fullscreen.vue'
import Setting from './setting.vue'
import ThemeToggle from './themeToggle.vue'
import { useGlobal } from '~/views'
import { ElMessageBox, ElMessage } from 'element-plus'

defineOptions({
	name: 'topbar'
})

const props = defineProps<{
	backMode: Theme.TopbarBackMode
}>()

const appTopbarClasses = computed(() => [
	'app-topbar',
	`back-${props.backMode}`
])

const { appStore } = useGlobal()
function toggleAsideMode() {
	appStore.isFold = !appStore.isFold
}

function logout() {
	ElMessageBox.confirm('确定退出登录吗？', '提示', {
		type: 'warning',
		cancelButtonText: '取消',
		confirmButtonText: '确定'
	}).then(async () => {
		ElMessage.success({
			message: '您已安全退出系统!'
		})
	})
}
const activeClass = computed(() => (!appStore.isFold ? 'is-active' : ''))
</script>

<style lang="scss">
.app-topbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: var(--topbar-height);
	box-sizing: border-box;
	.panel-left,
	.panel-right {
		height: 100%;
	}

	&.back-primary {
		background-color: var(--el-color-primary-light-3);
		color: var(--el-color-white);
		.app-topbar-action-hover {
			&:hover {
				background-color: var(--el-color-primary);
			}
		}

		.panel-right {
			.user-info .username {
				color: var(--el-color-white);
			}
		}

		.panel-left {
			.ham-top,
			.ham-middle,
			.ham-bottom {
				background-color: var(--el-color-white);
			}
		}
	}

	&.back-dark {
		background-color: var(--dark-bg-color);
		color: var(--el-color-white);
		.app-topbar-action-hover {
			&:hover {
				background-color: var(--el-color-primary);
			}
		}

		.panel-right {
			.user-info .username {
				color: var(--el-color-white);
			}
		}

		.panel-left {
			.ham-top,
			.ham-middle,
			.ham-bottom {
				background-color: var(--el-color-white);
			}
		}
	}

	.app-topbar-action-hover {
		transition: background-color var(--el-transition-duration);
		&:hover {
			background-color: var(--el-color-primary-light-8);
		}
	}
}

.topbar-ham {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: none;
	height: 100%;
	width: 40px;
	background-color: transparent;
}

.ham-container {
	position: relative;
	width: 16px;
	height: 14px;
	overflow: hidden;

	.ham-top {
		top: 0;
	}

	.ham-middle {
		top: 6px;
	}

	.ham-bottom {
		top: 12px;
	}

	.ham-top.is-active {
		top: 6px;
		transform: translate(0) rotate(225deg);
	}

	.ham-middle.is-active {
		top: 6px;
		transform: translate(16px);
	}

	.ham-bottom.is-active {
		top: 6px;
		transform: translate(0) rotate(135deg);
	}
}

.ham-top,
.ham-middle,
.ham-bottom {
	position: absolute;
	left: 0;
	width: 16px;
	height: 1.5px;
	transition:
		top 0.5s,
		background-color 0.5s,
		transform 0.5s;
	background-color: var(--el-text-color-primary);
}
</style>

<style lang="scss" scoped>
.panel-right {
	display: flex;
	align-items: center;
}

.right-tools {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	.tool-item {
		display: flex;
		align-items: center;
		height: 100%;
		cursor: pointer;
		padding: 0 10px;
	}
}

.right-user {
	height: 100%;
	padding: 0 var(--layout-padding);
	.user-info {
		display: flex;
		align-items: center;
		cursor: pointer;
		.username {
			width: 50px;
			background-color: transparent;
			font-size: 16px;
		}
		.avatar {
			width: 28px;
			height: 28px;
			border-radius: 50%;
			overflow: hidden;
		}
	}
}
</style>
