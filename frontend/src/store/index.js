import Vue from 'vue'
import Vuex from 'vuex'
//import userService from "@/services/userService";
require('dotenv').config();
import axios from "axios";

Vue.use(Vuex)


const state = {
    user: {},
    isLoggedIn: false,
    posts: [],
    comments: [],
    errors: [],
    userInfo: {},
}

const mutations = {
    SET_USER: (state, user) => {
        state.userId = user.userId;
        state.email = user.email;
        state.avatar = user.avatar;
        state.isAdmin = user.isAdmin;
        state.createdAt = user.createdAt;
        state.updatedAt = user.updatedAt;
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo;
    },
    SET_IS_LOGGED: (state, bool) => {
        state.isLoggedIn = bool;
    },
    SET_ERROR: (state, error) => {
        state.errors = [error, ...state.error];
    },
    LOG_OUT_USER(state){
        state.token = null;
        state.userId = null;
        state.username = null;
        state.isAdmin = 0;
        state.isLoggedIn = false;
    }
}

const actions = {
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
            if(err.response.status === 403) {
                commit('LOG_OUT_USER');
                commit('SET_IS_LOGGED', false);
            }
          }
          );
    },
    // checkAuth({ commit },token) {
    //      axios
    //         .get("http://localhost:3000/api/auth/me", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }})
    //         .then(() => {
    //             commit('SET_IS_LOGGED', true);
    //         })
    //         .catch(() => {
    //             commit('SET_IS_LOGGED', false);
    //         })
    // },
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
    setUserInfo({ commit }, userInfo) {
        userInfo.showing = true;
        userInfo.color = userInfo.color || "green";
        commit("SET_USER_INFO", userInfo);
    },
    logout({commit}) {
        commit('LOG_OUT_USER');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');

    }
}

const getters = {}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
})
