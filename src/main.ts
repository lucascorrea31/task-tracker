import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import baseRouter from './routers'
import { key, store } from './store'

createApp(App)
  .use(baseRouter)
  .use(store, key)
  .mount('#app')
