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
    getFriends: state => state.friends,
    getMessages: state => state.messages,
    getRoomMessages: (state, roomId) => state.messages[roomId]
  },
  mutations: {
    setRooms: (state, rooms) => state.rooms = rooms,
    setFriends: (state, friends) => state.friends = friends,
    SOCKET_ROOMMESSAGES: (state, room) => state.messages[room.roomId] = room.messages,
    SOCKET_MESSAGE: (state, msg) => state.messages[msg.roomId].push(msg)
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
  sockets: {
    connect: function () {
      console.log('hello from state')
    }
  },
  plugins: [createPersistedState()]
})
