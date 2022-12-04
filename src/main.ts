import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import drag from "v-drag"

const app = createApp(App)

app.use(drag)

app.mount('#app')
