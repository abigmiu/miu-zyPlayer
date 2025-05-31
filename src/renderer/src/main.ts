import 'modern-normalize/modern-normalize.css'
import './assets/main.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
