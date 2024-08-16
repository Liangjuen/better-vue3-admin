<script lang="ts" setup>
import DictTypeList from './components/dict-type-list.vue'
</script>

<template>
	<b-view-group
		class="padding-theme"
		left-view-title="字典类型"
		right-view-titel="字典列表"
	>
		<template #left><dict-type-list /></template>
	</b-view-group>
</template>
