import path from 'node:path'
import { defineConfig, UserConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import VitePluginCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'

function resolve(dir: string) {
	return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
	return {
		plugins: [
			vue(),
			// 组件自动引入配置
			/**
			 * doc: https://github.com/unplugin/unplugin-auto-import#readme
			 */
			AutoImport({
				resolvers: [ElementPlusResolver()],
				// 指定自动导入的 组合式API(普通函数、hook、函数式组件等)目录
				dirs: ['src/components/composable'],
				dts: './typings/auto-imports.d.ts'
			}),
			/**
			 * doc: https://github.com/unplugin/unplugin-vue-components#readme
			 */
			Components({
				resolvers: [ElementPlusResolver()],
				// 自定义组件导入路径
				dirs: ['src/components/common'],
				directoryAsNamespace: true,
				dts: './typings/components.d.ts'
			}),
			/**
			 * doc: https://github.com/anncwb/vite-plugin-svg-icons/tree/master/#readme
			 */
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
			 * doc: https://github.com/btd/rollup-plugin-visualizer
			 */
			visualizer({ open: true }),
			/**
			 * doc: https://github.com/anncwb/vite-plugin-compression/tree/master/#readme
			 */
			VitePluginCompression({
				verbose: true, // 是否在控制台中输出压缩结果
				disable: false,
				threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
				algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
				ext: '.gz',
				deleteOriginFile: false // 源文件压缩后是否删除
			})
		],
		resolve: {
			// 别名
			alias: {
				'-': resolve(''),
				'~': resolve('src')
			}
		},
		build: {
			rollupOptions: {
				output: {
					chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
					entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
					assetFileNames: '[ext]/[name]-[hash].[ext]' // 资源文件像 字体，图片等
				}
			}
		}
	}
})
