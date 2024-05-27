import { createVNode, render } from 'vue'
import { ContextMenuProps } from './type'
import ContextMenuConstructor from './context-menu.vue'

/**
 * 上下文菜单
 *
 * 可以创建多个菜单对象，但是一般全局只有一个 `contextmenu`
 */
export class ContextMenu {
	/**
	 * @description 当前菜单节点
	 */
	contextMenuBox: HTMLDivElement | null = null

	/**
	 * @description 创建右键菜单元素
	 * @param options
	 * @param coords
	 */
	createContextMenu(
		options: ContextMenuProps,
		coords: { x: number; y: number }
	) {
		const props = { ...options }
		// 创建容器
		const container = document.createElement('div')

		// 设置类名
		container.setAttribute('class', 'b-context-menu')

		// 创建虚拟dom
		const vnode = createVNode(ContextMenuConstructor, props)

		// 渲染
		render(vnode, container)

		this.contextMenuBox = container

		// 挂载
		document.body.appendChild(this.contextMenuBox)

		// 获取菜单内容宽高
		const hright = this.contextMenuBox.firstElementChild
			?.clientHeight as number
		const width = this.contextMenuBox.firstElementChild
			?.clientWidth as number

		// 获取视口宽高
		const vw = window.innerWidth
		const vh = window.innerHeight

		// 将菜单定位在视口内
		coords.x = vw - coords.x > width ? coords.x : vw - (width + 6)
		coords.y = vh - coords.y > hright ? coords.y : vh - (hright + 6)
		this.contextMenuBox.style.setProperty('left', `${coords.x}px`)
		this.contextMenuBox.style.setProperty('top', `${coords.y}px`)
	}

	/**
	 * @description 销毁上下文菜单
	 */
	destroy = (event?: PointerEvent | MouseEvent, done?: boolean) => {
		// 判断是否点击菜单内
		if (event && this.contextMenuBox?.contains(event.target as Node)) {
			// 没有完成就不销毁菜单
			if (!done) return
		}

		// 销毁逻辑
		if (this.contextMenuBox && this.contextMenuBox !== null) {
			document.body.removeChild(this.contextMenuBox)
			window.removeEventListener('contextmenu', this.destroy)
			window.removeEventListener('click', this.destroy)
			this.contextMenuBox = null
		}
	}

	/**
	 * @description 创建右键菜单及右键点击事件监听
	 * @param event 右击事件对象
	 * @param options 配置项
	 */
	create = (event: PointerEvent | MouseEvent, options: ContextMenuProps) => {
		// 关闭之前打开的菜单
		this.destroy()
		// 阻止冒泡及默认事件
		event.preventDefault()
		event.stopPropagation()

		// 创建菜单
		this.createContextMenu(options, { x: event.clientX, y: event.clientY })

		// 监听
		window.addEventListener('click', this.destroy, true)
		window.addEventListener('contextmenu', this.destroy, true)
	}
}

export const contextMenu = new ContextMenu()
