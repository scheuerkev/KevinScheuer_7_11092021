import Vue from 'vue'
import Vuex from 'vuex'
//import persistedState from 'vuex-persistedstate'
//import userService from "@/services/userService";
require('dotenv').config();
import axios from "axios";

Vue.use(Vuex)

const state = {
    token: null,
    userId: null,
    username: null,
    isAdmin: null,
    isLoggedIn: null,
    posts: [],
    comments: [],
    errors: [],
    userInfo: {},
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USER: (state, user) => {
        state.userId = user;
    },
    SET_USERNAME: (state, username) => {
        state.username = username;
    },
    SET_ADMIN: (state, admin) => {
        state.isAdmin = admin;
    },
    SET_ERROR: (state, error) => {
        state.errors = [error, ...state.error];
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo;
    }
}

const actions = {
    setToken: ({commit}, token) => {
        commit("SET_TOKEN", token);
    },
    setUser: ({commit}, user) => {
        commit("SET_USER", user);
    },
    setUsername: ({commit}, username) => {
        commit("SET_USERNAME", username);
    },
    setIsAdmin: ({commit}, isAdmin) => {
        commit("SET_ADMIN", isAdmin);
    },
    loginUser: ({commit}, payload) => {
        axios
            .post('http://localhost:3000/api/auth/login', payload)
            .then((response) => {
                commit("SET_TOKEN", response.data.token);
                commit("SET_USER", response.data.userId);
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "green",
                    message: 'Welcome back 👋',
                });
            }).catch(() => {
                commit("SET_USER_INFO", {
                    show: "true",
                    color: "red",
                    message: "unable to find this user, sorry",
                });
        });
    },
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
}

const getters = {}

export default new Vuex.Store({
    strict: true,
    //plugins: [persistedState()],
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
})
