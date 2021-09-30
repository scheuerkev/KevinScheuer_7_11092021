import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import $router from '@/router/index.js';

Vue.use(Vuex)
//Setting VUEX STORE as a SSoT
//Store state
const state = {
    user: {},
    isLoggedIn: false,
    posts: [],
    comments: [],
    userInfo: {},
    usernameRules: [
        v => !!v || 'Un nom d\'utilisateur est obligatoire',
        v => (v && v.length >= 8) || 'Le nom d\'utilisateur doit contenir au moins 8 caractères',
    ],
    emailRules: [
        v => !!v || 'Une adresse e-mail valide est obligatoire',
        v => /.+@.+\..+/.test(v) || 'Merci d\'entrer une adresse mail au format nom@domaine.hote',
    ],
    passwordRules: [
        v => (v && v.length >= 8) || 'Le mot de passe d\'une longueur comprise entre 8 et 100 caractères',
        v => /(?=.*[A-Za-z])/.test(v) || 'Le mot de passe doit contenir au moins une majuscule et une minuscule',
        v => /(?=.*\d{2})/.test(v) || 'Le mot de passe doit contenir au moins deux chiffres',
    ],
}

//Store mutations
const mutations = {
    SET_USER: (state, user) => {
        state.user.userId = user.userId;
        state.user.email = user.email;
        state.user.avatar = user.avatar;
        state.user.username = user.username;
        state.user.isAdmin = user.isAdmin;
        state.user.createdAt = user.createdAt;
        state.user.updatedAt = user.updatedAt;
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo;
    },
    SET_IS_LOGGED: (state, bool) => {
        state.isLoggedIn = bool;
    },
    UPDATE_USER: (state, user) => {
        state.user = {...state.user, user}
    },
    LOG_OUT_USER(state) {
        state.user.token = null;
        state.user.userId = null;
        state.user.username = null;
        state.user.isAdmin = 0;
        state.user.isLoggedIn = false;
    },
    SET_POSTS: (state, posts) => {
        state.posts = posts;
    }
}

//Store actions
const actions = {
    //loginUser takes a payload (obj : email/password) and return userId and token
    //Token is dispatched into a new action to get user info to commit changes on user state
    loginUser: ({commit, dispatch, getters}, payload) => {
        const user = getters.getUser;
        axios
            .post('http://localhost:3000/api/auth/login', payload)
            .then((response) => {
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "green",
                    message: 'Welcome back 👋',
                });
                localStorage.setItem('token', response.data.token);
                dispatch('getUser', response.data.token);
                setTimeout(() => $router.push('/profile/' + user.userId), 1500)
            }).catch(() => {
            commit("SET_USER_INFO", {
                show: "true",
                color: "red",
                message: "unable to find this user, sorry",
            });
        });
    },
    //getUser is call by loginUser action and on each "auth needed" routes. This logic is implemented
    //on routing logic. Token is headed to request and response data provide user global state
    //As far as this logic is specific, the way allow to ensure application security. If corrupted
    //the token (stored in the localStorage) rightly fails global auth app logic
    getUser({commit}, token) {
        axios
            .get("http://localhost:3000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
            const user = {...res.data};
            commit('SET_USER', user);
            commit("SET_IS_LOGGED", true);
        })
            .catch(err => {
                    if (err.response.status === 403) {
                        commit('LOG_OUT_USER');
                        commit('SET_IS_LOGGED', false);
                    }
                }
            );
    },
    //registerUser action allow new user to register an account into app. Form survey is locally set
    registerUser: ({commit}, payload) => {
        payload = {
            ...payload,
            avatar: null,
            isAdmin: 0
        }
        axios
            .post('http://localhost:3000/api/auth/signup', payload)
            .then((response) => {
                console.log(response);
                $router.push('/login');
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "green",
                    message: "compte bien créé, merci de vous identifier",
                });
            }).catch((err) => {
            console.log(err);
            commit("SET_USER_INFO", {
                show: "true",
                color: "red",
                message: "unable to register this user, sorry",
            });
        });
    },
    deleteAccount({commit, getters}) {
        const user = getters.getUser;
        const token = localStorage.getItem('token');

        axios
            .delete("http://localhost:3000/api/auth/profile/" + user.userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    commit("LOG_OUT_USER");
                    commit("SET_IS_LOGGED", false);
                    $router.push("/");
                    commit("SET_USER_INFO", {
                        show: "true",
                        color: "green",
                        message: "votre compte à bien été supprimé 👋"
                    })
                } else (alert('Out of bound'));
            })
            .catch(err => console.log('unable to delete user: ', err.message));
    },
    updateProfile({commit, getters}, payload) {
        const user = getters.getUser;
        const token = localStorage.getItem('token');

        console.log(payload);
        axios
            .put("http://localhost:3000/api/auth/profile/" + user.userId, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            .then((res) => {
                commit('UPDATE_USER', res.data);
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "green",
                    message: 'Votre profil a correctement été mis à jour 💪',
                });
            })
            .catch(() => {
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "red",
                    message: 'Cette adresse mail est déjà utilisée ⛔️',
                });
            });
    },
    createPost({commit}, payload) {
        const token = localStorage.getItem('token');

        axios
            .post('http://localhost:3000/api/post/', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                console.log(response);
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "green",
                    message: "post bien créé !",
                });
                setTimeout(() => $router.push('/posts'), 2000);
            }).catch((err) => {
            console.log(err);
            commit("SET_USER_INFO", {
                show: "true",
                color: "red",
                message: "il y'a eu un big pb brow",
            });
        });

    },
    getAllPosts({commit}) {
        const token = localStorage.getItem('token');

        axios
            .get("http://localhost:3000/api/post", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
            const posts = {...res.data};
            commit('SET_POSTS', posts);
            console.log(posts);
        })
            .catch(err => {
                console.log(err.message);
            });
    }
}

const getters = {
    getPosts(state) {
        return state.posts;
    },
    getUser(state) {
        return state.user;
    }
}

//store consumption
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
})
