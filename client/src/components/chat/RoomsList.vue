<template>
    <div class="room-list">
        <div class="room-list__header">
            <h3 class="heading-tertiary">Rooms</h3>
            <Modal>
                <template v-slot:trigger>
                    <font-awesome-icon 
                    class="create--icon noselect"
                    :icon="['far', 'plus-square']"/>
                </template>
                <template v-slot:content>
                    <div class="btn btn--secondary">Create Room</div>
                </template>
            </Modal>
        </div>
        <div class="rooms">
            <div v-for="room in rooms" :key="room._id" 
            class="room-list__entry" 
            @click="setSelectedRoom(room)"
            v-bind:class="{'room-list__entry--active': isSelected(room)}">
                <h3 class="heading-tertiary heading-tertiary--white">{{room.name}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Modal from '../utils/Modal.vue';

export default {
    data() {
        return {
            selectedRoom: {
                name: "Test 2",
                _id: 0
            }
        }
    },
    components: {
        Modal
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
    display: grid;
    grid-template-rows: 5rem 1fr;
    grid-gap: 2rem;

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

    &__header {
        display: grid;
        grid-template-columns: 10fr 1fr;
        align-items: center;
    }

    .rooms {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

}

.create--icon {
    transform: scale(3);
    color: $color-secondary;
    cursor: pointer;
    transition: 0.1s ease-in-out;

    &:hover {
        transform: scale(3.2);
        box-shadow: 0 0.5rem 1rem rgba($color-black,.2);
    }
}

</style>