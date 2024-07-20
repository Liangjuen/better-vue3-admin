<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { rules, passRules, treeSelectProps, options } from './options'
import { useGlobal } from '~/store'
import DepartList from './components/depart-list.vue'
import { RefreshParams } from './components/depart-list.vue'
import { UserModel, User, RoleModel, service } from '~/network/api'
import { Base } from '~/enums/permission.enum'
import { usePermission } from '~/hooks/business'

import type { FormInstance } from 'element-plus'
import type { DrawerModel } from './type'

defineOptions({
	name: 'base-user'
})
const { appStore } = useGlobal()

const { hasPermission } = usePermission()

const roles = ref<Array<RoleModel>>([])

// 基础列设置
const baseColumns = ref([
	{
		label: '头像',
		prop: 'avatar',
		align: 'center',
		width: 90,
		enable: true
	},
	{
		label: '用户名',
		prop: 'username',
		width: 140,
		enable: true
	},
	{
		label: '姓名',
		prop: 'name',
		width: 140,
		enable: true
	},
	{
		label: '昵称',
		prop: 'nickname',
		width: 140,
		enable: true
	},
	{
		label: '邮箱',
		prop: 'email',
		width: 140,
		enable: true
	},
	{
		label: '手机',
		prop: 'phone',
		align: 'center',
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
		label: '性别',
		prop: 'gender',
		align: 'center',
		width: 70,
		enable: true
	},
	{
		label: '角色',
		prop: 'roles',
		'min-width': 120,
		enable: true
	},
	{
		label: '个性签名',
		prop: 'remark',
		'min-width': 150,
		enable: false
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
		'min-width': 240,
		enable: true
	}
])

// 表单
const formRef = ref()
const passFormRef = ref()
const departRef = ref()

// 表格列
const columns = computed(() => baseColumns.value.filter((item) => item.enable))

const initFormData: UserModel = {
	departmentId: 1,
	username: '',
	nickname: '',
	password: '',
	name: '',
	email: '',
	phone: '',
	roles: [],
	status: 1,
	gender: 2,
	tags: [],
	avatar: '',
	remark: '',
	id: 0
}

const search = reactive<User.GetList>({
	page: 1,
	size: 20,
	status: null,
	gender: null,
	keyword: '',
	departmentIds: []
})
const total = computed(() => tableData.value.length)
const showMoreInfo = ref(false)
const checkedIds = ref<number[]>([])
const passDialog = ref(false)
const loading = ref(false)
const tableData = ref<Array<UserModel>>([])
const form = ref<UserModel>(initFormData)

function selectionChange(selection: Menu.Item[]) {
	checkedIds.value = selection.map((i) => i.id as number)
}

// 重置密码表单
const passForm = ref<{
	password: string
	confirmPass: string
}>({
	password: '',
	confirmPass: ''
})

// drawer
const drawer = reactive<DrawerModel>({
	type: 'create',
	title: '创建菜单',
	opened: false
})

// 编辑前初始化表单
function setupForm() {}

// 打开密码重置对话框
function openPassDialog(item: UserModel) {
	form.value = JSON.parse(JSON.stringify(item))
	passDialog.value = true
}

const handleSizeChange = (val: number) => (search.size = val)
const handleCurrentChange = (val: number) => (search.page = val)

// 打开表单
function openDrawer(type: DrawerModel['type'], item?: UserModel) {
	drawer.title = type == 'create' ? '创建用户' : `更新用户: ${item?.name}`
	drawer.type = type
	setupForm()
	if (type == 'update') {
		if (!item) return
		form.value = JSON.parse(JSON.stringify(item))
		setupForm()
	} else {
		form.value = initFormData
	}
	drawer.opened = true
}

function closeDrawer() {
	drawer.opened = false
}

function closeDialog() {
	passDialog.value = false
}

// 取消
function cancel() {
	closeDrawer()
	closeDialog()
}

function changeShowMoreInfo(val: boolean) {
	showMoreInfo.value = val
}

// 监听重置密码弹框关闭
function handlePassDialogClosed() {
	passFormRef.value.resetFields()
}

