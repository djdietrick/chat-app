<template>
  <div id="app">
    <component :is="selectedComponent"/>
  </div>
</template>

<script>
import Home from './views/Home.vue';
import Chat from './views/Chat.vue';
import {mapGetters} from 'vuex';

export default {
  components: {
    home: Home,
    chat: Chat
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    selectedComponent() {
      if(this.isAuthenticated) {
        return "chat";
      } else {
        return "home";
      }
    }
  }
}
</script>

<style lang="scss">
@import "./styles/main.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 95vh;
  width: 95vw;
}
</style>
