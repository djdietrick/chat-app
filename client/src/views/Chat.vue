<template>
    <div class="chat">
        <FriendsList :friends="friends"/>
        <RoomsList :rooms="rooms"/>
        <Room/>
        <div class="btn btn--secondary logout" @click.prevent="logout">Logout</div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import RoomsList from '../components/chat/RoomsList.vue';
import FriendsList from '../components/chat/FriendsList.vue';
import Room from '../components/chat/Room.vue';

export default {
    methods: {
        ...mapActions(['logout', 'fetchRooms'])
    },
    computed: {
        ...mapGetters({
            rooms: 'getRooms',
            friends: 'getFriends',
            messages: 'getMessages'
        })
    },
    components: {
        RoomsList,
        FriendsList,
        Room
    },
    async created() {
        this.$socket.open();
        await this.fetchRooms();
        for(let i = 0; i < this.rooms.length; i++) {
            this.$socket.emit('join', this.rooms[i]._id);
        }
    },
    destroyed() {
        this.$socket.close();
    }
}
</script>

<style lang="scss">
.logout {
    opacity: 0.5;
    &:hover {
        opacity: 0.9;
    }
}
</style>