<template>
  <div class="board">
    <div class="flags" v-for="(country, index) of countriesPlay" :key="index">
      <img v-if="countriesPlay[index]" :src="getUrl(country)" alt="Flag" title="Drag the flag" draggable="true"
        @dragstart="drag($event, country)">
    </div>
  </div>
</template>

<script>
import { useFlag } from '@/composables/useFlag'

export default {
  setup() {
    const { countriesPlay, getUrl, drag } = useFlag()
    return { countriesPlay, getUrl, drag }
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

.flags {
  border: 2px solid rgba($color-dark, .8);

  img {
    cursor: pointer;
    display: block;
    object-fit: cover;
    max-width: 100%;
  }
}
</style>
