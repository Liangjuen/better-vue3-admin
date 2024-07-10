<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { listToTree } from '~/utils'
import { RoleModel, service, type Role } from '~/network/api'
import { rules, treeProps } from './options'
import { Base } from '~/enums/permission.enum'
import { usePermission } from '~/hooks/business'

import type { FormInstance } from 'element-plus'

defineOptions({
	name: 'base-role'
})

const { hasPermission } = usePermission()

const initFormData: RoleModel = {
	name: '',
	code: '',
	perms: [],
	menuIdList: [],
	remark: '',
	status: 1,
	id: 0
}

// 基础列设置
const baseColumns = ref([
	{
		label: '名称',
		prop: 'name',
		width: 140,
		enable: true
	},
	{
		label: '状态',
		prop: 'status',
		align: 'center',
		width: 70,
		enable: true
	},
	{
		label: '编码',
		prop: 'code',
		'min-width': 150,
		enable: true
	},
	{
		label: '菜单/权限',
		prop: 'menuIdList',
		align: 'center',
		width: 100,
		enable: true
	},
	{
		label: '备注',
		prop: 'remark',
		'min-width': 150,
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
		align: 'right',
		fixed: 'right',
		width: 160,
		enable: true
	}
])

// 表格列
const columns = computed(() => baseColumns.value.filter((item) => item.enable))
const formRef = ref()
const drawerTreeRef = ref()
const dialogTreeRef = ref()
const search = reactive<Role.GetList>({
	page: 1,
	size: 20,
	status: null,
	keyword: ''
})
const tableData = ref<Array<RoleModel>>([])
const form = ref(initFormData)
const total = ref(0)
const checkedIds = ref<number[]>([])
const loading = ref(false)
const loadingMenuPerms = ref(false)
// 菜单树
const menuTree = ref<Menu.List>([])
// 过滤文本
const filterText = ref('')

// drawer
const drawer = reactive<DrawerModel>({
	type: 'create',
	title: '创建菜单',
	opened: false
})
// dialog
const dialog = reactive<DialogModel>({
	opened: false,
	title: '新增',
	type: 'update'
})

function selectionChange(selection: Menu.Item[]) {
	checkedIds.value = selection.map((i) => i.id as number)
}
const handleSizeChange = (val: number) => (search.size = val)
const handleCurrentChange = (val: number) => (search.page = val)

// 编辑前初始化表单
function setupForm(item?: RoleModel) {
	form.value = item ? JSON.parse(JSON.stringify(item)) : initFormData
	if (!formRef.value) return
	formRef.value.resetFields()
}

// 设置tree默认数据
function setTreeCheckedKeys(ids: number[]) {
	if (drawerTreeRef.value && drawer.opened) {
		drawerTreeRef.value.setCheckedKeys(ids)
	} else if (dialogTreeRef.value) {
		dialogTreeRef.value.setCheckedKeys(ids)
	}
	loadingMenuPerms.value = false
}

function filterNode(
	value: string,
	data: {
		[key: string]: any
	}
) {
	if (!value) return true
	return data.name.includes(value)
}

function menuCheck(_data: any, tree: any) {
	form.value.menuIdList = tree.checkedKeys
}

// 打开表单
function openDrawer(type: DrawerModel['type'], item?: RoleModel) {
	drawer.title = type == 'create' ? '创建角色' : `更新角色: ${item?.name}`
	drawer.type = type
	if (type == 'update') {
		setupForm(item)
	} else {
		setupForm()
	}
	loadingMenuPerms.value = true
	drawer.opened = true
}

// 关闭抽屉
function closeDrawer() {
	drawer.opened = false
	filterText.value = ''
}

function closeDialog() {
	dialog.opened = false
	filterText.value = ''
}

// 打开权限详情对话框
function openDialog(item: RoleModel) {
	setupForm(item)
	loadingMenuPerms.value = true
	dialog.opened = true
}

// 取消
function cancel() {
	closeDrawer()
	closeDialog()
}

