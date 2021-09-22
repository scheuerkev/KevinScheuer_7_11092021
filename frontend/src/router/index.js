import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/components/auth/Login.vue';
import Register from "@/components/auth/Register.vue";
import Profile from "@/components/profile/Profile.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
