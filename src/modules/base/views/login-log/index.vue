<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

import { service, LoginLog, type LoginLogModel } from '~/network/api'

const loading = ref(false)
const search = reactive<LoginLog.GetList>({
	page: 1,
	size: 20,
	loginState: null,
	keyword: ''
})
const tableData = ref<Array<LoginLogModel>>([])

/**
 * 获取登录日志列表
 */
async function getLoginLogList() {
	try {
		loading.value = true
		const { data } = await service.loginLog.list({ ...search })
		tableData.value = data.list || []
		console.log(data)
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	getLoginLogList()
})
</script>

<template>
	<div
		class="base-login-log-workspace padding-theme"
		v-loading="loading"
	></div>
</template>

<style lang="scss">
.base-login-log-workspace {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;

	.page-head {
		background-color: var(--el-bg-color);
		border-radius: var(--el-border-radius-base);
		margin-bottom: var(--theme-margin);
		padding: var(--theme-padding) var(--theme-padding) 0
			var(--theme-padding);
	}

	.page-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: var(--theme-padding);
		background-color: var(--el-bg-color);
		border-radius: var(--el-border-radius-base);
	}

	.el-form-item {
		margin-bottom: var(--theme-margin);
	}
}
</style>
