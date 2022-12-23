import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const drag = require("v-drag")

const app = createApp(App)

app.use(drag)

app.mount('#app')
