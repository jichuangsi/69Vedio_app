<template>
    <div class="Extension">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">我的二维码</div>
    </div>
    <div class="center">
        <div class="center_title">
            <img src="../assets/images/微信图片_20191210111856.png" alt="">
            <span>69短视频</span>
        </div>
        <div class="ewm">
            <img src="../assets/images/ewm.jpg" alt="">
        </div>
        <div class="ipt" @click="fz">
            {{url}}
            <span>复制</span>
        </div>
        <div class="ts">
            温馨提示：微信不能浏览。需要用浏览器才能浏览。
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Extension',
  data() {
    return {
        url:'http://huaban.com/pins/2862628599'
    }
  },
  mounted () {
  },
  methods: {
    back(){
      window.history.go(-1)
    },
      fz(){
          window.clipboardData.setData("Text",this.url);
      }
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
    letter-spacing: 5px;
}
.top .left {
    width: 19px;
    height: 36px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -2147px;
    padding: 0px 20px;
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
}
.top .right {
    position: absolute;
    right: 30px;
    bottom: 20px;
    font-size: 26px;
    color: #999999;
}
.top img {
    width: 100%;
    display: block;
}
.center {
    width: 100%;
    .center_title {
        font-size: 34px;
        color: #fff;
        font-weight: 600;
        letter-spacing: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 78px;
            margin-right: 20px;
        }
    }
    .ewm {
        width: 100%;
        margin-top: 40px;
        margin-bottom: 80px;
        padding: 68px 125px;
        img {
            width: 100%;
        }
    }
    .ipt {
        font-size: 24px;
        color: #ff3841;
        background-color: #1d1010;
        line-height: 75px;
        padding: 0px 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 44px;
        span {
            display: inline-block;
            width: 140px;
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            color: #fff;
            background-color: #ff3841;
            border-radius: 60px;
            text-align: center;
        }
    }
    .ts {
        font-size: 24px;
        line-height: 36px;
        margin-bottom: 100px;
        padding: 0px 32px;
        color: #fff;
        letter-spacing: 2px;
    }
}
</style>