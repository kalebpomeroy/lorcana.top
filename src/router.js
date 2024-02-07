// src/router/index.js

import SearchPage from './pages/SearchPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Search',
        component: SearchPage,
    },
    {
        path: '/articles/:slug',
        name: 'Article',
        component: ArticlePage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;