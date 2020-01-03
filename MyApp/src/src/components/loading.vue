<template>
  <div class="loading">
    <div class="text">{{loadtext}}</div>
    <mt-spinner :size="60" color="rgba(61,114,254,1)" type="fading-circle"></mt-spinner>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      loadtext: {
          type: String
        },
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    background-color: #100909;
    .mint-spinner-fading-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .text {
      width: 100%;
      font-size: 36px;
      letter-spacing: 8px;
      color: #999;
      text-align: center;
      position: absolute;
      top: 30%;
    }
  }
</style>
