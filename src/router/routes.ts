import { createRouter, createWebHistory } from 'vue-router';
import { LOGIN_PAGE_PATH, HOME_PAGE_PATH } from '@src/utils/constants';

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: LOGIN_PAGE_PATH, 
    component: () => import('../views/login/Login.vue')
  }, {
    path: HOME_PAGE_PATH, 
    component: () => import('../views/home/Home.vue'),
    meta: {
      requiresAuth: true
    }
  }]
})