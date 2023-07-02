import { createRouter, createWebHistory } from 'vue-router';

import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  SIGN_UP_ROUTE,
} from '../constants/router';
import NotFound from '../views/404.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: HOME_ROUTE,
      name: 'home',
      component: Home,
    },
    {
      path: LOGIN_ROUTE,
      name: 'login',
      component: Login,
    },
    {
      path: SIGN_UP_ROUTE,
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: NOT_FOUND_ROUTE,
      name: '404',
      component: NotFound,
    },
  ],
});

export default router;
