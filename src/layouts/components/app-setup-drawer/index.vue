<template>
	<el-drawer
		title="设置项"
		direction="rtl"
		v-model="appStore.showSettings"
		size="312px"
	>
		<layout-picker />
		<set-item label="侧边栏背景">
			<el-select
				v-model="appStore.siderBackMode"
				:style="{ width: '160px' }"
			>
				<el-option
					v-for="item in backMode"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</set-item>
		<set-item label="顶部背景">
			<el-select
				v-model="appStore.headerBackMode"
				:style="{ width: '160px' }"
			>
				<el-option
					v-for="item in backMode"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</set-item>
		<set-item label="过度动画">
			<el-select
				v-model="appStore.animationName"
				clearable
				:style="{ width: '160px' }"
			>
				<el-option
					v-for="item in viewTransitionNames"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</set-item>
		<set-item label="标签风格">
			<el-select v-model="appStore.tabStyle" :style="{ width: '160px' }">
				<el-option
					v-for="item in tabStyles"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</set-item>
		<set-item label="侧边栏宽度">
			<el-input-number
				type="number"
				v-model="appStore.siderWidth"
				:min="256"
				:max="500"
				:style="{ width: '160px' }"
			/>
		</set-item>
		<set-item label="圆角">
			<el-input-number
				type="number"
				v-model="appStore.radius"
				:min="2"
				:max="50"
				:style="{ width: '160px' }"
			/>
		</set-item>
		<set-item label="主题色">
			<el-color-picker v-model="appStore.color" size="small" />
		</set-item>
		<set-item label="暗黑模式">
			<theme />
		</set-item>
		<set-item label="灰色模式">
			<el-switch v-model="appStore.gray" />
		</set-item>
		<set-item label="显示标签">
			<el-switch v-model="appStore.showTabbar" />
		</set-item>
		<set-item label="显示底部">
			<el-switch v-model="appStore.showFooter" />
		</set-item>
		<template #footer>
			<el-button type="primary" @click="confirmReset">重置</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import SetItem from './set-item.vue'
import LayoutPicker from './layout-picker.vue'
import { useGlobal } from '~/store'
import { config } from '~/config'

defineOptions({
	name: 'set-opt-drawer'
})

const {
	theme: { viewTransitionNames, tabStyles, backMode }
} = config

const { appStore } = useGlobal()

function confirmReset() {
	ElMessageBox.confirm('请确定重置配置!', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		appStore.$reset()
	})
}
</script>
