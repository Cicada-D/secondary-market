import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/home/index.vue'),
      redirect: '/index/home', 
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../pages/home/content/contentOne.vue')
        },
        {
          path: 'type',
          name: 'type',
          component: () => import('../pages/home/content/contentTwo.vue')
        }
      ]
    },
    
  ]
})

export default router
