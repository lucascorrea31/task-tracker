import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import baseRouter from './routers'

createApp(App)
  .use(baseRouter)
  .mount('#app')
