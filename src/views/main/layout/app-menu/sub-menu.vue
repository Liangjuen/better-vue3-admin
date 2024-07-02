<template>
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
		v-else
		:index="item.path ? item.path : item.name"
		:key="item.name"
	>
		<template #title>
			<el-icon>
				<svg-icon :icon="item.icon"></svg-icon>
			</el-icon>
			<span>{{ item.name }}</span>
		</template>

		<sub-menu
			v-for="subItem in item.children"
			:key="subItem.path + subItem.name"
			:item="subItem"
		>
		</sub-menu>
	</el-sub-menu>
</template>

<script setup lang="ts">
import { useBetter } from '~/hooks'
defineProps<{ item: Menu.Item }>()

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
