<template>
	<el-dialog
		class="b-dialog"
		v-bind="props"
		:show-close="false"
		:close-on-click-modal="false"
		:fullscreen="fullscreen"
		draggable
		append-to-body
	>
		<template #header>
			<div class="b-dialog__header">
				<slot name="header">
					<div class="b-dialog__title">
						{{ props.title ? props.title : '标题' }}
					</div>
				</slot>
				<div class="b-dialog__controls">
					<button
						v-show="!hiddenFullscreenBtn"
						:class="{
							fullscreen: !fullscreen,
							'fullscreen-exit': fullscreen
						}"
						@click="fullscreen = !fullscreen"
					>
						<svg-icon
							:icon="
								fullscreen ? 'fullscreen-exit' : 'fullscreen'
							"
							:size="18"
						/>
					</button>
					<button
						class="close"
						@click="emits('update:modelValue', false)"
					>
						<svg-icon icon="x" :size="18" />
					</button>
				</div>
			</div>
		</template>

		<el-scrollbar>
			<div class="b-dialog__default">
				<slot></slot>
			</div>
		</el-scrollbar>

		<template #footer>
			<div class="b-dialog__footer">
				<slot name="footer"> </slot>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { dialogProps, dialogEmits } from 'element-plus'

const { width } = useWindowSize()
const fullscreen = ref(false)
const hiddenFullscreenBtn = ref(false)
const props = defineProps(dialogProps)

const emits = defineEmits(dialogEmits)

watch(
	() => width.value,
	(val) => {
		fullscreen.value = !!(val <= 768)
		hiddenFullscreenBtn.value = !!(val <= 768)
	},
	{
		immediate: true
	}
)

defineOptions({
	name: 'b-dialog'
})
</script>

<style lang="scss">
.b-dialog {
	display: flex;
	flex-direction: column;
	border-radius: var(--el-border-radius-base);
	padding: 0;
	.el-dialog__header {
		padding: 0;
		margin-right: 0;
	}
	.b-dialog__header {
		position: relative;
		padding: var(--theme-padding);
		border-bottom: 1px solid var(--el-border-color-extra-light);
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		.b-dialog__title {
			display: block;
			font-size: 15px;
			letter-spacing: 0.5px;
		}
		.b-dialog__controls {
			display: flex;
			justify-content: flex-end;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 9;
			width: 100%;
			.fullscreen,
			.fullscreen-exit,
			.close {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 40px;
				width: 40px;
				border: 0;
				background-color: #0000;
				cursor: pointer;
				outline: none;
			}
		}
	}

	.el-dialog__body {
		padding: 0;
		box-sizing: border-box;
		flex: 1;
		overflow: hidden;
		.b-dialog__default {
			padding: var(--theme-padding);
		}
	}

	.el-dialog__footer {
		padding: 0;
	}

	.b-dialog__footer {
		padding: var(--theme-padding);
	}

	&.is-fullscreen {
		height: 100vh !important;
		border-radius: 0;
		overflow: hidden;
	}
}
</style>
