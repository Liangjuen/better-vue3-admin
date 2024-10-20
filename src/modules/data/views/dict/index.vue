<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import DictTypeList from './components/dict-type-list.vue'
import { Data } from '~/enums/permission.enum'
import { service, Dict, DictModel } from '~/network/api'
import { usePermission } from '~/hooks/business'
import { listToTree } from '~/utils'
import { dictRules, treeSelectProps } from './options'

import type { FormInstance } from 'element-plus'
import { RefreshParams } from './components/dict-type-list.vue'

const initFormData: DictModel = {
	name: '',
	value: '',
	pId: null,
	typeId: 0,
	orderNum: 1,
	remark: '',
	id: 0
}

const { hasPermission } = usePermission()

const search = reactive<Dict.GetList>({
	typeId: 1,
	page: 1,
	size: 20,
	keyword: '',
	sort: 'orderNum'
})
const currentType = ref<RefreshParams>()
const total = ref(0)
const checked = ref<Dict.Item[]>([])
const loading = ref(false)
const tableData = ref<Array<DictModel>>([])
const form = ref<DictModel>(initFormData)

// 表单
const formRef = ref()

const baseColumns = ref([
	{
		label: '名称',
		prop: 'name',
		width: 140,
		enable: true
	},
	{
		label: '值',
		prop: 'value',
		'mix-width': 200,
		enable: true
	},
	{
		label: '排序',
		prop: 'orderNum',
		width: 140,
		align: 'center',
		enable: true
	},
	{
		label: '备注',
		prop: 'remark',
		'mix-width': 200,
		enable: true
	},
	{
		label: '创建日期',
		prop: 'createdAt',
		width: 140,
		align: 'center',
		enable: false
	},
	{
		label: '更新日期',
		prop: 'updatedAt',
		width: 140,
		align: 'center',
		enable: false
	},
	{
		'header-align': 'center',
		label: '操作',
		prop: 'action',
		align: 'center',
		fixed: 'right',
		width: 160,
		enable: true
	}
])

// 表格列
const columns = computed(() => baseColumns.value.filter((item) => item.enable))

// drawer
const drawer = reactive<DrawerModel>({
	type: 'create',
	title: '创建字典',
	opened: false
})

const handleSizeChange = (val: number) => (search.size = val)
const handleCurrentChange = (val: number) => (search.page = val)

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
	form.value = initFormData
}

function selectionChange(selection: Dict.Item[]) {
	checked.value = selection
}

// 打开表单
function openDrawer(type: DrawerModel['type'], item?: DictModel) {
	drawer.title = type == 'create' ? '创建字典' : `更新字典: ${item?.name}`
	drawer.type = type
	resetForm(formRef.value)
	if (type == 'update') {
		if (!item) return
		form.value = JSON.parse(JSON.stringify(item))
	} else {
		form.value = initFormData
	}
	drawer.opened = true
}

function closeDrawer() {
	drawer.opened = false
}

// 取消
function cancel() {
	resetForm(formRef.value)
	closeDrawer()
}

function handleRefresh(item: RefreshParams) {
	currentType.value = item
	search.typeId = item.id
	getDictList()
}

// 确认删除
function confirmRemove(checkeds: Dict.Item[] | Dict.Item) {
	let message = ''
	let ids: DictModel['id'][] = []
	if (Array.isArray(checkeds)) {
		message = '确定删除当前选中的字典数据吗?'
		ids = checkeds.map((i) => i.id)
	} else {
		message = `确定删除 [${checkeds.name}] 字典数据吗?`
		ids = [checkeds.id]
	}
	ElMessageBox.confirm(message, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			await service.dict.remove(ids)
			await getDictList()
			ElMessage({
				type: 'success',
				message: '删除成功!'
			})
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消'
			})
		})
}

// 创建右键菜单
function onContextMenu(
	row: DictModel,
	_column: any,
	event: MouseEvent | MouseEvent
) {
	if (hasPermission([Data.Dict.Create, Data.Dict.Update, Data.Dict.Remove])) {
		BContextMenu.create(event, {
			list: [
				{
					icon: 'plus',
					context: '新增',
					hidden: !hasPermission(Data.Dict.Create),
					callback(done) {
						openDrawer('create')
						done()
					}
				},
				{
					icon: 'edit',
					context: '编辑',
					hidden: !hasPermission(Data.Dict.Update),
					callback(done) {
						openDrawer('update', row)
						done()
					}
				},
				{
					icon: 'trash',
					context: '删除',
					hidden: !hasPermission(Data.Dict.Remove),
					callback(done) {
						confirmRemove(row)
						done()
					}
				}
			]
		})
	}
}

// 提交表单
function submitForm(formEl: FormInstance | undefined) {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			if (drawer.type == 'create') {
				await create()
			} else {
				await update()
			}
			refresh()
			closeDrawer()
		} else {
			ElMessage.warning('表单验证未通过！')
		}
	})
}

function refresh() {
	getDictList()
}

// 获取字典列表
async function getDictList() {
	loading.value = true
	try {
		const {
			data: { list, page, total: rTotal, size }
		} = await service.dict.list({
			...search
		})
		tableData.value = listToTree(list as DictModel[], 'id', 'pId')
		;(search.page = page), (search.size = size)
		total.value = rTotal
	} catch (error) {
		loading.value = false
	}
	loading.value = false
}

// 创建字典
async function create() {
	await service.dict.create({ ...form.value })
	ElMessage.success('创建成功')
}

