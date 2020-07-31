<template>
  <div class="home">
    <h1 class="heading-primary">Chat App</h1>
    <div class="btn btn--primary" @click="setComponent('login')">Login</div>
    <div class="btn btn--primary" @click="setComponent('signup')">Signup</div>
    <component :is="selectedComponent"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/auth/Login.vue';
import Signup from '../components/auth/Signup.vue';
export default {
  name: 'Home',
  data() {
    return {
      selectedComponent: null
    }
  },
  methods: {
    setComponent(comp) {
      this.selectedComponent = comp;
    }
  },
  components: {
    login: Login,
    signup: Signup
  }
}
</script>
