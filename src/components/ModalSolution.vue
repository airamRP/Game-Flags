<template>
  <transition name="modal">
    <div class="modal" v-if="show">
      <div class="modal-wrapper">

        <div class="modal-header">
          <p class="title">Solución</p>
          <p class="close" @click="$emit('closeModal')">&times;</p>
        </div>

        <div class="modal-body">
          <p class="result">{{ show }}</p>
          <div class="board">
            <div class="countries" v-for="(country, index) in countriesGuess" :key="index">
              <div class="name" :title="country">{{ country }}</div>
              <div class="country" :class="{ success: rightGuess[index] }">
                <img :src="getUrl(country)" :alt="country" :title="country">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import { useFlag } from '@/composables/useFlag'

export default {
  name: 'ModalSolution',
  props: ['show'],

  setup() {
    const { countriesGuess, rightGuess, getUrl } = useFlag()

    return { countriesGuess, rightGuess, getUrl }
  }
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
  background-color: rgba($color-light, .5);
}

.modal-wrapper {
  margin: 50px auto 0;
  width: 80%;
  border-radius: 10px;
  background-color: rgba($color-dark, .9);
}

.modal-header {
  padding: .6rem 1rem;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;

  .close {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    &:hover {
      color: $color-medium;
    }
  }
}

.modal-body {
  background-color: rgba($color-light, .1);
}

.board {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 1rem;
}

.countries {
  .name {
    font-size: .7rem;
    padding: .3rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-shadow: 1px 1px 2px $color-dark;
  }

  .country {
    border: 1px solid $color-light;

    img {
      display: block;
      object-fit: cover;
      max-width: 100%;
    }
  }
}

p {
  font-weight: bolder;
}


.title {
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: .05rem;
  text-shadow: 1px 1px 2px $color-dark;
}

.result {
  font-size: .9rem;
  padding: 1rem 0 .5rem 0;
  text-align: center;
  text-shadow: 1px 1px 2px $color-dark;
}

.success {
  /* border-radius: 5px; */
  /* outline: 3px solid $color-light; */
  outline: 3px solid rgb(10, 204, 36);
  outline-offset: -1px;
  box-shadow: 0px 0px 3px 2px $color-light;
}

//  Sytles applied to element with transition = "modal"
.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transition: all 0.3s ease;
}
</style>
