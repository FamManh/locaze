import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import NotFound from '../views/404.vue';

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
