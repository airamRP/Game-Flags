<template>
  <transition name="modal">
    <div class="modal" v-if="info">
      <div class="modal-wrapper">

        <div class="modal-header">
          <p>{{ info }}</p>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ModalInfo',
  props: ['info']
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.modal-wrapper {
  margin: 110px auto 0;
  width: fit-content;
  border-radius: 5px;
  background-color: rgba($color-dark, .9);
}

.modal-header {
  padding: .6rem 1rem;
  text-align: center;
}

//  Sytles applied to element with transition = "modal"
.modal-enter-from {
  opacity: 0;
}

.modal-enter-to {
  opacity: 1;
}

.modal-enter-active {
  transition: all 1s ease-in-out;
}

.modal-leave-from {
  opacity: 1;
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-active {
  transition: all 1s ease-in-out;
}
</style>