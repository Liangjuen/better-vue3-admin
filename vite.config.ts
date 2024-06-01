import path from 'node:path'
import { defineConfig, UserConfig, ConfigEnv, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

function resolve(dir: string) {
	return path.resolve(__dirname, 'src', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		plugins: [
			vue(),
			// 组件自动引入配置
			/**
			 * 参考文档: https://github.com/unplugin/unplugin-auto-import#readme
			 */
			AutoImport({
				resolvers: [ElementPlusResolver()],
				// 指定自动导入的 组合式API(普通函数、hook、函数式组件等)目录
				dirs: ['src/components/composable']
			}),
			/**
			 * 参考文档: https://github.com/unplugin/unplugin-vue-components#readme
			 */
			Components({
				resolvers: [ElementPlusResolver()],
				// 自定义组件导入路径
				dirs: ['src/components/common'],
				directoryAsNamespace: true
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
				svgoOptions: {
					// 移除svg默认颜色
					plugins: [
						{
							name: 'removeAttrs',
							params: {
								attrs: [
									'stroke-width',
									'class',
									'fill',
									'stroke'
								]
							}
						}
					]
				}
			}),
			/**
			 * 请求数据模拟
			 * 参考文档: https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
			 */
			viteMockServe({
				mockPath: 'mock', // 目录位置
				enable: !!env['MOCK'] // 是否启用 mock 功能(关闭后将不会拦截请求)
			})
		],
		resolve: {
			// 别名
			alias: {
				'~': resolve('')
			}
		}
	}
})
