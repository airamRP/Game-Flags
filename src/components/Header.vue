<template>
  <div class="controls">
    <p class="control" title="Nuevo juego" @click="newGame">&#x21bb;</p>
    <p class="control" title="Opciones" @click="showModalOptions = true">&#x1f7bf;</p>
    <p class="title">Adivina las banderas</p>
    <p class="control" title="Comprobar" @click="checkSolution">&#x2714;</p>
  </div>

  <Teleport to="#app">
    <modal-options :show="showModalOptions" @closeModal="closeModalOptions" />
  </Teleport>
</template>

<script>
import modalOptions from '@/components/ModalOptions.vue'

import { useFlag } from '@/composables/useFlag'

import { ref } from 'vue'

export default {
  name: 'HeaderGame',
  components: { modalOptions },

  setup() {
    const showModalOptions = ref(false)

    const { newGame, checkSolution } = useFlag()

    const closeModalOptions = (startGame) => {
      showModalOptions.value = false
      startGame ? newGame() : null
    }

    return {
      showModalOptions,
      newGame,
      checkSolution,
      closeModalOptions
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.controls {
  background-color: rgba($color-dark, .5);
  border-bottom: 1px solid $color-dark;
  display: flex;
  flex-wrap: wrap-reverse;

  .control {
    font-weight: 800;
    font-size: 1.5rem;
    padding: .5rem 1rem;
    cursor: pointer;
    text-shadow: 1px 1px 1px $color-dark;
  }

  .title {
    flex: 1;
    align-self: center;
    text-align: center;

    font-size: .9rem;
    font-weight: 600;
    letter-spacing: .05rem;
    text-shadow: 1px 1px 1px $color-dark;
  }
}
</style>