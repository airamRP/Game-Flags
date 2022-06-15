<template>
  <transition name="modal">
    <div class="modal" v-if="show">

      <div class="modal-wrapper">

        <div class="modal-header">
          <h4>Ajustes</h4>
          <p class="close" @click="$emit('closeModal')">&times;</p>
        </div>

        <div class="modal-body">
          <div class="continent">
            <label>Continente</label>
            <select v-model="continent">
              <option v-for="continent in continentsList" :key="continent" :value="continent">{{ continent }}</option>
            </select>
          </div>
          <div class="number-countries">
            <label>Países</label>
            <input type="range" min="5" :max="maxCountries" v-model.number="numberCountries">
            <span class="range-value">{{ numberCountriesByContinent }}</span>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="okModal">&#10004;</button>
        </div>

      </div>

    </div>
  </transition>
</template>

<script>
import { useFlag } from '@/composables/useFlag'

import { ref, computed } from 'vue'

export default {
  name: 'ModalOptions',
  props: ['show'],
  emits: ['closeModal'],

  setup(_, { emit }) {
    const { numberCountriesGuess, currentContinent, countriesData } = useFlag()

    const numberCountries = ref(numberCountriesGuess.value)
    const continent = ref(currentContinent.value)

    const okModal = () => {
      numberCountriesGuess.value = numberCountriesByContinent.value
      currentContinent.value = continent.value
      emit('closeModal', true)
    }

    const maxCountries = computed(() => {
      return countriesData[continent.value].length
    })

    const continentsList = computed(() => {
      return Object.keys(countriesData)
    })

    const numberCountriesByContinent = computed(() => {
      return Math.min(numberCountries.value, maxCountries.value)
    })

    return {
      countriesData,
      continentsList,
      numberCountries, continent, numberCountriesByContinent,
      maxCountries,
      okModal,
    }
  },
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
  width: 90%;
  max-width: fit-content;
  border-radius: 3px;
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
  padding: 1.5rem 1rem;
  background-color: rgba($color-light, .1);
  font-size: .8rem;

  .continent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    row-gap: .5rem;
    margin-bottom: 1.5rem;

    select {
      color: rgba($color-light, .9);
      background: transparent;
      border: 1px solid rgba($color-light, .9);
      border-radius: 5px;

      padding: .4rem;

      & option {
        color: rgba($color-dark, .9);
        ;
      }
    }

  }

  .number-countries {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    column-gap: 1rem;
    row-gap: .5rem;

    input {
      min-width: 50px;
    }

    .range-value {
      width: 1rem;
      text-align: right;
    }
  }
}

.modal-footer {
  padding: .6rem 1rem 1rem;
  text-align: center;
  background-color: rgba($color-light, .1);

  button {
    border: 1px solid transparent;
    background-color: transparent;
    font-size: 1.5rem;
    color: $color-dark;
    background-color: rgba($color-light, .9);
    border-radius: 3px;
    padding: 0 .8rem;
    transition: .5s;

    &:hover {
      color: rgba($color-light, .9);
      background-color: transparent;
      border: 1px solid rgba($color-light, .9);
      transition: .5s;
    }
  }
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