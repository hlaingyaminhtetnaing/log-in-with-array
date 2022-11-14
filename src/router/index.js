import Vue from 'vue'
import VueRouter from 'vue-router'
import LogInView from '../views/LogInView.vue'
import HomePage from '../views/HomePage.vue'
import SignUpview from '../views/SignUpview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loginview',
    component: LogInView
  },
  {
    path: '/home/:id',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/signup',
    name: 'signupview',
    component: SignUpview
  },
]

const router = new VueRouter({
  routes
})

export default router
