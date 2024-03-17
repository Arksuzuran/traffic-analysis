import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Particles from "vue3-particles"      // 粒子效果库
import * as echarts from 'echarts';
import '@/style/index.scss'                   // 全局样式设置

const app = createApp(App)

app.use(Particles)
app.use(router)
app.use(Particles)
app.mount('#app')
app.config.globalProperties.$echarts = echarts

// 设置高德地图安全密钥
window._AMapSecurityConfig = {
    securityJsCode: '785adb1c1e29dedc0e12cb22edbe9666',
}
