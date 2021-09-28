import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)
//Setting STORE as a SSoT
//Store state
const state = {
    user: {},
    isLoggedIn: false,
    posts: [],
    comments: [],
    userInfo: {},
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
    UPDATE_EMAIL: (state, email) => {
        state.user.email = email;
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
    loginUser: ({commit, dispatch}, payload) => {
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
            }).catch((err) => {
            console.log(err);
            commit("SET_USER_INFO", {
                show: "true",
                color: "red",
                message: "unable to register this user, sorry",
            });
        });
    },
    deleteAccount({commit}) {

    },
    updateEmail({commit}, payload) {
        const sendPayload = {
            email: payload.state.user.email
        }
        const token = localStorage.getItem('token');
        axios
            .put("http://localhost:3000/api/auth/profile/" + payload.state.user.userId, JSON.stringify(sendPayload),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            .then((res) => {
                commit('UPDATE_EMAIL', res.data.email);
            })
            .catch((err) => {
                console.log(err)
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
    }
}

//store consumption
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
})
