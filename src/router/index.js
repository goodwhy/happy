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
        { name:'scence',path:'/scence',component:()=>import('@/compontents/Map/ScenceMap.vue')},
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
        {
          name: 'advance3',
          path: '/advance3',
          component: () => import('@/compontents/Advance/LayoutAdvance3.vue'),
        },
        { name: 'personal', path: '/personal', component: () => import('@/compontents/user/LayoutUser.vue') },
      ],
    },
    { name: 'login', path: '/login', component: () => import('@/compontents/Login.vue') },
  ],
})

// router.beforeEach((to, from) => {
//   if (!localStorage.getItem('token') && to.path !== '/login') {
//     return router.path('/login')
//   }
//   else {
//     return true
//   }
// }) 添加路由守卫


export default router
