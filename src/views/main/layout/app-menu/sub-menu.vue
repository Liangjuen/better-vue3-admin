<template>
	<template v-for="item in list" :key="item.name + item.path">
		<el-menu-item
			v-if="item.type == 2"
			:index="item.path"
			@click="(row) => handleMenuItemCllick(row, item)"
		>
			<el-icon>
				<svg-icon :icon="item.icon" />
			</el-icon>
			<span>{{ item.name }}</span>
		</el-menu-item>

		<el-sub-menu
			v-if="item.type == 1"
			:index="item.path ? item.path : item.name"
			:key="item.name"
		>
			<template #title>
				<el-icon>
					<svg-icon :icon="item.icon"></svg-icon>
				</el-icon>
				<span>{{ item.name }}</span>
			</template>
			<sub-menu :list="item.children || []"></sub-menu>
		</el-sub-menu>
	</template>
</template>

<script setup lang="ts">
import { useBetter } from '~/hooks'
defineProps<{ list: Array<any> }>()

defineOptions({
	name: 'sub-menu'
})

const { router } = useBetter()

function handleMenuItemCllick(menu: any, item: Menu.Item) {
	if (item.link) {
		window.open(item.link)
	} else {
		router.push(menu.index)
	}
}
</script>
