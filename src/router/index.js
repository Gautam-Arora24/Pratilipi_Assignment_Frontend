import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../views/SignUp.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* Redirect logic to redirect the user if the user_id is not present in the localStorage and vice-versa */
router.beforeEach(async (to) => {
  if (
    !localStorage.getItem('user_id')
    // ❗️ Avoid an infinite redirect
    && to.name === 'dashboard'
  ) {
    // redirect the user to the Signup page
    return { name: 'signup' };
  }
  if (
    localStorage.getItem('user_id') && to.name === 'signup'
  ) {
    return { name: 'dashboard' };
  }
});

export default router;
