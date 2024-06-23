<script setup lang="ts">
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { service, MenuModel } from '~/network/api'
import svgNames from '~/assets/icons/index'
import { listToTree } from '~/utils'
import {
	treeSelectProps,
	typeOptions,
	permsTreeSelectProps,
	rules,
	componentCascaderOption
} from './options'
import type { FormInstance } from 'element-plus'
import type { DrawerModel } from './type'

defineOptions({
	name: 'base-menu'
})
let menuSelectionData: Array<MenuModel> = []

// drawer
const drawer = reactive<DrawerModel>({
	type: 'create',
	title: '创建菜单',
	opened: false
})
// 菜单文件路径通过级联选择器输入
const isSelectWay = ref(true)
const checkStrictly = ref(true)
// 表单ref
const formRef = ref()
// 权限列表
const perms = ref<any[]>([])
// 菜单目录列表
const menuDirectories = ref<Menu.List>([])
// 菜单组件路径(表单)
const menuFormComponent = ref<Array<string>>([])
// 菜单权限(表单)
const menuFormPerms = ref<Array<string[] | never[]>>([])
// 当前编辑菜单 ID
const currentEditMenuId = ref<number>(0)
// 选中的菜单 ID 集合
const checkedIds = ref<number[]>([])
// 加载状态
const loading = ref(false)

const initFormData = {
	id: 0,
	pid: null,
	path: null,
	name: '',
	cache: 1,
	sort: 110,
	icon: '',
	type: 1,
	hidden: 0,
	perms: [],
	component: '',
	status: 1
}

const form = ref<MenuModel>(initFormData)

// 基础列设置
const baseColumns = ref([
	{
		label: '菜单名称',
		prop: 'name',
		'min-width': 160,
		enable: true
	},
	{
		label: '菜单类型',
		prop: 'type',
		align: 'center',
		width: 80,
		enable: true
	},
	{
		label: '图标',
		prop: 'icon',
		align: 'center',
		width: 60,
		enable: true
	},
	{
		label: '路由路径',
		prop: 'path',
		'min-width': 160,
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
		label: '缓存',
		prop: 'cache',
		align: 'center',
		width: 70,
		enable: true
	},
	{
		label: '隐藏',
		prop: 'hidden',
		align: 'center',
		width: 70,
		enable: true
	},
	{
		label: '序号',
		prop: 'sort',
		width: 80,
		enable: true
	},
	{
		label: '创建日期',
		prop: 'createdAt',
		width: 120,
		align: 'center',
		enable: false
	},
	{
		label: '更新日期',
		prop: 'updatedAt',
		width: 120,
		align: 'center',
		enable: false
	},
	{
		'header-align': 'center',
		label: '操作',
		prop: 'action',
		align: 'right',
		'min-width': 200,
		enable: true
	}
])

// 表格列
const columns = computed(() => baseColumns.value.filter((item) => item.enable))

// 表格数据源
const tableData = ref()

// 创建右键菜单
function rowContextmenu(
	row: Menu.Item,
	_column: any,
	event: MouseEvent | MouseEvent
) {
	BContextMenu.create(event, {
		list: [
			{
				context: '新增',
				icon: 'plus',
				hidden: row.type == 3,
				callback: (done) => {
					form.value.type = 1
					openDrawer('create')
					done()
				}
			},
			{
				context: '编辑',
				icon: 'edit',
				callback: (done) => {
					openDrawer('update', row)
					done()
				}
			},
			{
				context: '删除',
				icon: 'trash',
				callback: (done) => {
					confirmRemove([row.id as number])
					done()
				}
			},
			{
				context: '权限',
				icon: 'shield-check',
				hidden: row.type == 3,
				callback: (done) => {
					form.value.type = 3
					if (row.type == 2) form.value.pid = row.id as number
					openDrawer('create')
					done()
				}
			}
		],
		width: 140
	})
}

// 设置父级字典选项数据
function setTreeSelectData(reset?: boolean) {
	if (reset) form.value.id = 0

	const list =
		form.value.type == 3
			? menuSelectionData.filter((i) => i.type != 3)
			: menuSelectionData.filter((i) => i.type == 1)

	menuDirectories.value = listToTree(list, 'id', 'pid')
}

// 打开表单
function openDrawer(type: DrawerModel['type'], item?: MenuModel) {
	drawer.title = type == 'create' ? '创建菜单' : '更新菜单'
	drawer.type = type
	resetForm()
	if (type == 'update') {
		if (!item) return
		currentEditMenuId.value = item.id as number
		form.value = JSON.parse(JSON.stringify(item))
		setupForm()
	}
	setTreeSelectData(type == 'create')
	drawer.opened = true
}

// 关闭表单
function closeDrawer() {
	resetForm()
	drawer.opened = false
}

