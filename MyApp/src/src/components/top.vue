<template>
    <div class="top">
        <div class="left" @click="back" v-if="top_arr.left"></div>
        <div class="title">{{top_arr.title}}</div>
        <div class="right" @click="nextgo" v-if="top_arr.right.url">{{top_arr.right.title}}</div>
    </div>
</template>

<script>
export default {
  name: 'top',
  props: {
     top_arr: {
        type: Object
      },
  },
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
    back(){
      window.history.go(-1)
    },
    nextgo(){
       this.$router.push({ path:this.top_arr.right.url })
    },
  }
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    border-bottom: 1px solid #211a1a;
    background-color: #100909;
    position: relative;
}
.top .title{
    text-align: center;
    font-size: 42px;
    line-height: 80px;
    color: #fff;
    font-weight: 600;
}
.top .left {
    width: 19px;
    height: 36px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -2147px;
    padding: 0px 20px;
    margin: 20px;
    position: absolute;
    left: 20px;
    bottom: -20px;
    transform: translateY(-50%);
}
.top .right {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 26px;
    color: #999999;
    padding: 10px 20px;
}
.top img {
    width: 100%;
    display: block;
}

  /* iphone 3 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 1) { 
   .top {
       padding-top: 50px
   } 
}

/* iphone 4 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       padding-top: 50px
   } 
 }

/* iphone 5 */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       padding-top: 50px
   } 
 }

/* iphone 6, 6s */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       padding-top: 50px
   } 
}

/* iphone 7, 8 */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       padding-top: 50px
   } 
}

/* iphone 6+, 6s+, 7+, 8+ */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       padding-top: 50px
   } 
}

/* iphone X */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       padding-top: 60px
   } 
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
   .top {
       padding-top: 60px
   } 
}
//  xs max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .top {
       padding-top: 60px
   } 
}

</style>