/**
 * 转换可选
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 将字符串文字类型的第一个字符转换为小写
 */
export type Kebab<S extends string> =
	S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`
