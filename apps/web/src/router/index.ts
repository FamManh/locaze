import { createRouter, createWebHistory } from 'vue-router';

import {
  APPS_ROUTE,
  AVAILABILITY_ROUTE,
  BOOKINGS_ROUTE,
  EVENTS_TYPES_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  SETTINGS_ROUTE,
  SIGN_UP_ROUTE,
} from '../constants/router';
import NotFound from '../views/404.vue';
import Apps from '../views/Apps.vue';
import Availability from '../views/Availability.vue';
import Bookings from '../views/Bookings.vue';
import EventTypes from '../views/EventTypes.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Settings from '../views/Settings.vue';
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
      path: EVENTS_TYPES_ROUTE,
      name: 'event-types',
      component: EventTypes,
    },
    {
      path: BOOKINGS_ROUTE,
      name: 'bookings',
      component: Bookings,
    },
    {
      path: AVAILABILITY_ROUTE,
      name: 'availability',
      component: Availability,
    },
    {
      path: APPS_ROUTE,
      name: 'apps',
      component: Apps,
    },
    {
      path: SETTINGS_ROUTE,
      name: 'settings',
      component: Settings,
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
