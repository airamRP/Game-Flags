<template>
  <div class="status">
    <p>Intentos: {{ triesLeft() }}</p>
  </div>

</template>

<script>
import { useFlag } from '@/composables/useFlag'

export default {
  setup() {
    const { triesLeft } = useFlag()

    return { triesLeft }
  }
}
</script>

<style lang="scss" scoped>
.status {
  font-size: .8rem;
  text-align: right;
  padding: .5rem 1rem;
}
</style>