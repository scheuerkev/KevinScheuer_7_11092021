import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    token: null,
    userId: null,
    username: null,
    isAdmin: null
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USER: (state, user) => {
        state.userId = user;
    },
    SET_USERNAME: (state, user) => {
        state.user = user;
    },
    SET_ADMIN: (state, admin) => {
        state.isAdmin = admin;
    }
}

const actions = {
    setToken: ({ commit }, token) => {
        commit("setToken", token);
    },
    setUser: ({ commit }, user) => {
        commit("setUser", user);
    },
    setUsername: ({ commit }, user) => {
        commit("setUsername", user);
    },
    setIsAdmin: ({ commit }, isAdmin) => {
        commit("setIsAdmin", isAdmin);
    }
}

export default new Vuex.Store({
    plugins: [persistedState()],
    state: state,
    mutations: mutations,
    actions: actions
})
