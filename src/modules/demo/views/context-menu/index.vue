<template>
	<div class="content-wrap padding-theme">
		<div class="context-demo-item" @contextmenu="(e) => openCm(e)">
			简约
		</div>

		<div class="context-demo-item" @contextmenu="(e) => openCm1(e)">
			带图标
		</div>

		<div class="context-demo-item" @contextmenu="(e) => openCm2(e)">
			<span>传入组件</span>
			<div>(不建议传入带复杂业务的组件)</div>
		</div>

		<div class="context-demo-item" @contextmenu="(e) => openCm3(e)">
			禁用/隐藏
		</div>

		<div class="context-demo-item" @contextmenu="(e) => openCm4(e)">
			<span class="mb-8">嵌套</span>
			<div class="demo-sub-item" @contextmenu="(e) => openCm(e)">
				简约
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Theme } from '~/components/common'

defineOptions({
	name: 'component-prev-context-menu'
})

const openCm = (e: MouseEvent | MouseEvent) => {
	BContextMenu.create(e, {
		list: [
			{
				context: '选项一',
				callback: () => {}
			}
		],
		width: 100
	})
}

const openCm1 = (e: MouseEvent | MouseEvent) => {
	BContextMenu.create(e, {
		list: [
			{
				context: '任务清单一',
				icon: 'bell-alert',
				callback: (done) => {
					done()
				}
			}
		]
	})
}

const openCm2 = (e: MouseEvent | MouseEvent) => {
	BContextMenu.create(e, {
		list: [
			{
				context: Theme
			}
		]
	})
}

const openCm3 = (e: MouseEvent | MouseEvent) => {
	BContextMenu.create(e, {
		list: [
			{
				context: '任务清单一',
				disabled: true,
				callback: (done) => {
					done()
				}
			},
			{
				context: '任务清单二',
				callback: (done) => {
					done()
				}
			},
			{
				context: '任务清单三',
				hidden: true,
				callback: (done) => {
					done()
				}
			},
			{
				context: '任务清单四溢出部分会被隐藏',
				ellipsis: true,
				callback: (done) => {
					done()
				}
			}
		]
	})
}

const openCm4 = (e: MouseEvent | MouseEvent) => {
	BContextMenu.create(e, {
		list: [
			{
				context: '测试1',
				children: [
					{
						context: 'sub1'
					}
				]
			},
			{
				context: '测试2',
				children: [
					{
						context: 'sub2',
						children: [
							{
								context: 'sub2',
								children: [
									{
										context: 'sub2',
										children: [
											{
												context: 'sub2'
											},
											{
												context: 'sub2'
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	})
}
</script>

<style lang="scss" scoped>
.context-demo-item,
.demo-sub-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 2px dashed var(--el-border-color);
	border-radius: var(--theme-border-radius);
}
.context-demo-item {
	width: 280px;
	height: 210px;
	margin: 0 var(--theme-margin) var(--theme-margin) 0;
	background-color: var(--el-bg-color);
}
.demo-sub-item {
	width: 120px;
	height: 120px;
}
.content-wrap {
	display: flex;
	flex-wrap: wrap;
}
</style>
