import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'
import MainContent from './components/MainContent.vue'
import LogIn from './components/LogIn.vue'

const routes = [
  { path: '/', component: LogIn },
  { path: '/maincontent', component: MainContent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
