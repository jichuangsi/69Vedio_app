<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    width: 100%;
    height: 100vh;
    background-color: #100909;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
