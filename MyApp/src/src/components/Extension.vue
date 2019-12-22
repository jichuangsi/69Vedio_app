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
            <canvas id="QRCode"></canvas>
        </div>
        <div class="ipt" v-clipboard:copy="QRCodeMsg" 
        v-clipboard:success="copy" 
        v-clipboard:error="onError">
            {{QRCodeMsg}}
            <span>复制</span>
        </div>
        <div class="ts">
            温馨提示：微信不能浏览。需要用浏览器才能浏览。
        </div>
    </div>
    </div>
</template>

<script>
import {sharelink} from '@/api/api'
import QRCode from "qrcode"
import { Toast } from 'mint-ui';
export default {
  name: 'Extension',
  data() {
    return {
        QRCodeMsg: "",
    }
  },
  watch: {
    // 通过监听获取数据
    QRCodeMsg(val) {
      // 获取页面的canvas
      var msg = document.getElementById("QRCode");
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function(error) {
        console.log(error);
      });
    }
  },
  mounted () {
      this.getdata()
  },
  methods: {
      getdata(){
          sharelink().then(res=>{
              console.log(res)
              if(res.data.resultCode == 0){
                  this.QRCodeMsg = res.data.data
              }
          })
      },
    back(){
      window.history.go(-1)
    },
    copy(e) {
        Toast('复制成功')
    },
    onError(e) {
        Toast('复制失败')
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
        canvas {
            width: 300px !important;
            height: 300px !important;
            display: block;
            margin: 0 auto;
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