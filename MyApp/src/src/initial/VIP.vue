<template>
    <div class="VIP">
        <top :top_arr="top_arr"></top>
        <div class="user">
            <img :src="user.headimgurl" alt="">
            <div class="usermessage">
                <div class="username">
                    {{user.nickname}}
                    <span v-if="user.isvip == 0">(普通用户)</span>
                    <span class="vipuser" v-if="user.isvip == 1">(VIP用户)</span>
                </div>
                <div class="viptime">
                    (有效期：{{user.vipinfo}})
                </div>
            </div>
        </div>
        <div class="center">
            <p>VIP特权</p>
            <div class="nav">
                <div class="box" :class="{check:check_index == index}" v-for="(item,index) in VIP_arr" :key="index" @click="VIP_click(index,item.id,item.price)">
                    <div class="title">
                        VIP
                    </div>
                    <div class="time">
                        {{item.name}}
                    </div>
                    <div class="money">
                        {{item.price}}
                    </div>
                    <span v-if="check_index == index"><em>✔</em></span>
                </div>
            </div>
            <!-- <div class="mode">
                <div class="modebox" :class="{check:mode_index == index}" v-for="(item,index) in mode_arr" :key="index" @click="mode_click(index)">
                    <img src="" alt="">
                    <div class="title">支付宝</div>
                    <span v-if="mode_index == index"><em>✔</em></span>
                </div>
            </!-->
            <div class="btn" @click="vipbtn">
                确定充值
            </div>
        </div>
    <load v-if="!viploadbtn"></load>
    </div>
</template>

<script>
import {getviplist,viprecharge,getmemberinfo} from '@/api/api'
import  top  from '@/components/top'
import load from '@/components/loading'
import { Toast } from 'mint-ui';
export default {
  name: 'VIP',
  components: {
    top,
    load
  },
  data() {
    return {
        top_arr:{left:true,title:'开通VIP',right:{title:'提现明细',url:false}},
        check_index:0,
        VIP_arr:[],
        mode_index:0,
        mode_arr:[
            1,2
        ],
        user:'',
        rid:'',
        viploadbtn:true,
        gold:''
    }
  },
  mounted () {
      this.getdata()
  },
  methods: {
      getdata(){
        this.user = JSON.parse(sessionStorage.getItem('user'))
        getviplist().then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.VIP_arr = res.data.data
                this.rid = res.data.data[0].id
                this.gold = res.data.data[0].price
            }
        })
      },
      VIP_click(index,id,gold){
          this.check_index = index
          this.rid = id
          this.gold = gold
      },
      mode_click(index){
          this.mode_index = index
      },
      vipbtn(){
          this.viploadbtn = false
          viprecharge(this.rid).then(res=>{
              console.log(res)
                if(res.data.resultCode == 0){
                    Toast(res.data.message)
                    let a = JSON.parse(sessionStorage.getItem('usermessage'))
                    a.money = a.money - this.gold
                    sessionStorage.setItem('usermessage',JSON.stringify(a))
                    getmemberinfo().then(res=>{
                        this.viploadbtn = true
                        if(res.data.resultCode == 0){
                            this.user = res.data.data
                            sessionStorage.setItem('user',JSON.stringify(res.data.data))
                        }
                    }).catch(err=>{
                        this.viploadbtn = true
                    })
                }else{
                    Toast(res.data.error)
                }
          }).catch(err=>{
            this.viploadbtn = true
        })
      }
  }
}
</script>

<style scoped lang="scss">
.user {
    width: 100%;
    padding: 20px 30px;
    line-height: 46px;
    color: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #211a1a;
    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-color: #fff;
    }
    .usermessage {
        margin-left: 24px;
        .username {
            font-size: 32px;
            margin-bottom: 20px;
            span {
                font-size: 24px;
            }
            .vipuser {
                color: #ff3841;
            }
        }
        .viptime {
            font-size: 30px;
        }

    }
}
.center {
    padding: 40px 30px;
    color: #fff;
    font-size: 28px;
    p {
        text-align: right;
        margin-bottom: 32px;
    }
    .nav {
        width: 100%;
        display: flex;
        padding: 40px 0px;
        border-bottom: 1px solid #211a1a;
        .box {
            width: 160px;
            height: 160px;
            padding: 15px;
            background-color: #261515;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            position: relative;
            margin-right: 5%;
            overflow: hidden;
            .title {
                color: #f1363e;
                font-size: 32px;
                font-weight: 600;
            }
            .time {
                font-size: 28px;
            }
            span {
                position: absolute;
                border: 15px solid #ff3841;
                border-color: transparent #ff3841 #ff3841 transparent;
                bottom: 0px;
                right: 0px;
                em {
                    position: absolute;
                    font-size: 12px;
                    top: -5px;
                    right: -6px;
                }
            }
        }
        .box:nth-child(4n){
            margin-right: 0px;
        }
        .check {
            border: 1px solid #ff3841;
        }
    }
    .mode {
        margin-top: 42px;
        .modebox {
            width: 100%;
            padding: 15px 40px;
            display: flex;
            position: relative;
            margin-bottom: 20px;
            overflow: hidden;
            img {
                width: 50px;
                height: 50px;
                background-color: #fff;
            }
            .title {
                font-size: 32px;
                margin-left: 40px;
            }
            span {
                position: absolute;
                border: 25px solid #ff3841;
                border-color: transparent #ff3841 #ff3841 transparent;
                bottom: 0px;
                right: 0px;
                em {
                    position: absolute;
                    font-size: 12px;
                    top: -5px;
                    right: -10px;
                }
            }
        }
        .check {
            border: 1px solid #ff3841;
        }
    }
    .btn {
        margin-top: 110px;
        width: 100%;
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 36px;
        font-weight: 500;
        border-radius: 88px;
        letter-spacing: 5px;
        background-color: #ff3841;
    }
}
</style>