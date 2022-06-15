<template>
  <router-view />
</template>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

*,
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;

  // Disable selection-dragable text
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body {
  background-color: $color-dark;
  background-image:
    linear-gradient(180deg, rgba($color-dark, 1) 0%, rgba($color-dark, .5) 35%, rgba($color-medium, 1) 100%);
  background-image: url('./assets/Images/world.svg'),
    linear-gradient(180deg, rgba($color-dark, 1) 0%, rgba($color-dark, .5) 35%, rgba($color-medium, 1) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
