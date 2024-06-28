<script lang="ts" setup>
import { ref, nextTick, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { listToTree, treeToList } from '~/utils'
import { service, DepartModel } from '~/network/api'
import type { FormInstance } from 'element-plus'

export interface RefreshParams {
	page: number
	departmentIds: number[]
	departments: Array<DepartModel>
}

const rules = {
	name: [
		{ required: true, message: '部门名称不能为空', trigger: 'blur' },
		{ max: 12, message: '部门名称不得超过12个字符', trigger: 'blur' }
	]
}

const emit = defineEmits<{
	refresh: [RefreshParams]
}>()

let list: Array<DepartModel> = []
const tree = ref<Array<DepartModel>>([])
const dialog = reactive({
	isShow: false,
	title: '新增'
})
const form = ref({
	id: 0,
	name: '',
	pId: 0,
	parentName: '',
	orderNum: 0
})
const openType = ref<'create' | 'update'>('create')
const formRef = ref()
const currentId = ref<number>()
const loading = ref(false)

function openDialog(type: '新增' | '更新') {
	dialog.title = type
	dialog.isShow = true
	openType.value = type == '新增' ? 'create' : 'update'
}

function cancel() {
	closeDialog()
}

function closeDialog() {
	dialog.isShow = false
}

// 刷新
async function refresh() {
	loading.value = true
	try {
		const { data } = await service.depart.list()
		tree.value = listToTree(data, 'id', 'pId')
		if (data.length) {
			currentId.value = data[0].id
			rowClick(data[0])
		}
	} catch (error) {
		loading.value = false
	}
	loading.value = false
}

// 点击
function rowClick(item: DepartModel) {
	if (item.id == currentId.value) return
	currentId.value = item.id
	const ids = item.children ? treeToList(item.children).map((i) => i.id) : []
	ids.unshift(item.id)

	nextTick(() => {
		// 刷新列表
		emit('refresh', {
			page: 1,
			departmentIds: ids,
			departments: tree.value
		})
	})
}

// 创建右键菜单
function onContextMenu(event: MouseEvent | MouseEvent, row: DepartModel) {
	BContextMenu.create(event, {
		list: [
			{
				context: '新增',
				icon: 'plus',
				callback: (done) => {
					form.value.name = ''
					form.value.orderNum = 0
					form.value.pId = row.id
					form.value.parentName = row.name
					openDialog('新增')
					done()
				}
			},
			{
				context: '编辑',
				icon: 'edit',
				callback: (done) => {
					const parent = list.find((i) => i.id == row.pId)
					form.value.pId = row.pId || 0
					form.value.id = row.id
					form.value.parentName = parent?.name || ''
					form.value.name = row.name
					form.value.orderNum
					openDialog('更新')
					done()
				}
			},
			{
				context: '删除',
				icon: 'trash-2',
				callback: (done) => {
					done()
					ElMessageBox.confirm(
						`此操作将会删除"${row.name}"部门的所有用户，是否确认？`,
						'提示',
						{
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}
					)
						.then(async () => {
							await service.depart.remove([row.id])
							ElMessage({
								type: 'success',
								message: '删除成功!'
							})
							await refresh()
						})
						.catch(() => {
							ElMessage({
								type: 'info',
								message: '已取消'
							})
						})
				}
			}
		]
	})
}

// 提交表单
function submitForm(formEl: FormInstance | undefined) {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			if (openType.value == 'create') {
				await create()
			} else {
				await update()
			}
			await refresh()
			closeDialog()
		} else {
			ElMessage.warning('表单验证未通过！')
		}
	})
}

// 创建
async function create() {
	await service.depart.create({
		name: form.value.name,
		pId: form.value.pId,
		orderNum: form.value.orderNum
	})
	ElMessage.success('创建成功!')
}

// 更新
async function update() {
	await service.depart.update(form.value.id, {
		name: form.value.name,
		pId: form.value.pId,
		orderNum: form.value.orderNum
	})
	ElMessage.success('更新成功!')
}

defineExpose({
	refresh,
	departments: tree
})

onMounted(() => {
	refresh()
})
</script>

<template>
	<div class="depart-tree">
		<div class="depart-tree__header">
			<div class="title">组织</div>
			<div class="flex-1"></div>
			<el-tooltip content="刷新">
				<button class="tool-item" @click="refresh">
					<svg-icon icon="refresh" />
				</button>
			</el-tooltip>
			<el-tooltip content="新增">
				<button class="tool-item" @click="openDialog('新增')">
					<svg-icon icon="plus" :size="18" />
				</button>
			</el-tooltip>
		</div>
		<div class="depart-tree__container">
			<el-scrollbar>
				<el-tree
					v-loading="loading"
					:data="tree"
					:props="{ label: 'name' }"
					:expand-on-click-node="false"
					:style="{ 'min-height': '100%' }"
					:default-checked-keys="[1]"
					highlight-current
					node-key="id"
					default-expand-all
					@node-contextmenu="onContextMenu"
					@node-click="rowClick"
				>
				</el-tree>
			</el-scrollbar>
		</div>

		<b-dialog
			:width="480"
			v-model="dialog.isShow"
			:title="dialog.title + '部门'"
		>
			<el-form
				:model="form"
				:rules="rules"
				label-width="80"
				ref="formRef"
			>
				<el-form-item label="部门名称">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item label="上级部门">
					<el-input v-model="form.parentName" disabled />
				</el-form-item>
				<el-form-item label="序号">
					<el-input-number
						v-model="form.orderNum"
						controls-position="right"
						:min="0"
						:style="{ width: '100%' }"
					/>
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
</template>

<style lang="scss">
.depart-tree {
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
		flex: 1;
		margin-top: var(--theme-margin);
		padding: 0 var(--theme-padding);
	}
	.el-tree-node__content {
		height: 36px;
		border-radius: 4px;
		&:hover {
			background-color: var(--el-fill-color-dark);
		}
	}
	.el-tree--highlight-current
		.el-tree-node.is-current
		> .el-tree-node__content {
		background-color: var(--el-color-primary);
		color: #fff;
	}
}
</style>
