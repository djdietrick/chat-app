<template>
    <div class="room-list">
        <div v-for="room in rooms" class="room-list__entry">
            <h3 class="heading-tertiary">{{room.name}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rooms: {
            type: Array,
            default() {
                    return [
                    {
                        name: "Test Room 1",
                        id: "123"
                    },
                    {
                        name: "Test Room 2",
                        id: "124"
                    },
                    {
                        name: "Test Room 3",
                        id: "125"
                    }
                ]
            } 
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
        border: 2px solid $color-grey-dark-1;
        border-radius: 1.5rem;
        
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
    
    overflow-y: auto;
}
</style>