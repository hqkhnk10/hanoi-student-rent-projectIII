import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('../layout/layout-view.vue')
    },
    {
      path: '/homepage',
      name: 'Homepage',
      component: () => import('../views/components/pages/homepage-view.vue')
    },
    {
      path: '/houses',
      name: 'Houses',
      component: () => import('../views/components/pages/all-houses.vue')
    },
    {
      path: '/googlemap',
      name: 'GoogleMap',
      component: () => import('../components/GoogleMap.vue')
    }
  ]
})

export default router
