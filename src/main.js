import { createApp } from 'vue'
import App from './layouts/App.vue'
import './assets/global.css';
import axios from 'axios';
import router from './router';

if (process.env.NODE_ENV === 'development') {
    // This is a hack to get around CORS issues in development
    // It will not be needed in production
    axios.defaults.baseURL = 'http://localhost:3300';
}

const app = createApp(App);
app.use(router);
app.mount('#app');
