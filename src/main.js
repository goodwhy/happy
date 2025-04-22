import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@arcgis/core/assets/esri/themes/dark/main.css'
import 'element-plus/dist/index.css' // 必须引入的核心样式

import App from './App.vue'
import router from './router'
import '@arcgis/core/assets/esri/themes/dark/main.css';
import '@arcgis/core/assets/esri/themes/light/main.css';




const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)


app.mount('#app')
