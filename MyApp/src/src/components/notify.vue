<template>
    <div class="notify">
        <div class="top">
            <div class="left" @click="back"></div>
            <div class="title">系统通知</div>
        </div>
        <div class="center">
            <div class="li" v-for="(item,index) in notify_arr" :key="index">
                <div class="img">
                    <img src="../assets/images/微信图片_20191210111856.png" alt="">
                </div>
                <div class="ctr">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="text">
                        {{item.content}}
                    </div>
                    <div class="time clearfix">
                        <div class="fr">{{item.add_time}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getnotice} from '@/api/api'
export default {
  name: 'notify',
  data() {
    return {
        notify_arr: "",
    }
  },
  mounted () {
      this.getdata()
  },
  methods: {
      getdata(){
          getnotice().then(res=>{
              console.log(res)
              if(res.data.resultCode == 0){
                  this.notify_arr = res.data.data
              }
          })
      },
    back(){
      window.history.go(-1)
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
    .li {
        width: 100%;
        border-bottom: 1px solid #999;
        color:#fff;
        font-size: 26px;
        line-height: 46px;
        padding: 20px;
        display: flex;
        .img {
            width: 120px;
            height: 120px;
            margin-right: 20px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .ctr {
            flex: 1;
        }
        .title{
            font-size: 32px;
        }
        .text {
            text-indent: 2em;
        }
    }
}
</style>