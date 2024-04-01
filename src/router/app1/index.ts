import { Home } from '../../views';
export default [
  {
    path: '/app1/page1',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/app1/page2',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]