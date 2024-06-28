import { AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

/**
 * @description 处理接口(正常/异常)
 * @param res AxiosResponse
 * @returns
 */
export async function handleGeneral<T extends API.Response>(
	res: AxiosResponse<T>
) {
	const { message, code } = res.data
	switch (code) {
		case 1:
			return res.data
		case 0:
			ElMessage.error(message)

			// ...
			return Promise.reject({ message, code })
	}
}

/**
 * @description 处理 HTTP 请求异常
 * @param err AxiosError
 * @returns
 */
export async function handleNetworkException<T extends API.Exception>(
	err: AxiosError<T>
) {
	const { response } = err
	console.log(err)
	if (!response) {
		ElMessage.error('网络错误')
	} else {
		ElMessage.error(`[${response?.status}]
		${
			response?.data.detail.message ||
			response?.data.message ||
			response?.statusText
		}`)
	}

	// ...
	return Promise.reject(response)
}
