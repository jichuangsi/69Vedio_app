<template>
    <div class="card">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">银行卡<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">支付宝<em></em></div>
        </div>
        </div>
    </div>
    <div class="center">
        <swiper :options="cardbox" ref="cardbox" @slideChangeTransitionEnd="cardcallback">
            <swiper-slide>
                <div class="userinfo">
                    <div class="info_li" @click="iptbox(0)">
                        <span>姓名</span>
                        <div>{{name}}</div>
                        <em>></em>
                    </div>
                    <div class="info_li" @click="iptbox(1)">
                        <span>银行卡号</span>
                        <div>{{cardaccont}}</div>
                        <em>></em>
                    </div>
                    <div class="info_li" @click="iptbox(2)">
                        <span>所属银行</span>
                        <div>{{cardname}}</div>
                        <em>></em>
                    </div>
                </div>
                <div class="btn" @click="editbtn(2)">确认修改</div>
            </swiper-slide>
            <swiper-slide>
                <div class="userinfo">
                    <div class="info_li" @click="iptbox(3)">
                        <span>支付宝姓名</span>
                        <div>{{accontname}}</div>
                        <em>></em>
                    </div>
                    <div class="info_li" @click="iptbox(4)">
                        <span>支付宝账户</span>
                        <div>{{accont}}</div>
                        <em>></em>
                    </div>
                </div>
                <div class="btn" @click="editbtn(1)">确认修改</div>
            </swiper-slide>
        </swiper>
    </div>
    <div class="bj" v-if="message">
        <div class="message_box" style="-webkit-user-select:text !important;">
            <div class="title">{{message_text}}</div>
            <input type="text" v-model="name" v-if="message_index == 0">
            <input type="text" v-model="cardaccont" v-if="message_index == 1">
            <input type="text" v-model="cardname" v-if="message_index == 2">
            <input type="text" v-model="accontname" v-if="message_index == 3">
            <input type="text" v-model="accont" v-if="message_index == 4">
            <div class="btn">
                <div class="left" @click.stop="message=!message">取消</div>
                <div class="right" @click.stop="message=!message">确定</div>
            </div>
        </div>
    </div>
    <load v-if="!cardbtn"></load>
    </div>
</template>

<script>
import {getcard,editcard} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import load from '@/components/loading'
import { Toast } from 'mint-ui';
export default {
  name: 'card',
  components: {
    swiper,
    swiperSlide,
    load
  },
  data() {
    return {
        tab_check: 0,
        cardbox: {
            outHeight: true,
            observer: true,
        },
        name:'',
        cardaccont:'',
        cardname:'',
        accontname:'',
        accont:'',
        message:false,
        cardbtn:true,
        message_text:'',
        message_index:0,
    }
  },
  computed: {
    cardswiper() {
      return this.$refs.cardbox.swiper
    }
  },
  mounted () {
    let cardmessage = sessionStorage.getItem('card')?JSON.parse(sessionStorage.getItem('card')):''
    if(cardmessage == ''){
      this.getdata()
    }else{
        this.name = cardmessage.card?cardmessage.card.account_name:''
        this.cardaccont = cardmessage.card?cardmessage.card.account:''
        this.cardname = cardmessage.card?cardmessage.card.bank:''
        this.accontname = cardmessage.zhifubao?cardmessage.zhifubao.account_name:''
        this.accont = cardmessage.zhifubao?cardmessage.zhifubao.account:''
    }
  },
  methods: {
    getdata(){
        getcard().then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.name = res.data.data.card?res.data.data.card.account_name:''
                this.cardaccont = res.data.data.card?res.data.data.card.account:''
                this.cardname = res.data.data.card?res.data.data.card.bank:''
                this.accontname = res.data.data.zhifubao?res.data.data.zhifubao.account_name:''
                this.accont = res.data.data.zhifubao?res.data.data.zhifubao.account:''
                sessionStorage.setItem('card',JSON.stringify(res.data.data))
            }
        })
    },
    editbtn(type){
        let anname = type == 1?this.accontname:this.name
        let accont = type == 1?this.accont:this.cardaccont
        let bank = type == 1?'':this.cardname
        this.cardbtn = false
        editcard(anname,accont,type,bank).then(res=>{
            console.log(res)
            this.cardbtn = true
            if(res.data.resultCode == 0){
                Toast(res.data.message)
                this.getdata()
            }else {
                Toast(res.data.error)
            }
        }).catch(err=>{
            this.cardbtn = true
        })
    },
    back(){
      window.history.go(-1)
    },
    cardcallback(){
        this.tab_check = this.cardswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.cardswiper.slideTo(index)
    },
    iptbox(index){
        this.message = true
        this.message_index = index
        if(index == 0){
            this.message_text = '请输入姓名'
        }else if(index == 1){
            this.message_text = '请输入银行卡号'
        }else if(index == 2){
            this.message_text = '请输入所属银行'
        }else if(index == 3){
            this.message_text = '请输入支付宝姓名'
        }else if(index == 4){
            this.message_text = '请输入支付宝账户'
        }
    },
  }
}
</script>

