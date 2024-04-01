import { Home } from '../../views';
export default [
  {
    path: '/app2/page1',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/app2/page2',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]