// 编辑前初始化表单
function setupForm() {
	menuFormComponent.value = form.value.component
		? form.value.component.split('/')
		: []
	menuFormPerms.value = form.value.perms
		? form.value.perms.map((i) => i.split(':'))
		: []
}

// 提交表单前设置表单
function setForm() {
	// 类型为目录和权限时设置默认值
	if (form.value.type == 1 || form.value.type == 3) {
		form.value.path = null
		form.value.component = ''
		form.value.cache = 1
	}
	// 类型为目录及菜单(视图)时设置默认值
	if (form.value.type == 1 || form.value.type == 2) {
		form.value.perms = []
	} else {
		// 类型为权限时设置默认值
		form.value.icon = ''
		form.value.status = 1
		form.value.hidden = 1
		form.value.perms = menuFormPerms.value.map((i) => i.join(':'))
	}
	if (form.value.type == 2) {
		if (isSelectWay.value) {
			form.value.pid = form.value.pid ? form.value.pid : null
			form.value.component = menuFormComponent.value.join('/')
		}
	}
	delete form.value.id
	delete form.value.children
	delete form.value.createdAt
	delete form.value.updatedAt
}

// 重置表单
function resetForm() {
	form.value = initFormData
	menuFormComponent.value = []
	menuFormPerms.value = []
}

// 提交表单
function submitForm(formEl: FormInstance | undefined) {
	if (!formEl) return
	setForm()
	formEl.validate(async (valid) => {
		if (valid) {
			if (drawer.type == 'create') {
				await create()
			} else {
				await update()
			}
			await getMenus()
			drawer.opened = false
			resetForm()
		} else {
			ElMessage.warning('表单验证未通过！')
			return false
		}
	})
}

function selectionChange(selection: Menu.Item[]) {
	checkedIds.value = selection.map((i) => i.id as number)
}

