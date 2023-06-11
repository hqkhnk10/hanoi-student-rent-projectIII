import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('../layout/layout-view.vue'),
      children: [
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
    },
    { path: '/', redirect: '/homepage' },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/components/pages/login/login-view.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/admin/Layout/AdminLayout.vue'),
      children: [
        {
          path: '/users',
          name: 'Users',
          component: () => import('../views/admin/views/TableUsers.vue')
        },
        {
          path: '/approve',
          name: 'Approve',
          component: () => import('../views/admin/views/TableApprove.vue')
        },
        {
          path: '/property',
          name: 'Property',
          component: () => import('../views/admin/views/TableProperty.vue')
        },
        {
          path: '/project',
          name: 'Project',
          component: () => import('../views/admin/views/TableProject.vue')
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('../views/admin/views/AdminDashboard.vue')
        }
      ]
    }
  ]
})

export default router
