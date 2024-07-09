import type { Directive, DirectiveBinding } from 'vue'
import { usePermission } from '~/hooks/business'

const removeEl = (el: any) => {
	// 在绑定元素上存储父级元素
	el._parentNode = el.parentNode
	// 在绑定元素上存储一个注释节点
	el._placeholderNode = document.createComment('permission')
	// 使用注释节点来占位
	el.parentNode?.replaceChild(el._placeholderNode, el)
}

const addEl = (el: any) => {
	// 替换掉给自己占位的注释节点
	el._parentNode?.replaceChild(el, el._placeholderNode)
}

export type PermissionDirBinding = string | string[]

/**
 *  `v-permission` directive
 */
export const permission: Directive<HTMLElement, PermissionDirBinding> = {
	mounted(el: HTMLElement, binding: DirectiveBinding<PermissionDirBinding>) {
		const { hasPermission } = usePermission()
		if (!hasPermission(binding.value)) {
			removeEl(el)
		}
	},
	updated(el: HTMLElement, binding: DirectiveBinding<PermissionDirBinding>) {
		const { hasPermission } = usePermission()
		if (!hasPermission(binding.value)) {
			removeEl(el)
		} else {
			if (el.parentNode) return
			addEl(el)
		}
	}
}
