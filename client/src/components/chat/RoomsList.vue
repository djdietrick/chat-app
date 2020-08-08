<template>
    <div class="room-list">
        <div v-for="room in rooms" :key="room._id" 
        class="room-list__entry" 
        @click="setSelectedRoom(room)"
        v-bind:class="{'room-list__entry--active': isSelected(room)}">
            <h3 class="heading-tertiary heading-tertiary--white">{{room.name}}</h3>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            selectedRoom: {
                name: "Test 2",
                _id: 0
            }
        }
    },
    computed: {
        ...mapGetters({
            rooms: 'getRooms'
        })
    },
    methods: {
        setSelectedRoom(room) {
            this.selectedRoom = room;
        },
        isSelected(r) {
            return this.selectedRoom._id === r._id;
        }
    },
    watch: {
        rooms: function(r) {
            if(this.selectedRoom._id !== 0)
                return;
            if(r.length > 0)
                this.selectedRoom = r[0];
        },
        selectedRoom: function(r) {
            this.$emit('selectedRoom', r);
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/main.scss";
.room-list {
    display: flex;
    flex-direction: column;

    &__entry {
        padding: 2rem 3rem;
        border-radius: 0.5rem;
        background-color: $color-background;
        box-shadow: 0 0.5rem 1rem rgba($color-black,.2);

        &--active {
            background-color: $color-primary;
            color: $color-background;
        }
        
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
    
    overflow-y: auto;
}
</style>