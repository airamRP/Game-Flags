import { countriesData } from '@/data/flags.js'

import { ref, reactive, toRefs } from 'vue'

const game = reactive({
  numberCountriesGuess: 5,
  currentContinent: 'Europa',
  countriesGuess: [],           // Países a adivinar
  countriesPlay: [],            // Países con los que jugar
  countriesUser: [],            // Países propuestos por el usuario
  lastCountriesUser: [],        // Países no acertados
  rightGuess: [],               // Aciertos
  endGame: false,
})

const showModalInfo = ref('')
const showModalSolution = ref('')
const tries = ref('0')

export function useFlag() {
  const MAX_TRIES = 3

  // Obtener países al azar
  const initCountriesGuess = () => {
    const temp = new Set([])
    while (temp.size < game.numberCountriesGuess) {
      let auxRandom = Math.floor(Math.random() * countriesData[game.currentContinent].length)
      temp.add(countriesData[game.currentContinent][auxRandom])
    }
    game.countriesGuess = Array.from(temp).sort()
  }

  const initCountriesPlay = () => {
    const temp = game.countriesGuess.slice()
    game.countriesPlay = shuffle(temp)
  }

  const initCountriesUser = () => {
    game.countriesUser = Array.from({ length: game.numberCountriesGuess }, () => '')
  }

  const initLastCountriesUser = () => {
    game.lastCountriesUser = Array.from({ length: game.numberCountriesGuess }, () => new Set([]))
  }

  const initRightGuess = () => {
    game.rightGuess = Array.from({ length: game.numberCountriesGuess }, () => false)
  }

  const newGame = () => {
    initCountriesGuess()
    initCountriesPlay()
    initCountriesUser()
    initLastCountriesUser()
    initRightGuess()
    game.endGame = false
    tries.value = 0
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  const getUrl = (country = '') => {
    return country ?
      require(`@/assets/Images/${game.currentContinent}/Bandera de ${country}.svg`) :
      require('@/assets/Images/BaseFlag.svg')
  }

  const allFlagsRight = () => {
    return (JSON.stringify(game.countriesUser) === JSON.stringify(game.countriesGuess))
  }

  const hits = () => {
    game.countriesUser.forEach((country, index) => {
      game.rightGuess[index] = country === game.countriesGuess[index]
    })

    return game.rightGuess.reduce((previousValue, currentValue) =>
      currentValue ? ++previousValue : previousValue,
      0)
  }

  const animationModalInfo = ((info = '') => {
    setTimeout(() => {
      showModalInfo.value = ''
    }, 2500)
    showModalInfo.value = info
  })

  const checkSolution = () => {
    if (game.endGame) {
      animationModalInfo('Juego terminado. Inicia un nuevo juego')
      return
    }

    // No Suficientes banderas
    if (game.countriesUser.includes('')) {
      animationModalInfo('Banderas insuficientes')
      return
    }

    // Todas las banderas acertadas
    if (allFlagsRight()) {
      animationModalInfo('¡Genial!')
      game.endGame = true
      return
    }

    // Juego terminado con error
    tries.value++
    if (tries.value >= MAX_TRIES) {
      game.endGame = true
      const numberRights = hits()
      showModalSolution.value = `${numberRights} acierto${numberRights === 1 ? '' : 's'}`
      return
    }

    // En otro caso, mostrar aciertos y errores
    game.countriesUser.forEach((country, index) => {
      if (country === game.countriesGuess[index]) { // País acertado
        // Eliminar de la lista de países a jugar y guardar acierto
        const ind = game.countriesPlay.indexOf(country)
        game.countriesPlay[ind] = ''
        game.rightGuess[index] = true
      } else {  // País no acertado
        game.lastCountriesUser[index].add(game.countriesUser[index])
        game.countriesUser[index] = ''
        game.rightGuess[index] = false
      }
    })
  }

  const triesLeft = () => {
    return MAX_TRIES - tries.value
  }

  // Drag and Drop
  const allowDrop = (event, index) => {
    if (game.endGame) {
      animationModalInfo('Juego terminado. Inicia un nuevo juego')
      return
    }
    // Permitir 'drop' solo en los países no acertados
    if (!game.rightGuess[index]) {
      event.preventDefault()
      return
    }
  }

  const drag = (event, country) => {
    const transferTask = JSON.stringify(country)
    event.dataTransfer.setData('country', transferTask)
  }

  const drop = (event, index) => {
    if (game.endGame) {
      animationModalInfo('Juego terminado. Inicia un nuevo juego')
      return
    }
    event.preventDefault()
    const country = JSON.parse(event.dataTransfer.getData('country'))
    game.countriesUser[index] = country
  }

  return {
    getUrl,
    checkSolution,
    allowDrop, drop, drag,
    newGame,
    showModalInfo,
    showModalSolution,
    countriesData,
    triesLeft,
    ...toRefs(game),
  }
}