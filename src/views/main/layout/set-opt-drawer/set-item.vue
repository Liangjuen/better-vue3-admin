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
	min-height: 36px;
	margin-bottom: var(--theme-margin);
	line-height: 36px;

	.label {
		font-size: 14px;
		flex: 1;
		margin-right: var(--theme-margin);
	}

	.item {
		max-width: 160px;
	}
}
</style>
