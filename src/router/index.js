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
    path: '/admin/',
    component: AdminLayout,
    children: [
      { path: '', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'dashboard', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'post', component: () => import('../views/admin/post/List.vue') },
      { path: 'musing', component: () => import('../views/admin/musing/List.vue') },
      { path: 'event', component: () => import('../views/admin/event/List.vue') },
      { path: 'icare', component: () => import('../views/admin/icare/List.vue') },
      { path: 'congregation', component: () => import('../views/admin/congregation/List.vue') },
      { path: 'dedication', component: () => import('../views/admin/dedication/List.vue') },
      { path: 'baptism', component: () => import('../views/admin/baptism/List.vue') },
      { path: 'wedding', component: () => import('../views/admin/wedding/List.vue') },
      { path: 'category', component: () => import('../views/admin/category/List.vue') },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
