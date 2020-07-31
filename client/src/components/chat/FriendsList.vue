<template>
    <div class="friend-list">
        <div v-for="friend in friends" :key="friend.id" class="friend">
            <h3 class="heading-tertiary">{{friend.name}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        friends: {
            type: Array,
            default() {
                    return [
                    {
                        name: "Friend 1",
                        id: "123"
                    },
                    {
                        name: "Friend 2",
                        id: "124"
                    },
                    {
                        name: "Friend 3",
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
.friends-list {
    display: flex;
    flex-direction: column;

    .friend {
        padding: 2rem 3rem;
        border: 2px solid $color-grey-dark-2;
        border-radius: 1.5rem;
        
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
    
    overflow-y: auto;
}
</style>