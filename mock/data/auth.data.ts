import { generateHash } from '../utils'

export const access = {
	expiration: 120960,
	token: generateHash()
}