<style scoped lang="scss">
.card {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
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
    bottom: 0%;
    transform: translateY(-50%);
}
.top .right {
    position: absolute;
    right: 30px;
    bottom: 20px;
    font-size: 26px;
    color: #999999;
}
.top .tab_nav {
    display: flex;
    justify-content: center;
    font-size: 32px;
    color: #999;
    line-height: 80px;
}
.top .tab_nav div {
    position: relative;
    text-align: center;
}
.top .tab_nav div:first-child{
    margin-right: 100px;
}
.top .tab_nav .tab_check {
    white-space: nowrap;
    color: #fff;
    font-weight: 600;
}
.top .tab_nav .tab_check em {
    display: inline-block;
    width: 2em;
    border-bottom: 6px solid #ff3841;
    position: absolute;
    left: 50%;
    bottom: -0px;
    transform: translateX(-50%);
}
.swiper-slide {
    height: 90vh;
    width: 100% !important;
    position: relative;
}
.center {
    padding: 60px 30px;
    .userinfo {
        padding-bottom: 43px;
        border-bottom: 1px solid #211a1a;
        .info_li {
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            line-height: 36px;
            color: #999;
            padding: 20px;
            div {
                flex: 1;
                text-align: right;
                padding: 0px 20px;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
            }
            em {
                font-style: normal;
            }
        }
    }
    .btn {
        width: 100%;
        height: 88px;
        line-height: 88px;
        text-align: center;
        color: #fff;
        font-size: 36px;
        background-color: #ff3841;
        border-radius: 88px;
        margin-top: 40px;
    }
}
.bj {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.3);
    z-index: 999;
}
.bj .btn {
    font-size: 32px;
    display: flex;
    line-height: 56px;
    border-bottom: 1px solid #0094ff;
}
.bj .btn div {
    flex: 1;
    text-align: center;
    color: #0094ff;
}
.bj .btn div:first-child {
    border-right: 1px solid #0094ff;
}

.message_box {
    width: 80%;
    background-color: rgba(197, 180, 180, 0.99);
    border-radius: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.message_box .title {
    font-size: 32px;
    line-height: 86px;
    padding-top: 10px;
    font-weight: 700;
    margin-bottom: 10px;
}
.message_box .text {
    font-size: 26px;
    line-height: 36px;
    margin-bottom: 20px;
}
.message_box .btn {
    font-size: 28px;
    line-height: 76px;
    letter-spacing: 5px;
    display: flex;
    margin-top: 40px;
    border-bottom: none;
}
.message_box .btn div {
    flex: 1;
    border-top: 1px solid #666;
    border-bottom: none;
}
.message_box .btn div:first-child {
    border-right: 1px solid #666;
}
.message_box input{
    background-color: #f2f2f2 !important;
    font-size: 28px;
    line-height: 46px;
    width: 80%;
    text-align: center;
    margin: 20px auto;
    border-radius: 20px;
}
.message_box textarea {
    background-color: rgba(255, 255, 255, 0.6) !important;
    font-size: 26px;
    line-height: 36px;
    width: 80%;
    margin: 20px auto;
    border-radius: 5px;
    height: 106px;
}
  /* iphone 3 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 1) { 
   .top {
       padding-top: 30px
   } 
}

/* iphone 4 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       padding-top: 30px
   } 
 }

/* iphone 5 */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       padding-top: 30px
   } 
 }

/* iphone 6, 6s */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       padding-top: 30px
   } 
}

/* iphone 7, 8 */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       padding-top: 30px
   } 
}

/* iphone 6+, 6s+, 7+, 8+ */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       padding-top: 30px
   } 
}

/* iphone X */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       padding-top: 40px
   } 
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
   .top {
       padding-top: 40px
   } 
}
//  xs max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .top {
       padding-top: 40px
   } 
}
</style>