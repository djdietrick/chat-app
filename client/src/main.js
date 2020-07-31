import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios';
 
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
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
