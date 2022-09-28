import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginView")
  },
  {
    path: '/frisbee',
    name: 'frisbee',
    component: () => import("@/views/FrisbeeView")
  },
  {
    path: '/process',
    name: 'process',
    component: () => import("@/views/ProcessView")
  },
  {
    path: '/ingredient',
    name: 'ingredient',
    component: () => import("@/views/IngredientView")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (
      !sessionStorage.getItem('token') &&
      to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  } else {
      next()
  }
})

export default router
