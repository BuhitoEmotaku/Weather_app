import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NextHoursView from '../views/NextHoursView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: NextHoursView,
    props: true, 
    
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // Define the catch-all route at the end
  {
    path: '/:catchAll(.*)', // Matches any path
    redirect: '/', // Redirect to the home route
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
