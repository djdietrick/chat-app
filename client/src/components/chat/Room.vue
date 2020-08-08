<template>
    <div class="room">
        <div class="room__info">
            <h2 class="heading-secondary room__info__name">{{room.name}}</h2>
        </div>
        <div class="room__messages">
            <div v-for="message in messages" :key="message._id" class="message"
                v-bind:class="{ 'message__mine' : message.sender._id == userId }">
                <p class="message__sender">{{message.sender.name}}</p>
                <p class="message__text">{{message.text}}</p>
                <p class="message__time">{{formatTime(message)}}</p>
            </div>
        </div>
        <form class="room__input" v-on:submit.prevent="formatAndSendMessage">
            <input type="text" class="compose" v-model="input">
            <div class="btn btn--primary btn-send"
                v-bind:class="{'disabled': !ableToSend}"
                @click="formatAndSendMessage">Send</div>
        </form>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import moment from 'moment';

export default {
    props: {
        room: {
            type: Object
        }
    },
    data() {
        return {
            input: '',
            messages: []
        }
    },
    methods: {
        formatAndSendMessage() {
            if(!this.ableToSend)
                return;
            
            this.$socket.emit('submitMessage', {
                sender: this.userId,
                roomId: this.room._id,
                text: this.input
            });

            this.input = '';
        },
        formatTime(message) {
            return moment(message.createdAt).format('h:mm a');
        }
    },
    computed: {
        ...mapGetters({
            allMessages: 'getMessages',
            userId: 'getUserId'
        }),
        ableToSend() {
            return this.input.length > 0;
        }
    },
    watch: {
        room: function(r) {
            if(this.allMessages[r._id] === undefined)
                this.messages = [];
            else
                this.messages = this.allMessages[r._id];
            //this.messages(r._id);
        },
        allMessages: function(m) {
            console.log("allMessages changed")
            if(this.room !== undefined && m[this.room._id] !== undefined)
                this.messages = this.allMessages
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/main.scss";
.room {
    display: grid;
    grid-template-rows: 10% 80% 10%;

    &__info {
        background-color: $color-background;
        opacity: 0.8;

        &__name {
            margin-left: 3rem;
        }
    }

    &__messages {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        margin-bottom: 3rem;
    }

    &__input {
        display: grid;
        grid-template-columns: 80% 20%;
        grid-gap: 2rem;
        margin-bottom: 2rem;

        .compose {
            background-color: $color-background;
            color: $color-white;
            margin-left: 2rem;
            margin-bottom: 2rem;
            text-align:left;
            height: 100%;
            border-radius: 0.5rem;
            border: none;
            height: 90%;
            width: 100%;
            font-size: $default-font-size;
            padding: 1rem;
            white-space: normal;

            &:focus {
                outline: none !important;
                border: 2px solid $color-primary-light;
            }
        }

        .btn-send {
            justify-self: center;
            height: 90%;
            margin-right: 2rem;
        }

        .disabled {
            opacity: 0.5;
            &:hover {
                opacity: 0.5;
                transform: translateY(0px);
                box-shadow: 0 0 0 rgba($color-black,.2);
            }
        }
    }
}

.message {
    padding: 2rem;
    margin-top: 2rem;
    margin-left: 2rem;
    align-self: left;
    border-radius: 1.5rem;
    box-shadow: 0 0.5rem 1rem rgba($color-black,.2);
    position: relative;
    width: minmax(min-content, 75%);
    height: min-content;

    background-color: $color-background;

    &__mine {
        align-self: flex-end;
        margin-right: 2rem;
        background-color: $color-primary;
    }

    &__mine > &__sender {
        color: $color-white;
        opacity: 0.5;
    }

    &__sender {
        @extend .paragraph;
        font-weight: 400;
        white-space: nowrap;
        color: $color-primary-light;
        opacity: 0.8;
    }

    &__text {
        @extend .paragraph;
        font-weight: 300;
        white-space: normal;
        word-break: break-word;
    }

    &__time {
        @extend .paragraph;
        opacity: 0.3;
        //visibility: hidden;
        //position: absolute;
        //transform: translateY(-100%);
    }

    &:hover > &__time {
        visibility: visible;
    }
}

</style>