// 确认删除
function confirmRemove(ids: number[]) {
	ElMessageBox.confirm('确定删除当前选中的角色吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			await service.role.remove(ids)
			await getRoleList()
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
	row: RoleModel,
	_column: any,
	event: MouseEvent | MouseEvent
) {
	if (!hasPermission([Base.RoleCreate, Base.RoleUpdate, Base.RoleRemove]))
		return
	BContextMenu.create(event, {
		list: [
			{
				icon: 'plus',
				context: '新增',
				hidden: !hasPermission(Base.RoleCreate),
				callback(done) {
					openDrawer('create')
					done()
				}
			},
			{
				icon: 'edit',
				context: '编辑',
				disabled: row.code == 'Admin',
				hidden: !hasPermission(Base.RoleUpdate),
				callback(done) {
					openDrawer('update', row)
					done()
				}
			},
			{
				icon: 'trash',
				context: '删除',
				hidden: !hasPermission(Base.RoleRemove),
				disabled: row.code == 'Admin',
				callback(done) {
					confirmRemove([row.id])
					done()
				}
			}
		]
	})
}

// 提交表单
async function submitForm(formEl: FormInstance | undefined) {
	if (!formEl) return

	await formEl.validate(async (valid) => {
		if (valid) {
			if (drawer.type == 'create') {
				await create()
			} else {
				await update()
			}
			closeDrawer()
			closeDialog()
			await getRoleList()
		} else {
			ElMessage.warning('表单验证未通过！')
		}
	})
}

// 获取菜单列表数据
async function getMenuList() {
	const { data } = await service.menu.list()
	menuTree.value = listToTree(data, 'id', 'pid')
}

// 获取角色列表
async function getRoleList() {
	loading.value = true
	try {
		const { data } = await service.role.list({
			...search
		})

		tableData.value = data.list || []
		search.page = data.page
		search.size = data.size
		total.value = data.total
	} catch (error) {
		loading.value = false
	}
	loading.value = false
}

// 创建用户
async function create() {
	await service.role.create({ ...form.value })
	ElMessage.success('创建成功')
}

// 更新
async function update() {
	const { id } = form.value
	delete form.value.createdAt
	if (!id) return
	await service.role.update(id, { ...form.value })
	ElMessage.success('更新成功')
}

watch(filterText, (val) => {
	if (dialogTreeRef.value) dialogTreeRef.value.filter(val)
	if (drawerTreeRef.value) drawerTreeRef.value.filter(val)
})

onMounted(async () => {
	await getRoleList()
	await getMenuList()
})
</script>

<template>
	<div class="base-role-workspace" v-loading="loading">
		<el-form class="page-head">
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<el-form-item>
						<el-input
							v-model="search.keyword"
							style="width: 100%"
							placeholder="输入名称、code"
							clearable
						>
							<template #prepend>
								<el-select
									v-model="search.status as number"
									placeholder="状态"
									clearable
									style="width: 80px"
								>
									<el-option label="正常" :value="1" />
									<el-option label="禁用" :value="0" />
								</el-select>
							</template>
							<template #append>
								<el-button type="primary" @click="getMenuList">
									<svg-icon icon="search" />
								</el-button>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
					<el-form-item>
						<div class="flex-1"></div>
						<el-button
							v-permission="[Base.RoleCreate]"
							type="primary"
							@click="openDrawer('create')"
						>
							<svg-icon icon="plus" class="mr-8" />
							<span>新增</span>
						</el-button>
						<el-button
							v-permission="[Base.RoleRemove]"
							:disabled="!checkedIds.length"
							type="danger"
							plain
							@click="confirmRemove(checkedIds)"
						>
							<svg-icon icon="trash" class="mr-8" />
							<span>批量删除</span>
						</el-button>

						<el-popover placement="top-start" trigger="click">
							<template #reference>
								<el-button>
									<svg-icon icon="settings" class="mr-8" />
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
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="page-body flex-1">
			<el-table
				:data="tableData"
				class="flex-1"
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
				<el-table-column
					type="selection"
					:selectable="(row) => row.code !== 'Admin'"
					width="50"
				/>
				<el-table-column
					v-for="item in columns"
					v-bind="item"
					:key="item.prop"
				>
					<template v-if="item.prop == 'code'" v-slot="{ row }">
						<el-tag>
							{{ row.code }}
						</el-tag>
					</template>
					<template
						v-else-if="item.prop == 'status'"
						v-slot="{ row }"
					>
						<el-tag
							v-show="row.status"
							type="success"
							effect="plain"
						>
							正常
						</el-tag>
						<el-tag
							v-show="!row.status"
							type="warning"
							effect="plain"
						>
							禁用
						</el-tag>
					</template>
					<template
						v-else-if="item.prop == 'menuIdList'"
						v-slot="{ row }"
					>
						<el-link
							v-show="row.code !== 'Admin'"
							type="primary"
							@click="openDialog(row as RoleModel)"
						>
							详情
						</el-link>
						<span v-show="row.code == 'Admin'">-</span>
					</template>
					<template
						v-else-if="item.prop == 'action'"
						v-slot="{ row }"
					>
						<el-button
							v-permission="[Base.RoleUpdate]"
							plain
							type="primary"
							:disabled="row.code == 'Admin'"
							@click="openDrawer('update', row)"
						>
							编辑
						</el-button>
						<el-button
							v-permission="[Base.RoleRemove]"
							plain
							type="danger"
							:disabled="row.code == 'Admin'"
							@click="confirmRemove([row.id])"
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
				:page-sizes="[10, 20, 30, 40]"
				:total="total"
				background
				hide-on-single-page
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>

		<el-drawer
			v-model="drawer.opened"
			:size="400"
			:title="drawer.title"
			@opened="setTreeCheckedKeys(form.menuIdList)"
		>
			<el-form
				label-position="top"
				ref="formRef"
				:model="form"
				:rules="rules"
			>
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item label="编码" prop="code">
					<el-input v-model="form.code" />
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input :rows="2" type="textarea" v-model="form.remark" />
				</el-form-item>
				<el-form-item label="权限">
					<el-input
						v-model="filterText"
						clearable
						placeholder="输入关键词过滤"
					/>

					<div class="menu-check drawer mt-8 padding-4">
						<el-scrollbar>
							<el-tree
								ref="drawerTreeRef"
								class="filter-tree"
								show-checkbox
								node-key="id"
								v-loading="loadingMenuPerms"
								:data="menuTree"
								:props="treeProps"
								:filter-node-method="filterNode"
								:default-checked-keys="form.menuIdList"
								@check="menuCheck"
							/>
						</el-scrollbar>
					</div>
				</el-form-item>
				<el-form-item
					v-if="drawer.type == 'update'"
					label="状态"
					required
				>
					<el-radio-group v-model="form.status">
						<el-radio-button :value="1">正常</el-radio-button>
						<el-radio-button :value="0">禁用</el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" @click="submitForm(formRef)">
					保存
				</el-button>
				<el-button @click="closeDrawer">取消</el-button>
			</template>
		</el-drawer>

		<b-dialog
			:width="480"
			v-model="dialog.opened"
			title="菜单权限"
			@opened="setTreeCheckedKeys(form.menuIdList)"
		>
			<el-input
				v-model="filterText"
				clearable
				placeholder="输入关键词过滤"
			/>

			<div class="menu-check dialog mt-8 padding-4">
				<el-scrollbar>
					<el-tree
						ref="dialogTreeRef"
						class="filter-tree"
						show-checkbox
						highlight-current
						default-expand-all
						node-key="id"
						v-loading="loadingMenuPerms"
						:data="menuTree"
						:props="treeProps"
						:filter-node-method="filterNode"
						:default-checked-keys="form.menuIdList"
						@check="menuCheck"
					/>
				</el-scrollbar>
			</div>

			<template #footer>
				<el-button @click="cancel()"> 取消 </el-button>
				<el-button type="primary" @click="submitForm(formRef)">
					保存
				</el-button>
			</template>
		</b-dialog>
	</div>
</template>

<style lang="scss" scoped>
.base-role-workspace {
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
.el-checkbox {
	flex: 1;
	margin-right: 0;
	margin-left: var(--theme-margin);
}

.menu-check {
	width: 100%;
	border: 1px solid var(--el-border-color);
	&.dialog {
		height: 420px;
	}
	&.drawer {
		height: 220px;
	}
}
</style>
