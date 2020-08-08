<template>
    <div class="friend-list">
        <div class="friend-list__search">
            
        </div>
        <div class="friend-list__list">
            <div v-for="friend in friends" :key="friend.id._id" class="friend">
                <h3 class="heading-tertiary">{{friend.id.name}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        friends: {
            type: Array
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