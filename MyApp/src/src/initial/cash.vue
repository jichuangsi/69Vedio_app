<template>
    <div class="cash">
        <top :top_arr="top_arr"></top>
    <div class="center">
        <div class="text">
            <div>视频收益 <span>{{user.money}}</span>（可提现）</div><span>1元={{goldrate.goldrate}}金币</span>
            <input type="number" class="cashipt" :placeholder="dateinit" v-model="gold">
        </div>
        <div class="text">
            <div>手续费 <span>{{gold == ''?0:gold*goldrate.service_harge/100}}</span>金币</div>
            <div>合计 <span>{{gold == ''?0:gold}}</span>金币</div>
            <div>到账 <span>{{gold == ''?0:(gold-gold*goldrate.service_harge/100)/10}}</span>元</div>
        </div>
        <div class="mode">
            <div class="h5">提现方式</div>
            <div class="modebox" v-if="mode.zhifubao" :class="{check:mode_index == 0}" @click="mode_click(0,mode.zhifubao.id)">
                <div class="title">支付宝</div>
                <span v-if="mode_index == 0"><em>✔</em></span>
            </div>
            <div class="modebox" v-if="mode.card" :class="{check:mode_index == 1}" @click="mode_click(1,mode.card.id)">
                <div class="title">银行卡</div>
                <span v-if="mode_index == 1"><em>✔</em></span>
            </div>
        </div>
        <div class="rule">
            <div class="h5">提现规则</div>
            <p>1.每次提现现金最低{{goldrate.min_withdrawals/10}}元起（金币{{goldrate.min_withdrawals}}）可提现100的倍数</p>
        </div>
        <div class="btn" @click="cashbtn">
            确认提现
        </div>
    </div>
    </div>
</template>

<script>
import {getgolerate,cashwithdrawal,getcard} from '@/api/api'
import  top  from '@/components/top'
import { Toast } from 'mint-ui';
export default {
  name: 'cash',
  components: {
    top
  },
  data() {
    return {
        top_arr:{left:true,title:'金币提现',right:{title:'提现明细',url:'/Rechargerecord?title=1'}},
        goldrate:'',
        dateinit:'',
        gold:'',
        user:'',
        mode:'',
        mode_index:0,
        cid:0,
    }
  },
  mounted () {
      this.getdata()
        let cardmessage = sessionStorage.getItem('card')?JSON.parse(sessionStorage.getItem('card')):''
        if(cardmessage == ''){
            this.getcardbox()
        }else{
            this.mode = cardmessage
            this.cid = cardmessage.zhifubao?cardmessage.zhifubao.id:cardmessage.card.id
        }
  },
  methods: {
    getdata(){
        this.user = JSON.parse(sessionStorage.getItem('user'))
        getgolerate().then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.goldrate = res.data.data
                this.dateinit = "输入大于"+res.data.data.min_withdrawals+"的整数"
            }
        })
    },
    getcardbox(){
        getcard().then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                if(!res.data.data.card&&!res.data.data.zhifubao){
                    this.$router.push({
                    path: '/card',
                    })
                }else{
                    this.mode = res.data.data
                    sessionStorage.setItem('card',JSON.stringify(res.data.data))
                }
            }
        })
    },
      mode_click(index,id){
          this.mode_index = index
          this.cid = id
      },
    cashbtn(){
        if(this.gold >= 1000){
            cashwithdrawal(this.gold,(this.gold-this.gold*this.goldrate.service_harge/100)/10,this.cid).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0){
                    this.gold = ''
                    Toast(res.data.message)
                    this.user.money = this.user.money - this.gold
                    let a = JSON.parse(sessionStorage.getItem('usermessage'))
                    a.money = a.money - this.gold
                    sessionStorage.setItem('usermessage',JSON.stringify(a))
                    sessionStorage.setItem('user',JSON.stringify(this.user))
                }else{
                    Toast(res.data.error)
                }
            })
        }else{
            Toast('请输入大于'+this.goldrate.min_withdrawals+'提现金额')
        }
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
    font-weight: 600;
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
    padding: 60px 30px;
    .text {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
        div {
            font-size: 28px;
            line-height: 36px;
            color: #fff;
            span {
                font-size: 28px;
                color: #ff3841;
            }
        }
        span {
            font-size: 26px;
            color: #999999;
        }
        .cashipt {
            width: 100%;
            height: 88px;
            background-color: #311d20 !important;
            color: #fff;
            font-size: 26px;
            margin-top: 20px;
            padding: 0px 30px;
        }
    }
    .messages {
        .ipt {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 32px;
            color: #fff;
            margin-bottom: 60px;
            input {
                flex: 1;
                padding: 0px 30px;
                font-size: 32px;
                color: #fff;
            }
        }
    }
    .rule {
        p {
            font-size: 26px;
            color:#999999;
            line-height: 36px;
            margin-bottom: 20px;
        }
    }
    .btn {
        width: 100%;
        height: 88px;
        border-radius: 88px;
        background-color: #ff3841;
        color: #fff;
        font-size: 36px;
        font-weight: 600;
        letter-spacing: 5px;
        text-align: center;
        line-height: 88px;
        margin-top: 40px;
    }
    .mode {
        margin-top: 42px;
        .modebox {
            color: #fff;
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
}
.center .h4 {
    font-size: 32px;
    line-height: 40px;
    border-left: 6px solid #ff3841;
    padding-left: 14px;
    color: #fff;
    margin-bottom: 30px;
    margin-top: 100px;
}
.center .h5 {
    font-size: 32px;
    line-height: 40px;
    color: #fff;
    margin-bottom: 30px;
    margin-top: 100px;
}
</style>