// 部门选项改变
function handleRefresh(item: RefreshParams) {
	search.departmentIds = item.departmentIds
	getUserList()
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

// 提交表单
function submitPassForm(formEl: FormInstance | undefined) {
	if (!formEl) return
	if (passForm.value.password !== passForm.value.confirmPass) {
		ElMessage.warning('两次密码不一致！')
		return false
	}

	formEl.validate(async (valid) => {
		if (valid) {
			ElMessage.success('重置成功')
			closeDialog()
		} else {
			ElMessage.warning('表单验证未通过！')
		}
	})
}

// 确认删除
function confirmRemove(ids: number[]) {
	ElMessageBox.confirm('确定删除当前选中的用户吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			await service.user.remove(ids)
			await getUserList()
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
	row: UserModel,
	_column: any,
	event: MouseEvent | MouseEvent
) {
	if (hasPermission([Base.UserCreate, Base.UserUpdate, Base.UserRemove])) {
		BContextMenu.create(event, {
			list: [
				{
					icon: 'plus',
					context: '新增',
					hidden: !hasPermission(Base.UserCreate),
					callback(done) {
						openDrawer('create')
						done()
					}
				},
				{
					icon: 'edit',
					context: '编辑',
					hidden: !hasPermission(Base.UserUpdate),
					disabled: row.roles.includes('admin'),
					callback(done) {
						openDrawer('update', row)
						done()
					}
				},
				{
					icon: 'trash',
					context: '删除',
					hidden: !hasPermission(Base.UserRemove),
					disabled: row.roles.includes('admin'),
					callback(done) {
						confirmRemove([row.id])
						done()
					}
				}
			]
		})
	}
}

// 刷新
function refresh() {
	getUserList()
}

async function getUserList() {
	loading.value = true
	try {
		const { data } = await service.user.list({
			...search
		})
		tableData.value = data
	} catch (error) {
		loading.value = false
	}
	loading.value = false
}

// 获取角色列表
async function getRoles() {
	const { data } = await service.role.list({})
	roles.value = data.list || []
}

// 创建用户
async function create() {
	await service.user.create({ ...form.value })
	ElMessage.success('创建成功')
}

// 更新
async function update() {
	const { id } = form.value
	delete form.value.createdAt
	if (!id) return
	await service.user.update(id, { ...form.value })
	ElMessage.success('更新成功')
}

onMounted(() => {
	getUserList()
	getRoles()
})
</script>

<template>
	<b-view-group
		left-view-title="组织"
		right-view-titel="用户列表"
		class="padding-theme"
	>
		<template #left>
			<depart-list ref="departRef" @refresh="handleRefresh" />
		</template>
		<template #right-content>
			<div class="base-user-work padding-theme">
				<el-row class="page-head">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<el-input
							v-model="search.keyword"
							style="width: 100%; max-width: 500px"
							placeholder="输入用户名、姓名、昵称、手机"
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
								v-permission="Base.UserCreate"
								type="primary"
								@click="openDrawer('create')"
							>
								<svg-icon icon="plus" class="mr-8" />
								<span>新增</span>
							</el-button>
							<el-button
								v-permission="Base.UserRemove"
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
					<el-table-column
						type="selection"
						:selectable="(row) => !row.roles.includes('admin')"
						width="50"
					/>
					<el-table-column
						v-for="item in columns"
						:key="item.prop"
						v-bind="item"
					>
						<template v-if="item.prop == 'gender'" v-slot="{ row }">
							<span v-if="row.gender == 2">保密</span>
							<svg-icon
								v-else
								:icon="
									row.gender == 1
										? 'gender-male'
										: 'gender-famale'
								"
							/>
						</template>
						<template
							v-else-if="item.prop == 'roles'"
							v-slot="{ row }"
						>
							<el-tag
								v-for="role in row.roles"
								:key="role"
								effect="plain"
							>
								{{ role }}
							</el-tag>
						</template>
						<template
							v-else-if="item.prop == 'action'"
							v-slot="{ row }"
						>
							<el-button
								v-permission="Base.UserResetPassword"
								:disabled="row.roles.includes('admin')"
								plain
								type="success"
								@click="openPassDialog(row)"
							>
								重置
							</el-button>
							<el-button
								v-permission="Base.UserUpdate"
								:disabled="row.roles.includes('admin')"
								plain
								type="primary"
								@click="openDrawer('update', row)"
							>
								编辑
							</el-button>
							<el-button
								v-permission="Base.UserRemove"
								:disabled="row.roles.includes('admin')"
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
							v-else-if="item.prop == 'avatar'"
							v-slot="{ row }"
						>
							<img
								class="avatar"
								:src="row.avatar"
								v-lazy="row.avatar"
							/>
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

			<b-dialog
				title="重置密码"
				v-model="passDialog"
				:width="480"
				@closed="handlePassDialogClosed"
			>
				<el-form
					ref="passFormRef"
					:model="passForm"
					:rules="passRules"
					label-width="80"
				>
					<el-form-item label="用户名">
						<el-input v-model="form.username" disabled />
					</el-form-item>
					<el-form-item prop="password" label="密码">
						<el-input v-model="passForm.password" />
					</el-form-item>
					<el-form-item prop="password" label="确认密码">
						<el-input v-model="passForm.confirmPass" />
					</el-form-item>
				</el-form>
				<template #footer>
					<el-button @click="cancel"> 取消 </el-button>
					<el-button
						type="primary"
						@click="submitPassForm(passFormRef)"
					>
						保存
					</el-button>
				</template>
			</b-dialog>

			<el-drawer :title="drawer.title" size="400" v-model="drawer.opened">
				<el-form
					label-position="top"
					:rules="rules"
					ref="formRef"
					:model="form"
				>
					<el-form-item label="部门" prop="departmentId">
						<el-tree-select
							v-model="form.departmentId"
							check-strictly
							clearable
							filterable
							:props="treeSelectProps"
							:data="departRef.departments"
						/>
					</el-form-item>
					<el-form-item label="用户名" prop="username">
						<el-input
							v-model="form.username"
							placeholder="请输入用户名"
							maxlength="16"
						/>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input
							v-model="form.name"
							placeholder="请输入姓名"
						/>
					</el-form-item>
					<el-form-item label="昵称" prop="nickname">
						<el-input
							v-model="form.nickname"
							placeholder="请输入昵称"
						/>
					</el-form-item>
					<el-form-item label="角色" prop="roles">
						<el-select
							v-model="form.roles"
							multiple
							collapse-tags
							placeholder="请选择"
							style="width: 100%"
						>
							<el-option
								v-for="item in roles"
								:key="item.id"
								:label="item.name"
								:value="item.code"
							/>
						</el-select>
					</el-form-item>
					<div
						class="show-more"
						@click="changeShowMoreInfo(!showMoreInfo)"
					>
						<svg-icon
							v-show="!showMoreInfo"
							icon="more-horizontal"
						/>
						<svg-icon v-show="showMoreInfo" icon="chevron-up" />
					</div>
					<div class="more-wrap">
						<transition
							:name="appStore.animationName"
							appear
							mode="out-in"
						>
							<div class="more" v-if="showMoreInfo">
								<el-form-item label="手机" prop="phone">
									<el-input
										v-model="form.phone"
										placeholder="请输入手机号"
									/>
								</el-form-item>
								<el-form-item label="邮箱" prop="email">
									<el-input
										v-model="form.email"
										placeholder="请输入邮箱"
									/>
								</el-form-item>
								<el-form-item label="状态">
									<el-segmented
										v-model="form.status"
										:options="options.status"
									>
										<template #default="{ item }">
											{{ item.label }}
										</template>
									</el-segmented>
								</el-form-item>
								<el-form-item label="性别">
									<el-segmented
										v-model="form.gender"
										:options="options.gender"
									>
										<template #default="{ item }">
											{{ item.label }}
										</template>
									</el-segmented>
								</el-form-item>
								<el-form-item label="备注" prop="remark">
									<el-input
										type="textarea"
										maxlength="200"
										show-word-limit
										:rows="2"
										v-model="form.remark"
									/>
								</el-form-item>
							</div>
						</transition>
					</div>
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
.base-user-work {
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
.el-checkbox {
	flex: 1;
	margin-right: 0;
	margin-left: var(--theme-margin);
}
.show-more {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: var(--theme-padding);
	margin-bottom: 16px;
	border-radius: var(--el-border-radius-base);
	border: 1px solid var(--el-border-color);
	cursor: pointer;
	&:hover {
		border-color: var(--el-color-primary-light-3);
		color: var(--el-color-primary);
	}
}

.more-wrap {
	width: 100%;
	overflow-x: hidden;
}

.avatar {
	width: 56px;
	height: 56px;
	border-radius: 10px;
}
</style>
