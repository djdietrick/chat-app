<template>
    <div>
        <div class="trigger" @click="showModal = true">
            <slot name="trigger"></slot>
        </div>
        <transition name="fade" appear>
            <div class="content" v-if="showModal">
                <div class="modal-overlay" @click="showModal = false"></div>
                <div class="modal">
                    <slot name="content" @closeModal="showModal = false"></slot>
                </div>
            </div>
        </transition> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;

    width: 100%;
    max-width: 50rem;
    background-color: #FFF;
    border-radius: 2rem;

    padding: 3rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

</style>