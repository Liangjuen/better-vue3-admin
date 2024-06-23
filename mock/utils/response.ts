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
	fail<T>(data: T) {
		return {
			data,
			code: 0,
			message: '操作失败!'
		}
	}

	/**
	 * @description 模拟操作无法执行返回结果
	 * @returns
	 */
	unenforceable(message = '模拟状态暂不支持该操作') {
		return {
			data: null,
			code: 1,
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
			code: 1,
			message,
			data
		}
	}
}

/**
 * mock 数据响应
 */
export const mockResponse = new MockResponse()
