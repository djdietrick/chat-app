import axios from 'axios';

const a = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL
});

const state = {
    token: null,
    userId: null,
    user: null
}

const getters = {
    getUser: state => state.user,
    isAuthenticated: state => state.token !== null
}

const mutations = {
    authUser: (state, userData) => {
        state.token = userData.token;
        state.userId = userData.userId;
    },
    storeUser: (state, user) => state.user = user,
    clearAuthData: state => {
        state.token = null;
        state.userId = null;
        state.user = null;
    }
}

const actions = {
    async signup({commit}, user) {
        try {
            const res = await axios.post('/users', user);

            commit('authUser', {
                token: res.data.token,
                userId: res.data.user._id
            });
            commit('storeUser', res.data.user);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        } catch(e) {
            throw new Error(e.response.data);
        }
    },
    async login({commit}, user) {
        try {
            const res = await axios.post('/users/login', user);

            commit('authUser', {
                token: res.data.token,
                userId: res.data.user._id
            });
            commit('storeUser', res.data.user);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        } catch(e) {
            throw new Error(e.response.data);
        }
    },
    async logout({commit, state}) {
        try {
            await axios.post('/users/logout', state.user);
            commit('clearAuthData');            

        } catch(e) {
            console.error(e);
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}