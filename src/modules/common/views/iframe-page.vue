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
	<iframe id="iframePage" class="size-full" :src="url"></iframe>
</template>

<style scoped>
#iframePage {
	width: 100%;
	height: 100%;
	border: unset;
}
</style>
