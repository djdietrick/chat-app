<template>
    <div class="chat">
        <FriendsList :friends="friends"/>
        <RoomsList @selectedRoom="selectedRoom = $event"/>
        <Room :room="selectedRoom"/>
        <Dropdown class="logout">
            <template v-slot:trigger>
                <div class="btn btn--secondary">Logout</div>
            </template>
        </Dropdown>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import RoomsList from '../components/chat/RoomsList.vue';
import FriendsList from '../components/chat/FriendsList.vue';
import Room from '../components/chat/Room.vue';
import Dropdown from '../components/Dropdown.vue';

export default {
    data() {
        return {
            selectedRoom: {
                name: "Test",
                _id: 0
            }
        }
    },
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
        Room,
        Dropdown
    },
    watch: {
        
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