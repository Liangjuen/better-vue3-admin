<script setup lang="ts">
import pkg from '-/package.json'
defineOptions({
	name: 'about'
})

const { version, homepage, dependencies, devDependencies } = pkg

function extract(obj: object) {
	return Object.entries(obj).map((item) => ({
		package: item[0],
		version: item[1]
	}))
}

const packages = {
	dependencies: extract(dependencies),
	devDependencies: extract(devDependencies)
}
</script>

<template>
	<div class="about-workspace">
		<el-card shadow="hover">
			<template #header> 关于 </template>
			<el-text>
				better-vue3-admin 是一个基于Vue3、Vite3、TypeScript、Element
				Plus 的功能强、高颜值、清新优雅、可扩展的中后台模板。
				拥有丰富的主题设置及基础组件，
				实现了基于菜单管理的自动化的文件路由系统， 基于 RBAC
				模型实现按钮级别权限控制， 基于mockjs的数据模拟。
			</el-text>
		</el-card>

		<el-card shadow="hover">
			<template #header> 项目说明 </template>
			<el-descriptions border>
				<el-descriptions-item label="版本">
					<el-tag type="primary">{{ version }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="地址">
					<el-link :href="homepage" target="_blank">
						<svg-icon icon="github" />
					</el-link>
				</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card shadow="hover">
			<template #header> 生产依赖 </template>
			<el-descriptions border>
				<el-descriptions-item
					v-for="item in packages.dependencies"
					:key="item.package"
					:label="item.package"
				>
					{{ item.version }}
				</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card shadow="hover">
			<template #header> 开发依赖 </template>
			<el-descriptions border>
				<el-descriptions-item
					v-for="item in packages.devDependencies"
					:key="item.package"
					:label="item.package"
				>
					{{ item.version }}
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<style lang="scss" scoped>
.about-workspace {
	.el-card {
		border: unset;
		--el-card-padding: var(--theme-padding);
		margin-bottom: var(--theme-margin);
	}
}
</style>
