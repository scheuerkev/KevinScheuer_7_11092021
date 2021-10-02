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
    post: [],
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
    contentRules: [
        v => (v && v.length >= 3) || 'Au moins trois caractères requis ',
    ],
}

//Store mutations
const mutations = {
    SET_USER: (state, user) => {
        state.user.userId = user.userId;
        state.user.email = user.email;
        state.user.image = user.avatar;
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
    LOG_OUT_USER: (state) => {
        state.user.token = null;
        state.user.userId = null;
        state.user.username = null;
        state.user.isAdmin = 0;
        state.user.isLoggedIn = false;
    },
    SET_POSTS: (state, posts) => {
        state.posts = posts;
    },
    SET_CURRENT_POST: (state, post) => {
        state.post = post;
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
                    show: true,
                    color: "green",
                    message: 'Content de vous revoir 👋',
                });
                localStorage.setItem('token', response.data.token);
                dispatch('getUser', response.data.token);
                setTimeout(() => $router.push('/profile/' + user.userId), 1500)
            }).catch(() => {
            commit("SET_USER_INFO", {
                show: true,
                color: "red",
                message: "Impossible de vous connecter, vérifiez vos informations 👀",
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
                    show: true,
                    color: "green",
                    message: "Compte bien créé, merci de vous identifier 🥳",
                });
            }).catch((err) => {
            console.log(err);
            commit("SET_USER_INFO", {
                show: true,
                color: "red",
                message: "Impossible d'enregistrer l'utilisateur 😞",
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
                        show: true,
                        color: "green",
                        message: "Votre compte à bien été supprimé 😞"
                    })
                }
            })
            .catch(() => {
                commit("SET_USER_INFO", {
                    show: true,
                    color: "green",
                    message: "Votre compte à bien été supprimé 😞"
                })
            });
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
                console.log(res.data);
                commit('UPDATE_USER', res.data);
                commit("SET_USER_INFO", {
                    show: true,
                    color: "green",
                    message: 'Votre profil a correctement été mis à jour 💪',
                });
            })
            .catch(() => {
                commit("SET_USER_INFO", {
                    show: true,
                    color: "red",
                    message: "Mise à jour impossible ⛔️",
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
                    show: true,
                    color: "green",
                    message: "Post bien créé ! 🗞",
                });
                setTimeout(() => $router.push('/posts'), 2000);
            }).catch((err) => {
            console.log(err);
            commit("SET_USER_INFO", {
                show: true,
                color: "red",
                message: "Impossible de créer le post 😕",
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
        })
            .catch(err => {
                console.log(err.message);
            });
    },
    getPost({commit}, id) {
        const token = localStorage.getItem('token');

        axios
            .get("http://localhost:3000/api/post/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
            const post = {...res.data};
            console.log(res.data);
            commit('SET_CURRENT_POST', post);
        })
            .catch(err => {
                console.log(err.message);
            });
    },
    createComment({commit, dispatch}, payload) {
        const datas = {
            content: payload.content,
            userId: payload.userId
        }
        console.log(commit);
        const token = localStorage.getItem('token');
        axios
            .post(`http://localhost:3000/api/comment/${payload.postId}`, datas,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            .then(res => {
                console.log(res);
                dispatch('getAllPosts');
            })
            .catch(err => console.log(err))
    },
    deleteComment({commit, dispatch}, payload) {
        console.log(payload);
        console.log(commit);
        const token = localStorage.getItem('token');
        axios
            .delete(`http://localhost:3000/api/comment/${payload.commentId}/user/${payload.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
            console.log(res);
            dispatch('getAllPosts');
        })
            .catch(err => console.log(err));

    }
}

const getters = {
    getPosts(state) {
        return state.posts;
    },
    getUser(state) {
        return state.user;
    },
    getPost(state) {
        return state.currentPost;
    }
}

//store consumption
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
})
