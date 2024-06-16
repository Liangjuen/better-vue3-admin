import {
	AxiosResponse,
	AxiosRequestConfig,
	InternalAxiosRequestConfig
} from 'axios'

export declare namespace CustomRequest {
	/**
	 * @description 基础配置
	 */
	interface BaseConfig {
		baseURL: string
		timeout: number
		nprogress: boolean
	}

	/**
	 * @description 拦截器格式
	 */
	interface Interceptors {
		// 请求拦截
		requestInterceptors?: (
			config: InternalAxiosRequestConfig
		) => InternalAxiosRequestConfig
		requestInterceptorsCatch?: (err: any) => any
		// 响应拦截
		responseInterceptors?: <T = AxiosResponse>(config: T) => T
		responseInterceptorsCatch?: (err: any) => any
	}

	/**
	 * @description 配置
	 */
	interface Config<D = any> extends AxiosRequestConfig<D> {
		interceptors?: Interceptors
	}
}
