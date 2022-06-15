.<template>
  <div class="container">
    <div class="main">
      <header-game />
      <countries-guess />
      <countries-play />
      <hr>
      <footer-game />
    </div>
  </div>

  <Teleport to="#app">
    <modal-info :info="showModalInfo" />
  </Teleport>

  <Teleport to="#app">
    <modal-solution :show="showModalSolution" @closeModal="closeModalSolution" />
  </Teleport>

</template>

<script>
import HeaderGame from '@/components/Header.vue'
import FooterGame from '@/components/Footer.vue'
import CountriesGuess from '@/components/CountriesGuess.vue'
import CountriesPlay from '@/components/CountriesPlay.vue'
import modalInfo from '@/components/ModalInfo.vue'
import modalSolution from '@/components/ModalSolution.vue'

import { useFlag } from '@/composables/useFlag'

import { onMounted } from 'vue'

export default {
  name: 'FlagsGame',
  components: { HeaderGame, modalInfo, modalSolution, FooterGame, CountriesGuess, CountriesPlay },

  setup() {
    onMounted(() => newGame())

    const closeModalSolution = () => {
      showModalSolution.value = ''
      newGame()
    }

    const {
      newGame,
      showModalInfo,
      showModalSolution,
    } = useFlag()

    return {
      showModalInfo,
      showModalSolution,
      closeModalSolution,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.container {
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
}

.main {
  display: flex;
  flex-direction: column;
  grid-gap: .4rem;

  border-radius: 3px;
  border: 2px solid rgba($color-dark, .8);
  background-color: rgba($color-dark, .5);
  box-shadow: 2px 2px 5px 1px rgba($color-dark, .1);
}

hr {
  border: none;
  border-bottom: 1px solid rgba($color-light, .2);
  border-top: 1px solid rgba($color-dark, .8);
}
</style>