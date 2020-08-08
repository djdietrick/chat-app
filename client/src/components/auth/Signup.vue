<template>
    <form class="signup">
        <transition name="fade">
            <div v-if="error" class="form__error">{{error}}</div>
        </transition>
        <div class="form__group">
            <label for="name" class="form__label">Name</label>
            <input type="text" id='name' class='form__input'
                v-model='name'>
        </div>
        <div class="form__group">
            <label for="email" class="form__label">Email</label>
            <input type="text" id='email' class='form__input'
                v-model='email'>
        </div>
        <div class="form__group">
            <label for="password" class="form__label">Password</label>
            <input type="password" id='password' class='form__input'
                v-model='password '>
        </div>
        <div class="form__group">
            <label for="confirmPassword" class="form__label">Confirm Password</label>
            <input type="password" id='confirmPassword' class='form__input'
                v-model='confirmPassword '>
        </div>
        <div class="form__btn form__group">
            <button
                    class="btn btn-primary"
                    @click.prevent="validateAndSubmit()">Signup
            </button>
        </div>
    </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
            attemptedSignIn: false
        }
    },
    methods: {
        ...mapActions(["signup"]),
        async validateAndSubmit() {
            this.attemptedSignIn = true;

            let errors = false;
            if(!this.name.length) {
                this.error = "Please input a name.";
                return;
            }
            if(!this.validEmail(this.email)) {
                this.error = "Please enter a valid email address.";
                return;
            }
            if(this.password.length < 8) {
                this.error = "Please enter a password with at least 8 characters.";
                return;
            }
            if(this.confirmPassword !== this.password) {
                this.error = "Password and confirm password do not match.";
                return;
            }

            this.signup({
                name: this.name,
                email: this.email,
                password: this.password
            })
            .catch(e => this.error = e.message);
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
    watch: {
        confirmPassword: function(val) {
            if(val === 0)
                return;
            else if(val !== this.password && this.attemptedSignIn) {
                this.error = "Passwords must match!";
            }
            else if(this.error.length !== 0) {
                this.error = "";
                this.$forceUpdate();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.signup {
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