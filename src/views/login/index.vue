<template>
	<div class="login-page">
		<div class="tools">
			<Theme />
		</div>
		<div class="content">
			<div class="left">
				<img src="../../assets/images/Illustrator.png" />
			</div>
			<div class="right">
				<div class="form">
					<div class="form-title mb-20">
						欢迎使用 Better-Vue3-Admin
					</div>
					<el-form :model="form" :rules="rules" ref="loginFormRef">
						<el-form-item prop="username">
							<el-input
								v-model="form.username"
								size="large"
								autocomplete="off"
								placeholder="在此输入用户名"
								@keyup.enter="submitForm(loginFormRef)"
							>
								<template #prefix>
									<svg-icon icon="user" :size="18" />
								</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="form.password"
								size="large"
								type="password"
								show-password
								autocomplete="new-password"
								placeholder="在此输入密码"
								@keyup.enter="submitForm(loginFormRef)"
							>
								<template #prefix>
									<svg-icon icon="lock" :size="18" />
								</template>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button
								type="primary"
								size="large"
								:loading="loading"
								@click="submitForm(loginFormRef)"
							>
								登录
							</el-button>
						</el-form-item>
						<el-form-item>
							<el-button size="large" plain> 注册 </el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'
import type { FormRules } from 'element-plus'
import { config } from '~/config'
import { useUserStore } from '~/store'
import { service } from '~/network/api'
import { useGlobal } from '../index'
import { validator as val } from '~/utils'

import type { FormInstance } from 'element-plus'

const { checkUsername, checkPassword } = val

const router = useRouter()
const { menuStore } = useGlobal()
const userStore = useUserStore()
useDark()
const form = reactive({
	username: 'admin',
	password: 'better123'
	// captchaId: '',
	// verifyCode: ''
})
const loading = ref(false)
const loginFormRef = ref()

const rules = reactive<
	FormRules<{
		username: string
		password: string
	}>
>({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'change' },
		{ min: 3, max: 16, message: '用户名长度在3-16', trigger: 'change' },
		{ validator: checkUsername, trigger: 'change' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'change' },
		{ min: 8, max: 20, message: '密码长度在8-20', trigger: 'change' },
		{ validator: checkPassword, trigger: 'change' }
	]
})

function submitForm(formEl: FormInstance | undefined) {
	if (!formEl) return
	loading.value = true
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				await login()
			} catch (error) {
				loading.value = false
			}
		} else {
			ElMessage.warning('表单验证未通过！')
			loading.value = false
		}
	})
}

async function login() {
	const { data } = await service.auth.login(form)
	const menus = menuStore.sort([...data.menus, ...config.menus])
	menuStore.list = menus
	userStore.token = data.access.token
	userStore.info = data.user
	userStore.expiration = data.access.expiration
	menuStore.perms = data.perms
	menuStore.toTree()
	router.replace('/')
}
</script>

<style lang="scss">
.login-page {
	position: relative;
	height: 100vh;
	background-color: var(--el-color-primary);
	.tools {
		position: absolute;
		top: 26px;
		right: 30px;
		padding: var(--theme-padding);
	}
	.content {
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 1000px;
		width: 95vw;
		height: 550px;
		margin: auto;
		background-color: var(--el-bg-color);
		border-radius: 20px;
		padding: calc(var(--theme-padding) * 2);
		.left {
			flex: 1;
			position: relative;
			margin-right: calc(var(--theme-margin) * 2);
			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 80%;
			}
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.form {
				&-title {
					font-size: 24px;
					font-weight: 600;
					text-align: center;
					line-height: 2;
					color: var(--el-text-color-primary);
				}
			}
		}
	}
}

@media screen and (max-width: 768px) {
	.login-page {
		.content {
			.left {
				display: none;
			}
		}
	}
}
</style>

<style lang="scss" scoped>
.el-button.el-button--primary {
	width: 100%;
}
</style>
