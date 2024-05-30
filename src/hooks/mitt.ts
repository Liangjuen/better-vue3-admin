import Mitt from 'mitt'

const mitt = Mitt<any>()

export function useMitt() {
	return mitt
}
