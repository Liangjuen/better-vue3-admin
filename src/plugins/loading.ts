import '~/assets/style/loading.scss'

export function loading() {
	const target = document.getElementById('app')

	const loader = `<div class="loading" ><div class="loader" ></div></div>`

	if (target) {
		target.innerHTML = loader
	}
}
