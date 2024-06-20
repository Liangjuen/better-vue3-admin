class MockResponse {
	/**
	 * @description 操作成功
	 * @param data
	 * @returns
	 */
	ok<T>(data: T) {
		return {
			data,
			code: 1,
			message: '操作成功!'
		}
	}

	/**
	 * @description 操作失败
	 * @param data
	 * @returns
	 */
	fail<T>(data: T): API.Response<T> {
		return {
			data,
			code: API.ResultCode.FAILED,
			message: '操作失败!'
		}
	}

	/**
	 * @description 模拟操作无法执行返回结果
	 * @returns
	 */
	unenforceable(message = '模拟状态暂不支持该操作'): API.Response {
		return {
			data: null,
			code: API.ResultCode.FAILED,
			message
		}
	}

	/**
	 * @description 分页查询结果
	 * @param data
	 * @param message
	 * @returns
	 */
	paginat<T>(
		data: API.PaginateResponse<T>,
		message = 'ok'
	): API.Response<API.PaginateResponse<T>> {
		return {
			code: API.ResultCode.SUCCESS,
			message,
			data
		}
	}
}

/**
 * mock 数据响应
 */
export const mockResponse = new MockResponse()
