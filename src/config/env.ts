export const envConfig = {
	// 服务
	host: import.meta.env['VITE_SERVICE_BASE_RUL'],

	// 请求根路径
	baseURL: import.meta.env['VITE_SERVICE_PREFIX']
}
