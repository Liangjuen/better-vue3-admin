<script lang="ts" setup>
defineOptions({
	name: 'app-backtop'
})

defineProps<{
	target: string
}>()
</script>

<template>
	<el-backtop :target="target" :right="44" :bottom="70">
		<div class="app-backtop-content">
			<svg-icon icon="arrow-up" :size="24" />
		</div>
	</el-backtop>
</template>

<style lang="scss" scoped>
.app-backtop-content {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	&:hover {
		color: var(--el-color-primary);
	}
}
</style>
