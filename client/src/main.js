import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlusSquare);
Vue.component('font-awesome-icon', FontAwesomeIcon);
 
Vue.use(new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_SOCKET_URL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    autoConnect: false
}));

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
const state = JSON.parse(localStorage.getItem('vuex'));
if(state && state.auth.token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.auth.token;
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
