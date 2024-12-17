<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { Base } from '~/enums/permission.enum'
import { service, LoginLog, type LoginLogModel } from '~/network/api'
import { usePermission } from '~/hooks/business'

const { hasPermission } = usePermission()

// 基础列设置
const baseColumns = ref([
	{
		label: '用户ID',
		prop: 'userId',
		width: 80,
		enable: true
	},
	{
		label: '用户名称',
		prop: 'username',
		width: 140,
		enable: true
	},
	{
		label: '登录状态',
		prop: 'loginState',
		align: 'center',
		width: 100,
		enable: true
	},
	{
		label: '操作信息',
		prop: 'message',
		width: 100,
		enable: true
	},
	{
		label: 'IP',
		prop: 'ip',
		width: 150,
		enable: true
	},
	{
		label: 'IP地址',
		prop: 'ipAddr',
		'min-width': 100,
		enable: true
	},
	{
		label: '操作系统',
		prop: 'os',
		width: 120,
		enable: true
	},
	{
		label: '浏览器',
		prop: 'browser',
		width: 120,
		enable: true
	},
	{
		label: '移动端?',
		prop: 'isMobile',
		width: 80,
		align: 'center',
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
		width: 80,
		enable: true
	}
])

// 表格列
const columns = computed(() => baseColumns.value.filter((item) => item.enable))

const loading = ref(false)
const total = ref(0)
const search = reactive<LoginLog.GetList>({
	page: 1,
	size: 10,
	loginState: null,
	keyword: ''
})
const tableData = ref<Array<LoginLogModel>>([])
const checkedIds = ref<number[]>([])

function selectionChange(selection: LoginLog.Item[]) {
	checkedIds.value = selection.map((i) => i.id as number)
}
const handleSizeChange = (val: number) => (search.size = val)
const handleCurrentChange = (val: number) => (search.page = val)

// 创建右键菜单
function onContextMenu(
	row: LoginLogModel,
	_column: any,
	event: MouseEvent | MouseEvent
) {
	if (!hasPermission([Base.RoleCreate, Base.RoleUpdate, Base.RoleRemove]))
		return
	BContextMenu.create(event, {
		list: [
			{
				icon: 'trash',
				context: '删除',
				hidden: !hasPermission(Base.RoleRemove),
				callback(done) {
					confirmRemove([row.id])
					done()
				}
			}
		]
	})
}

// 确认删除
function confirmRemove(ids: number[]) {
	ElMessageBox.confirm('确定删除当前选中的数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			await service.loginLog.remove(ids)
			await getLoginLogList()
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

/**
 * 获取登录日志列表
 */
async function getLoginLogList() {
	try {
		loading.value = true
		const { data } = await service.loginLog.list({ ...search })
		tableData.value = data.list || []
		total.value = data.total
		search.page = data.page
		search.size = data.size
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	getLoginLogList()
})
</script>

<template>
	<div class="base-login-log-workspace padding-theme" v-loading="loading">
		<el-form class="page-head">
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<el-form-item>
						<el-input
							v-model="search.keyword"
							style="width: 100%"
							placeholder="输入用户名/IP"
							clearable
						>
							<template #prepend>
								<el-select
									v-model="search.loginState as number"
									placeholder="状态"
									clearable
									style="width: 80px"
								>
									<el-option label="成功" :value="1" />
									<el-option label="异常" :value="0" />
								</el-select>
							</template>
							<template #append>
								<el-button
									type="primary"
									@click="getLoginLogList"
								>
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
							v-permission="[Base.LoginLogRemove]"
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
					<template v-if="item.prop == 'loginState'" v-slot="{ row }">
						<el-tag
							v-show="row.loginState"
							type="success"
							effect="plain"
						>
							成功
						</el-tag>
						<el-tag
							v-show="!row.loginState"
							type="warning"
							effect="plain"
						>
							失败
						</el-tag>
					</template>
					<template
						v-else-if="item.prop == 'isMobile'"
						v-slot="{ row }"
					>
						<el-tag
							v-show="row.isMobile"
							type="success"
							effect="plain"
						>
							是
						</el-tag>
						<el-tag
							v-show="!row.isMobile"
							type="warning"
							effect="plain"
						>
							否
						</el-tag>
					</template>
					<template
						v-else-if="item.prop == 'action'"
						v-slot="{ row }"
					>
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
				:page-sizes="[5, 10, 20, 40]"
				:total="total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
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
		overflow: hidden;
		padding: var(--theme-padding);
		background-color: var(--el-bg-color);
		border-radius: var(--el-border-radius-base);
	}

	.el-form-item {
		margin-bottom: var(--theme-margin);
	}
}
</style>
