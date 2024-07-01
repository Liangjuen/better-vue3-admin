<script lang="ts" setup>
import { computed, ref, nextTick, watch } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { CountToProps } from './type'

const formatValue = (num: number): string => {
	const { decimals, decimal, separator, suffix, prefix } = props

	let number = num.toFixed(decimals)

	number = String(number)

	const x = number.split('.')
	let x1 = x[0]
	const x2 = x.length > 1 ? decimal + x[1] : ''
	const rgx = /(\d+)(\d{3})/
	if (separator) {
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, `$1${separator}$2`)
		}
	}

	return prefix + x1 + x2 + suffix
}

const props = withDefaults(defineProps<CountToProps>(), {
	startValue: 0,
	endValue: 2024,
	duration: 1500,
	autoplay: true,
	decimals: 0,
	prefix: '',
	suffix: '',
	separator: ',',
	decimal: '.',
	easing: true,
	transition: 'linear'
})

const source = ref(props.startValue)

const transition = computed(() =>
	props.easing ? TransitionPresets[props.transition] : undefined
)

const output = useTransition(source, {
	disabled: false,
	duration: props.duration,
	transition: transition.value
})

const value = computed(() =>
	props.format ? props.format(output.value) : formatValue(output.value)
)

async function start() {
	await nextTick()
	source.value = props.endValue
}

watch(
	[() => props.startValue, () => props.endValue],
	() => {
		if (props.autoplay) {
			start()
		}
	},
	{ immediate: true }
)
</script>

<template>
	<span>{{ value }}</span>
</template>
