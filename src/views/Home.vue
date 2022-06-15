<template>
  <div class="home">
    <flags />
  </div>
</template>

<script>
// @ is an alias to /src
import Flags from '@/components/FlagsGame.vue'

export default {
  name: 'Home',
  components: {
    Flags
  }
}
</script>

<style lang="scss" scoped>
.home {
  /* min-height: 100vh; */
  /* min-height: fit-content; */
  /* border: 1px solid red; */

  display: flex;
  /* display: flex;
  justify-content: center; */


}
</style>
