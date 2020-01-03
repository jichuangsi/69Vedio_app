<template>
  <div class="Blank">
      <div class="box">
          <img src="../assets/images/微信图片_20191210111856.png" alt="" @click="goindex">
          <div>69视频</div>
      </div>
  </div>
</template>

<script>
import enquip from '../lib/equipInfo'
import {register,locate} from '@/api/api'
  export default {
    name: "Blank",
    data() {
      return {}
    },
    mounted() {
        this.initialize()
    },
    methods: {
    initialize() {
        let self = this
        document.addEventListener(
            "deviceready",
            function(){
                let a = enquip()
                setTimeout(function(){
                    if(!(sessionStorage.getItem('usermessage'))){
                        register(a).then(res=>{
                            console.log(res)
                            if(res.data.resultCode == 0){
                                sessionStorage.setItem('usermessage',JSON.stringify(res.data.data))
                                self.goindex()
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                },500)
            }
        )
        },
        goindex(){
            this.$router.push({
                path:'/Index'
            })
        }
    }
  }
</script>

<style scoped lang="scss">
  .Blank {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      .box {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          img {
              width: 300px;
              height: 300px;
              margin: 0 auto;
              margin-bottom: 80px;
              display: block;
          }
          div {
              text-align: center;
              font-size: 32px;
              letter-spacing: 5px;
              color: #999;
          }
      }
  }
</style>
