import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { VueComposableDevtools } from 'vue-composable'

createApp(App)
    .use(router)
    .use(VueComposableDevtools)
    .mount('#app')