// 更新
async function update() {
	const { id } = form.value
	delete form.value.createdAt
	if (!id) return
	await service.dict.update(id, { ...form.value })
	ElMessage.success('更新成功')
}
</script>

<template>
	<b-view-group
		class="padding-theme"
		left-view-title="字典类型"
		:right-view-titel="`字典列表 (${currentType?.name})`"
		:view-left-width="360"
	>
		<template #left>
			<dict-type-list @refresh="handleRefresh" />
		</template>
		<template #right-content>
			<div class="data-dict-workspace padding-theme" v-loading="loading">
				<el-row class="page-head">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<el-input
							v-model="search.keyword"
							style="width: 100%; max-width: 500px"
							placeholder="输入字典名"
							clearable
						>
							<template #append>
								<el-button type="primary" @click="refresh">
									<svg-icon icon="search" />
								</el-button>
							</template>
						</el-input>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<div class="actions">
							<div class="flex-1"></div>
							<el-button
								v-permission="Data.Dict.Create"
								type="primary"
								@click="openDrawer('create')"
							>
								<svg-icon icon="plus" class="mr-8" />
								<span>新增</span>
							</el-button>
							<el-button
								v-permission="Data.Dict.Remove"
								:disabled="!checked.length"
								type="danger"
								plain
								@click="confirmRemove(checked)"
							>
								<svg-icon icon="trash" class="mr-8" />
								<span>批量删除</span>
							</el-button>

							<el-popover placement="top-start" trigger="click">
								<template #reference>
									<el-button>
										<svg-icon
											icon="settings"
											class="mr-8"
										/>
										<span>列设置</span>
									</el-button>
								</template>
								<div>
									<vue-draggable
										v-model="baseColumns"
										:animation="250"
										handle=".handle"
									>
										<div
											class="column"
											v-for="column in baseColumns"
											:key="column.prop"
										>
											<svg-icon
												icon="move"
												class="handle"
												:size="16"
												:stroke-width="1"
											/>
											<el-checkbox
												v-model="column.enable"
												:label="column.prop"
												:value="column.enable"
											>
												{{ column.label }}
											</el-checkbox>
										</div>
									</vue-draggable>
								</div>
							</el-popover>
						</div>
					</el-col>
				</el-row>

				<el-table
					:data="tableData"
					class="page-body"
					border
					max-heigh="100%"
					row-key="id"
					style="width: 100%"
					show-overflow-tooltip
					highlight-current-row
					@selection-change="selectionChange"
					@row-contextmenu="onContextMenu"
				>
					<template #empty><el-empty /></template>
					<el-table-column type="selection" width="50" />
					<el-table-column
						v-for="item in columns"
						:key="item.prop"
						v-bind="item"
					>
						<template v-if="item.prop == 'action'" v-slot="{ row }">
							<el-button
								v-permission="Data.Dict.Update"
								plain
								type="primary"
								@click="openDrawer('update', row)"
							>
								编辑
							</el-button>
							<el-button
								v-permission="Data.Dict.Remove"
								plain
								type="danger"
								@click="confirmRemove(row)"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<el-pagination
					class="mt-8"
					v-model:current-page="search.page"
					v-model:page-size="search.size"
					:page-sizes="[5, 10, 20, 40]"
					:total="total"
					background
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>

			<el-drawer v-model="drawer.opened" :title="drawer.title" size="500">
				<el-form
					label-position="top"
					:rules="dictRules"
					ref="formRef"
					:model="form"
				>
					<el-form-item label="父级节点" prop="departmentId">
						<el-tree-select
							placeholder="请选择父级节点"
							:check-strictly="true"
							v-model="form.pId"
							clearable
							filterable
							:data="tableData"
							:props="treeSelectProps"
						/>
					</el-form-item>
					<el-form-item prop="name" label="字典名">
						<el-input
							v-model="form.name"
							placeholder="在此输入字典名"
						/>
					</el-form-item>
					<el-form-item prop="value" label="值">
						<el-input
							type="textarea"
							maxlength="500"
							show-word-limit
							placeholder="在此输入字典值"
							:rows="4"
							v-model="form.value"
						/>
					</el-form-item>
					<el-form-item prop="remark" label="备注">
						<el-input
							type="textarea"
							maxlength="200"
							show-word-limit
							placeholder="在此输入备注"
							:rows="3"
							v-model="form.remark"
						/>
					</el-form-item>
					<el-form-item label="序号">
						<el-input-number
							v-model="form.orderNum"
							controls-position="right"
							:min="1"
							:style="{ width: '100%' }"
						/>
					</el-form-item>
				</el-form>
				<template #footer>
					<el-button type="primary" @click="submitForm(formRef)">
						保存
					</el-button>
					<el-button @click="cancel">取消</el-button>
				</template>
			</el-drawer>
		</template>
	</b-view-group>
</template>

<style lang="scss" scoped>
.data-dict-workspace {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
.page-head {
	margin-bottom: var(--theme-margin);
	.actions {
		display: flex;
	}

	.el-col {
		margin-bottom: var(--theme-margin);
	}
}
.page-body {
	flex: 1;
}
.column {
	display: flex;
	align-items: center;
	padding: 0 var(--theme-padding);
	border-radius: var(--el-border-radius-base);
	.svg-icon {
		cursor: move;
	}
	&:hover {
		background-color: var(--el-color-primary-light-8);
	}
}
</style>
