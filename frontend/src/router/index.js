
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth) {
    next('/');
  } else {
    next();
  }
});
export default router