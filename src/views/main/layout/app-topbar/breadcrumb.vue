<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useGlobal } from '~/views'

const route = useRoute()

const { menuStore } = useGlobal()
// 数据列表
const list = computed(() => {
	function findParent(item: Menu.Item): Menu.List {
		const p = menuStore.list.find((i) => i.id == item.pid)
		if (!p?.pid) return p ? [p] : []
		return [...findParent(p), p]
	}

	function find() {
		if (route.path === '/') {
			return []
		}

		const current = menuStore.list.find((i) => i.path == route.path)
		let parents = []
		if (current) {
			parents = findParent(current)
			return [...parents, current]
		} else {
			return []
		}
	}

	return find()
})
</script>

<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<el-breadcrumb-item v-for="item in list" :key="item.path as string">
			{{ item.name }}
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>
