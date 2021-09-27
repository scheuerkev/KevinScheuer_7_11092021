import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/components/auth/Login.vue';
import Register from "@/components/auth/Register.vue";
import Profile from "@/components/profile/Profile.vue";
import Posts from "@/views/Posts.vue";
import $store from "../store/index.js"


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
        component: Profile,
        meta: {requiresAuth: true},
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        meta: {requiresAuth: true},
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

router.beforeEach(async (to, from, next) => {
        if (to.matched.some(routes => routes.meta.requiresAuth)) {
            $store.dispatch('getUser', localStorage.getItem('token'))
            await sleep(100);
            if ($store.state.isLoggedIn) return next();
            else {
                $store.commit('SET_USER_INFO', {
                    show: "true",
                    color: "orange",
                    message: "vous avez été déconnecté"
                })
                return next('/login');
            }
        }
        next();
    }
);

export default router
