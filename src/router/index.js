import Vue from 'vue'
import VueRouter from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: 'home',
        component: () => import('../views/Home.vue')
      }
    ]
  },


  // 
  // ADMIN
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '/',
        component: () => import('../views/admin/Dashboard.vue')
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
