<script lang="ts" setup>
import DictTypeList from './components/dict-type-list.vue'

import { RefreshParams } from './components/dict-type-list.vue'

function handleRefresh(item: RefreshParams) {
	console.log(item)
}
</script>

<template>
	<b-view-group
		class="padding-theme"
		left-view-title="字典类型"
		right-view-titel="字典列表"
		:view-left-width="420"
	>
		<template #left><dict-type-list @refresh="handleRefresh" /></template>
	</b-view-group>
</template>
