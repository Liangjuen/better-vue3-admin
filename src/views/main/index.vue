<template>
	<div>{{ appStore.color }}</div>
</template>

<script setup lang="ts">
import { useMainStores } from './stores'
const { appStore } = useMainStores()
console.log(appStore)
</script>
