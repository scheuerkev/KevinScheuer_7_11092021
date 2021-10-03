import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/components/auth/Login.vue';
import Register from "@/components/auth/Register.vue";
import Profile from "@/components/profile/Profile.vue";
import Posts from "@/views/Posts.vue";
import AddPost from "@/views/AddPost.vue";
import Post from "@/views/Post.vue";
import $store from "../store/index.js"

Vue.use(VueRouter)

//routes definition, note that some of these ones needs to be auth
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
    },
    {
        path: '/posts/add',
        name: 'AddPost',
        component: AddPost,
        meta: {requiresAuth: true},
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        meta: {requiresAuth: true},
    },

]

const router = new VueRouter({
    mode: "history",
    routes
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//setting routing guard
router.beforeEach(async (to, from, next) => {
        if (to.matched.some(routes => routes.meta.requiresAuth)) {
            $store.dispatch('getUser', localStorage.getItem('token'))
            await sleep(100);
            if ($store.state.isLoggedIn) {
                $store.commit('SET_USER_INFO', {
                    show: "false",
                })
                return next();
            }
            else {
                $store.commit('SET_USER_INFO', {
                    show: true,
                    color: "orange",
                    message: "Vous avez été déconnecté 👋"
                })
                return next('/login');
            }
        }
        next();
    }
);

export default router