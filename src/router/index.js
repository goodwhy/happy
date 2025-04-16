import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/compontents/Layout.vue'),
      redirect: '/map',
      children: [
        { name: 'map', path: '/map', component: () => import('@/compontents/Map/LayputMap.vue') },
        {
          name: 'advance1',
          path: '/advance1',
          component: () => import('@/compontents/Advance/LayoutAdvance1.vue'),
        },
        {
          name: 'advance2',
          path: '/advance2',
          component: () => import('@/compontents/Advance/LayoutAdvance2.vue'),
        },
      ],
    },
    { name: 'login', path: '/login', component: () => import('@/compontents/Login.vue') },
  ],
})

export default router
