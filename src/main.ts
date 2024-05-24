import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/style/index.scss'
// 单独引入组件样式 解决 ElMessage 组件样式错乱的问题
import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'nprogress/nprogress.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

import { router } from '~/router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(router)

app.use(pinia)

app.mount('#app')
