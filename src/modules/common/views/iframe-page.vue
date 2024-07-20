<script setup lang="ts">
import { onActivated, onMounted } from 'vue'

interface Props {
	url: string
}

defineProps<Props>()

onMounted(() => {
	console.log('mounted')
})

onActivated(() => {
	console.log('activated')
})
</script>

<template>
	<iframe id="iframePage" :src="url"></iframe>
</template>

<style scoped>
#iframePage {
	display: block;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border: none;
}
</style>
