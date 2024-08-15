import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './assets/main.css'
import './router/axiosConfig.js'
import VueTheMask from 'vue-the-mask'
import store from './store/index.js'

import DashboardLayout from './layout/DashboardLayout.vue'
import EmptyLayout from './layout/EmptyLayout.vue'

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(router)
app.use(VueTheMask)
app.use(store)
app.mount('#app')
