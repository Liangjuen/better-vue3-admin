import type { Directive, DirectiveBinding } from 'vue'

export type LazyDirBinding = string

export const lazy: Directive<HTMLImageElement, LazyDirBinding> = async (
	el: HTMLImageElement,
	binding: DirectiveBinding<LazyDirBinding>
) => {
	const observer = new IntersectionObserver((entry) => {
		if (entry[0].intersectionRatio > 0) {
			el.src = binding.value
			observer.unobserve(el)
		} else {
			el.src = 'https://fakeimg.pl/500x200/?text=. . .'
		}
	})
	observer.observe(el)
}
