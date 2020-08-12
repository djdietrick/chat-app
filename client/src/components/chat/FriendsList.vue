<template>
    <div class="friend-list">
        <div class="friend-list__header">
            <h3 class="heading-tertiary">Friends</h3>
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
        <div class="friend-list__list">
            <div v-for="friend in friends" :key="friend.id._id" class="friend">
                <h3 class="paragraph">{{friend.id.name}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '../utils/Modal';
export default {
    props: {
        friends: {
            type: Array
        }
    },
    components: {
        Modal
    }
}
</script>

<style lang="scss">
@import "../../styles/main.scss";
.friend-list {
    display: grid;
    grid-template-rows: 5rem 1fr;
    //grid-gap: 1rem;

    .friend {        
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }

    &__header {
        display: grid;
        grid-template-columns: 10fr 1fr;
        align-items: center;
    }
    
    overflow-y: auto;
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