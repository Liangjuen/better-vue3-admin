<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Data } from '~/enums/permission.enum'
import { DictTypeRules } from '../options'
import { service, DictTypeModel } from '~/network/api'

import type { FormInstance } from 'element-plus'

export interface RefreshParams {
	id: DictTypeModel['id']
}

const list = ref<Array<DictTypeModel>>([])

const emit = defineEmits<{
	refresh: [RefreshParams]
}>()

const formRef = ref<FormInstance>()

const form = ref({
	id: 0,
	name: '',
	key: ''
})
const current = ref<DictTypeModel>({
	name: '',
	key: '',
	id: 0
})
const loading = ref(false)
const dialog = reactive<DialogModel>({
	title: '新增类型',
	type: 'update',
	opened: false
})
async function refresh() {
	loading.value = true
	try {
		const { data } = await service.dictType.list()
		list.value = data
		if (data.length) {
			current.value.id = data[0].id
			rowClick(data[0])
		}
	} catch (error) {
		loading.value = false
	}
	loading.value = false
}

// 点击
function rowClick(item: DictTypeModel) {
	if (item.id == current.value.id) return
	current.value.id = item.id

	nextTick(() => {
		// 刷新列表
		emit('refresh', {
			id: current.value.id
		})
	})
}

function openDialog(type: DialogModel['type']) {
	dialog.type = type
	dialog.title = type == 'create' ? '新增类型' : '编辑类型'
	dialog.opened = true
}

function closeDialog() {
	dialog.opened = false
}

function cancel() {
	resetForm(formRef.value)
	closeDialog()
}

function submitForm(formEl: FormInstance | undefined) {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				if (dialog.type == 'create') {
					await create()
				} else {
					await update()
				}
			} catch (error) {
				console.log(error)
			}
			await refresh()
			closeDialog()
		} else {
			ElMessage.warning('表单验证未通过！')
		}
	})
}

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}

// 创建
async function create() {
	await service.dictType.create({
		name: form.value.name,
		key: form.value.key
	})
	ElMessage.success('创建成功!')
}

// 更新
async function update() {
	await service.dictType.update(form.value.id, {
		name: form.value.name,
		key: form.value.key
	})
	ElMessage.success('更新成功!')
}

defineExpose({
	refresh,
	departments: list
})

onMounted(() => {
	refresh()
})
</script>

<template>
	<div class="dict-type-list">
		<div class="dict-type-list__header">
			<div class="title">字典类型</div>
			<div class="flex-1"></div>
			<el-tooltip content="刷新">
				<button class="tool-item" @click="refresh">
					<svg-icon icon="refresh" />
				</button>
			</el-tooltip>
			<el-tooltip content="新增">
				<button
					v-permission="Data.DictType.Create"
					class="tool-item"
					@click="openDialog('create')"
				>
					<svg-icon icon="plus" :size="18" />
				</button>
			</el-tooltip>
		</div>
		<div v-loading="loading" class="dict-type-list__container">
			<el-scrollbar>
				<div class="dict-type-list">
					<div
						v-for="item in list"
						:key="item.key"
						class="dict-type-item"
						:class="{ 'is-current': item.id == current.id }"
						@click="rowClick(item)"
					>
						{{ item.name }} - {{ item.key }}
					</div>
				</div>
			</el-scrollbar>
			<b-dialog
				v-model="dialog.opened"
				:title="dialog.title"
				:width="480"
			>
				<el-form
					:model="form"
					:rules="DictTypeRules"
					label-width="80"
					ref="formRef"
				>
					<el-form-item prop="name" label="类型名称">
						<el-input v-model="form.name" />
					</el-form-item>
					<el-form-item prop="key" label="key">
						<el-input v-model="form.key" />
					</el-form-item>
				</el-form>
				<template #footer>
					<el-button @click="cancel()"> 取消 </el-button>
					<el-button type="primary" @click="submitForm(formRef)">
						保存
					</el-button>
				</template>
			</b-dialog>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dict-type-list {
	height: 100%;
	display: flex;
	flex-direction: column;

	&__header {
		font-size: 14px;
		display: flex;
		align-items: center;
		position: relative;
		height: var(--b-view-head-height);
		padding: 0 var(--theme-padding);
	}
	&__container {
		flex: 1 1 0;
		overflow: hidden;
		margin-top: var(--theme-margin);

		.dict-type-list {
			padding: 0 var(--theme-padding);
		}
		.dict-type-item {
			font-size: 13.5px;
			margin-bottom: var(--theme-margin);
			border-radius: var(--el-border-radius-base);
			padding: var(--theme-padding);
			cursor: pointer;
			&:hover {
				background-color: var(--el-fill-color-dark);
			}
			&.is-current {
				background-color: var(--el-color-primary);
				color: #fff;
			}
		}
	}
}
</style>
