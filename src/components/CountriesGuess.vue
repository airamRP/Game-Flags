<template>
  <div class="board">
    <div class="countries" v-for="(country, index) in countriesGuess" :key="index">

      <div class="name" :title="country">{{ country }}</div>
      
      <div class="country" title="Drop the flag here" @dragover="allowDrop($event, index)" @drop="drop($event, index)">
        <template v-if="countriesUser[index]">
          <img :src="getUrl(countriesUser[index])" :alt="countriesUser[index]" title="" draggable="false">
        </template>
        <template v-else>
          <img :src="getUrl()" draggable="false">
        </template>
      </div>

      <div class="errors">
        <div class="errors-item" v-for="(itemCountry, index) in lastCountriesUser[index]" :key="index">
          <img v-if="itemCountry" :src="getUrl(itemCountry)" :alt="itemCountry" title="Error" draggable="false">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useFlag } from '@/composables/useFlag'

export default {
  setup() {
    const { countriesGuess, countriesUser, lastCountriesUser, getUrl, allowDrop, drop } = useFlag()
    return { countriesGuess, countriesUser, lastCountriesUser, getUrl, allowDrop, drop }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
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

  .errors {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: .2rem;
    margin-top: .2rem;

    img {
      border: 1px solid rgba($color-dark, .8);
    }
  }
}
</style>