<template>
    <div class="Foot">
      <div class="foot_box" :class="{foot_check:check_index == index}" v-for="(item,index) in arr" :key="index" @click="go(item.url)">
          <div :class="{check_img:check_index == index}"></div>
          <span>{{item.title}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Foot',
  props: {
     check_index: {
        type: Number
      },
  },
  data() {
    return {
      arr:[
        {
          url:"Index",
          title:'首页'
        },
        {
          url:"Popularity",
          title:'人气'
        },
        {
          url:"Upload",
          title:''
        },
        {
          url:"news",
          title:'消息'
        },
        {
          url:"My",
          title:'我'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    go(url){
      this.$router.push({ path:'/'+url  })
    }
  }
}
</script>

<style scoped lang="scss">
.Foot {
    width: 100%;
    height: 95px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #261113;
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 2;
    // opacity: 0.2;
}
.Foot .foot_box {
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    letter-spacing: 2px;
    color: #919090;
}
.Foot .foot_box div {
  background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
  background-size: 750px 4532px;
  margin-bottom: 10px;
}
.Foot .foot_box:nth-child(1) div {
  width: 45px;
  height: 44px;
  background-position: -314px -24px;
}
.Foot .foot_box:nth-child(1) .check_img {
  width: 44px;
  height: 44px;
  background-position: -16px -24px;
}
.Foot .foot_box:nth-child(2) div {
  width: 44px;
  height: 44px;
  background-position: -314px -99px;
}
.Foot .foot_box:nth-child(2) .check_img {
  width: 45px;
  height: 45px;
  background-position: -16px -99px;
}
.Foot .foot_box:nth-child(3) div {
  width: 116px;
  height: 63px;
  background-position: -16px -316px;
}
.Foot .foot_box:nth-child(4) div {
  width: 44px;
  height: 38px;
  background-position: -314px -185px;
}
.Foot .foot_box:nth-child(4) .check_img {
  width: 43px;
  height: 37px;
  background-position: -16px -185px;
}
.Foot .foot_box:nth-child(5) div {
  width: 44px;
  height: 45px;
  background-position: -314px -249px;
}
.Foot .foot_box:nth-child(5) .check_img {
  width: 42px;
  height: 45px;
  background-position: -16px -249px;
}
.Foot .foot_check{
    color: #ff3841;
}
.Foot .foot_box:nth-child(3){
    width: 70px;
}
</style>