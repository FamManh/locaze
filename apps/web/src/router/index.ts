import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '../views/404.vue';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: NotFound,
    },
  ],
});

export default router;
