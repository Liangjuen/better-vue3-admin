import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import NProgress from 'nprogress'

import { config } from '~/config'
import { handleGeneral, handleNetworkException } from './helper'

import { CustomRequest } from './type'

export class Request {
	// axios 实例
	readonly engine: AxiosInstance

	// 基础配置
	readonly BaseConfig: CustomRequest.BaseConfig = {
		baseURL: config.host + config.baseURL,
		timeout: config.network.timeout,
		nprogress: true
	}

	// 拦截器对象
	private interceptors?: CustomRequest.Interceptors

	// progress
	protected nprogress = NProgress.configure(config.network.nprogress)

	constructor(customConfig: CustomRequest.Config) {
		this.engine = Axios.create(Object.assign(this.BaseConfig, customConfig))

		this.interceptors = customConfig.interceptors

		// 全局请求拦截
		this.engine.interceptors.request.use(
			(req: any) => {
				// 请求前的处理在这里

				this.useNprogress(req)

				// ...

				return req
			},
			(err: any) => err
		)

		// 使用实例拦截器
		this.engine.interceptors.request.use(
			this.interceptors?.requestInterceptors,
			this.interceptors?.requestInterceptorsCatch
		)

		this.engine.interceptors.response.use(
			this.interceptors?.responseInterceptors,
			this.interceptors?.responseInterceptorsCatch
		)

		// 全局响应拦截
		this.engine.interceptors.response.use(
			(res: AxiosResponse) => {
				this.nprogress.done()

				return handleGeneral(res)
			},
			(err: any) => {
				this.nprogress.done()

				return handleNetworkException(err)
			}
		)
	}

	get<T extends API.Response>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.engine.get(url, config)
	}

	post<T, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<API.Response<T>> {
		return this.engine.post(url, data, config)
	}

	put<T, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<API.Response<T>> {
		return this.engine.put(url, data, config)
	}

	patch<T, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<API.Response<T>> {
		return this.engine.patch(url, data, config)
	}

	delete(url: string, config?: AxiosRequestConfig) {
		return this.engine.delete(url, config)
	}

	/**
	 * @description 使用 nprogress
	 * @param req
	 */
	private useNprogress(req: any) {
		if (req.url) {
			if (
				!config.ignore.NProgress.some((e) =>
					req.url.match(new RegExp(`${e}.*`))
				) &&
				(req.nprogress ?? true)
			) {
				this.nprogress.start()
			}
		}
	}
}

export const request = new Request({})
