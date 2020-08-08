<template>
    <form class="login">
        <transition name="fade">
            <div v-if="error" class="form__error">{{error}}</div>
        </transition>
        <div class="form__group">
            <label for="email" class="form__label">Email</label>
            <input type="text" id='email' class='form__input'
                v-model='email' autocomplete="false">
        </div>
        <div class="form__group">
            <label for="description" class="form__label">Password</label>
            <input type="password" id='description' class='form__input'
                v-model='password '>
        </div>
        <div class="form__btn form__group">
            <button
                    class="btn btn-primary"
                    @click.prevent="formatAndSubmit()">Login
            </button>
        </div>
    </form>
</template>

<script>
import {mapActions} from "vuex";
export default {
    data() {
        return {
            email: "",
            password: "",
            error: null
        }
    },
    methods: {
        ...mapActions(["login"]),
        async formatAndSubmit() {
            this.error = null;
            this.login({
                email: this.email,
                password: this.password
            })
            .catch(e => this.error = e.message);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.login {
    display: flex;
    flex-direction: column;
    width: 40rem;
    border: 2px solid $color-primary;
    border-radius: 1rem;
    padding: 2rem;

    .form__btn {
        align-self:center;
    }
}

</style>