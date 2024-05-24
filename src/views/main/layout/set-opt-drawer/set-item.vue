<template>
	<div class="set-item">
		<div class="label">{{ label }}</div>
		<div class="item">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string
}>()
</script>

<style scoped lang="scss">
.set-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 48px;
	margin-bottom: 12px;
	line-height: 48px;

	.label {
		font-size: 14px;
		flex: 1;
		margin-right: 10px;
	}

	.item {
		max-width: 160px;
	}
}
</style>