// 确认删除
function confirmRemove(ids: number[]) {
	ElMessageBox.confirm('确定删除当前选中的菜单项吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			await service.menu.remove(ids)
			await getMenus()
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

async function getMenus() {
	loading.value = true
	const { data } = await service.menu.list()
	menuSelectionData = data
	tableData.value = listToTree(data, 'id', 'pid')
	loading.value = false
}

async function create() {
	await service.menu.update()
	ElMessage.success('创建成功')
}

async function update() {
	await service.menu.update()
	ElMessage.success('更新成功')
}

watch(
	() => form.value.type,
	() => {
		checkStrictly.value = form.value.type !== 3
		setTreeSelectData(drawer.type == 'create')
	},
	{
		immediate: true
	}
)

onMounted(async () => {
	getMenus()
})
</script>

<template>
	<b-view-wrap v-loading="loading">
		<div class="page-head padding-theme">
			<div class="flex-1"></div>
			<el-button type="primary" @click="openDrawer('create')">
				<svg-icon icon="plus" class="mr-8" />
				<span>新增</span>
			</el-button>
			<el-button @click="getMenus">
				<svg-icon icon="refresh" class="mr-8" />
				<span>刷新</span>
			</el-button>
			<el-button
				type="danger"
				plain
				:disabled="!checkedIds.length"
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
		</div>
		<div class="page-body">
			<div class="padding-theme table-wrap">
				<el-table
					:data="tableData"
					max-heigh="100%"
					row-key="id"
					class="mt-8"
					default-expand-all
					style="width: 100%"
					show-overflow-tooltip
					border
					@row-contextmenu="rowContextmenu"
					@selection-change="selectionChange"
				>
					<template #empty><el-empty /></template>
					<el-table-column
						type="selection"
						width="50"
						align="center"
					/>
					<el-table-column
						v-for="item in columns"
						:key="item.prop"
						v-bind="item"
					>
						<template v-if="item.prop == 'type'" v-slot="{ row }">
							<el-tag v-show="row.type == 1" effect="plain"
								>目录</el-tag
							>
							<el-tag
								v-show="row.type == 2"
								type="success"
								effect="plain"
							>
								菜单
							</el-tag>
							<el-tag
								v-show="row.type == 3"
								type="warning"
								effect="plain"
							>
								权限
							</el-tag>
						</template>
						<template
							v-else-if="item.prop == 'action'"
							v-slot="{ row }"
						>
							<el-button
								plain
								type="primary"
								@click="openDrawer('update', row)"
							>
								编辑
							</el-button>
							<el-button
								plain
								type="danger"
								@click="confirmRemove([row.id])"
							>
								删除
							</el-button>
						</template>
						<template
							v-else-if="item.prop == 'icon'"
							v-slot="{ row }"
						>
							<svg-icon :icon="row.icon" :size="18" />
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
								启用
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
							v-else-if="item.prop == 'cache'"
							v-slot="{ row }"
						>
							<el-tag v-show="row.cache" effect="plain">
								开启
							</el-tag>
							<el-tag
								v-show="!row.cache"
								type="warning"
								effect="plain"
							>
								禁止
							</el-tag>
						</template>
						<template
							v-else-if="item.prop == 'hidden'"
							v-slot="{ row }"
						>
							<el-tag v-show="row.hidden" effect="plain">
								是
							</el-tag>
							<el-tag
								v-show="!row.hidden"
								type="info"
								effect="plain"
							>
								否
							</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-drawer v-model="drawer.opened" :size="400" :title="drawer.title">
			<el-form :model="form" label-position="top" ref="formRef">
				<el-form-item label="类型" required>
					<el-radio-group v-model="form.type">
						<el-radio-button
							v-for="item in typeOptions"
							:label="item.value"
							:key="item.label"
						>
							{{ item.label }}
						</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="父级节点">
					<el-tree-select
						placeholder="请选择父级节点"
						:check-strictly="checkStrictly"
						v-model="form.pid"
						clearable
						filterable
						:data="menuDirectories"
						:props="treeSelectProps"
					/>
				</el-form-item>
				<el-form-item label="节点名称" prop="name" :rules="rules.name">
					<el-input
						placeholder="请填写节点名称"
						v-model="form.name"
					/>
				</el-form-item>
				<el-form-item
					label="节点路由"
					prop="path"
					v-if="form.type == 2"
					:rules="rules.path"
				>
					<el-input
						placeholder="请输入节点路由，如: /test"
						v-model="form.path"
					/>
				</el-form-item>
				<el-form-item
					label="文件路径"
					prop="component"
					v-if="form.type == 2"
					:rules="rules.component"
				>
					<div class="flex menu-file">
						<el-cascader
							v-if="isSelectWay"
							placeholder="请选择文件路径"
							v-model="menuFormComponent"
							clearable
							:options="componentCascaderOption"
							:style="{ width: '100%' }"
						/>
						<el-input
							v-else
							placeholder="请输入文件路径"
							v-model="form.component"
						/>
						<el-tooltip
							:content="isSelectWay ? '输入编辑' : '选择文件'"
						>
							<svg-icon
								:icon="isSelectWay ? 'edit' : 'file'"
								:size="20"
								class="ml-8"
								@click="isSelectWay = !isSelectWay"
							/>
						</el-tooltip>
					</div>
				</el-form-item>
				<el-form-item label="排序" prop="sort" :rules="rules.sort">
					<el-input-number
						placeholder="请填写排序号"
						controls-position="right"
						v-model="form.sort"
						:min="0"
						:style="{ width: '100%' }"
					/>
				</el-form-item>
				<el-form-item label="图标" v-if="form.type !== 3">
					<el-select
						placeholder="请选择图标"
						clearable
						v-model="form.icon"
						filterable
					>
						<div class="menu-icon">
							<el-option
								v-for="item in svgNames"
								:key="item"
								:label="item"
								:value="item"
							>
								<svg-icon :icon="item" :size="18" />
							</el-option>
						</div>
					</el-select>
				</el-form-item>
				<el-form-item
					label="权限"
					prop="perms"
					v-if="form.type == 3"
					:rules="rules.perms"
				>
					<el-cascader
						placeholder="请选择"
						v-model="menuFormPerms"
						collapse-tags
						collapse-tags-tooltip
						:max-collapse-tags="1"
						clearable
						:props="permsTreeSelectProps"
						:options="perms"
						:style="{ width: '100%' }"
					/>
				</el-form-item>
				<el-form-item label="是否隐藏" required v-if="form.type != 3">
					<el-radio-group v-model="form.hidden">
						<el-radio-button :label="0">显示</el-radio-button>
						<el-radio-button :label="1">影藏</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="路由缓存" required v-if="form.type == 2">
					<el-radio-group v-model="form.cache">
						<el-radio-button :label="1">开启</el-radio-button>
						<el-radio-button :label="0">关闭</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="状态" required v-if="form.type !== 3">
					<el-radio-group v-model="form.status">
						<el-radio-button :label="1">正常</el-radio-button>
						<el-radio-button :label="0">禁用</el-radio-button>
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
	</b-view-wrap>
</template>
<style lang="scss" scoped>
.b-view-wrap {
	max-height: 100%;
	overflow: hidden;
}
.page-head {
	display: flex;
}
.page-body {
	height: calc(100% - 48px);
	.table-wrap {
		height: 100%;
		overflow: hidden;
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

.menu-icon {
	display: flex;
	flex-wrap: wrap;
	width: 360px;
	padding-left: 5px;

	.el-select-dropdown__item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		height: 50px;
		width: 50px;
		border-radius: 4px;
	}
}

.menu-file {
	width: 100%;
	align-items: center;
}
</style>
