<template>
    <div class="dropdown">
        <div class="trigger" @click="isOpen = !isOpen">
            <slot name="trigger"></slot>
        </div>
        <div class="content">
            <!-- <slot name="content"></slot> -->
            <div class="test" :class="{isOpen}"></div>
        </div>
    </div>
        
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";

.dropdown {
    position: relative;

    .content {
        position: absolute;
        left: 50%;
        transform: translatex(-50%) rotatex(90deg) scale(0);
        margin-top: 0.55em;
        transform-origin: 0 0;
        border-radius: 0.35em;
        background-color: rgba($color-black, 0.15);
        visibility: hidden;
        opacity: 0;
        transition: all 200ms linear;

        &.isOpen {
            transform: translatex(-50%);
            visibility: visible;
            opacity: 1;
        }
    }

    .test {
        height: 10rem;
        width: 10rem;
        background-color: red;
    }
}

</style>