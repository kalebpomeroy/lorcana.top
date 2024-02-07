import { createApp } from 'vue'
import App from './layouts/App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from './pages/SearchPage.vue' 
import ArticlesPage from './pages/ArticlesPage.vue' 
import ArticlePage from './pages/ArticlePage.vue' 
import './assets/global.css';
import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    // This is a hack to get around CORS issues in development
    // It will not be needed in production
    axios.defaults.baseURL = 'http://localhost:3300';
}


const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Define your routes here
    { path: '/', component: SearchPage },
    { path: '/articles', component: ArticlesPage },
    { path: '/articles/:slug', component: ArticlePage },
    // Add more routes as needed
  ]
})

app.use(router)
app.mount('#app')