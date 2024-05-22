import path from 'node:path'
import { defineConfig, loadEnv, UserConfig, ConfigEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'

function resolve(dir: string) {
	return path.resolve(__dirname, 'src', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	return {
		plugins: [
			vue(),
			// Element-plus 组件自动引入配置
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
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
			})
		],
		resolve: {
			// 别名
			alias: {
				'~': resolve(''),
				'@config': resolve('config'),
				'@network': resolve('network'),
				'@modules': resolve('modules'),
				'@router': resolve('router'),
				'@views': resolve('views')
			}
		}
	}
})
