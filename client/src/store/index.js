import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

import auth from './modules/auth';
import io from 'socket.io-client';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    friends: [],
    messages: {}
  },
  getters: {
    getRooms: state => state.rooms,
    getFriends: state => state.auth.user.friends,
    getMessages: state => state.messages,
    getRoomMessages: (state) => (roomId) => { return state.messages[roomId]; }
  },
  mutations: {
    setRooms: (state, rooms) => state.rooms = rooms,
    setFriends: (state, friends) => state.friends = friends,
    SOCKET_roomMessages: (state, room) => state.messages[room.roomId] = room.messages,
    SOCKET_message: (state, msg) => {
      if(state.messages[msg.roomId] === undefined)
        state.messages[msg.roomId] = [];
      state.messages[msg.roomId].push(msg);
    }
  },
  actions: {
    async createRoom({commit}, room) {

    },
    async fetchRooms({commit}) {
      const res = await axios.get('/rooms');
      console.log(res.data);
      commit('setRooms', res.data);
    },
    async addFriend({commit}, friend) {

    }
  }, 
  modules: {
    auth
  },
  plugins: [createPersistedState()]
})
