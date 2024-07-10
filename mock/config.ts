/**
 * mock 配置
 */
export const config = {
	/**
	 * 前缀
	 */
	prefix: import.meta.env['VITE_SERVICE_PREFIX'],
	/**
	 * 超时
	 */
	delay: '20-500',
	/**
	 * 请求基础路径
	 */
	baseUrl: import.meta.env['VITE_SERVICE_BASE_RUL']
}
