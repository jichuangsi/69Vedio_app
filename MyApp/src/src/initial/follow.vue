<template>
    <div class="follow">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">
        </div>
    </div>
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">关注<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">粉丝<em></em></div>
        </div>
      <div class="ipt">
        <div></div><input type="text" placeholder="搜索">
      </div>
    <div class="center">
        <swiper :options="follow" ref="follow" @slideChangeTransitionEnd="followcallback">
            <swiper-slide>
                <div class="user_li" v-for="(item,index) in concerns_arr" :key="index">
                <div class="user">
                    <span></span>
                    <img :src="item.headimgurl" alt="">
                    <div>{{item.username}}</div>
                    <div class="follow_btn NO" v-if="item.concerned == null" @click.stop="add_concern(item.id,index)">关注</div>
                    <div class="follow_btn" v-if="item.concerned != null" @click.stop="del_concern(item.id,index)">已关注</div>
                </div>
                </div>
            </swiper-slide>
            <swiper-slide> 
                <div class="user_li" v-for="(item,index) in concerneds_arr" :key="index">
                <div class="user">
                    <span></span>
                    <img :src="item.headimgurl" alt="">
                    <div>{{item.username}}</div>
                    <div class="follow_btn NO" v-if="item.concerned == null" @click.stop="add_concern(item.id,index)">关注</div>
                    <div class="follow_btn" v-if="item.concerned != null" @click.stop="del_concern(item.id,index)">已关注</div>
                    <div class="gd" @click="bottom_check = !bottom_check;cid = item.id" v-if="ycstatus == 0">···</div>
                </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
    <div class="bj" v-if="bottom_check" @click="bottom_check = !bottom_check">
        <div class="bottom_box" :class="{bottom_check:bottom_check}">
            <div class="xz" @click.stop="message=!message;bottom_check = !bottom_check">
                <div>移出</div>
            </div>
            <div class="xian"></div>
            <div class="qx" @click.stop="bottom_check = !bottom_check">取消</div>
        </div>
    </div>
    <div class="bj" v-if="message" @click="message=!message">
        <div class="message_box">
            <div class="title">移除粉丝</div>
            <div class="text">对方将不再关注你，且不会收到通知，<br>你也不会被推荐给对方</div>
            <div class="btn">
                <div class="left" @click.stop="message=!message">取消</div>
                <div class="right" @click.stop="del">移除</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {getconcerns,getconcerneds,removeconcerneds,addconcern,delconcern} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Toast } from 'mint-ui';
export default {
  name: 'follow',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
        tab_check: 0,
        follow: {
            outHeight: true,
            observer: true,
        },
        concerns_arr:[],
        concerneds_arr:[],
        bottom_check:false,
        ycstatus:0,
        cid:'',
        message:false
    }
  },
  computed: {
    followswiper() {
      return this.$refs.follow.swiper
    }
  },
  mounted () {
      this.getdata()
      this.followswiper.slideTo(this.$route.query.index)
      this.ycstatus = this.$route.query.my == 0?0:1
  },
  methods: {
    getdata(){
        getconcerns(161).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.concerns_arr = res.data.data.members
            }
        })
        getconcerneds(161).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.concerneds_arr = res.data.data.members
            }
        })
    },
    back(){
      window.history.go(-1)
    },
    followcallback(){
        this.tab_check = this.followswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.followswiper.slideTo(index)
    },
    del(){
        removeconcerneds(this.cid).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.getdata()
                Toast(res.data.message)
                this.message = false
            }
        })
    },
    add_concern(id,index){
        addconcern(id).then(res=>{
            // console.log(res)
            if(res.data.resultCode == 0){
                this.getdata()
                Toast(res.data.message)
            }
        })
    },
    del_concern(id,index){
        delconcern(id).then(res=>{
            // console.log(res)
            if(res.data.resultCode == 0){
                this.getdata()
                Toast(res.data.message)
            }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 80px;
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
.tab_nav {
    display: flex;
    justify-content: center;
    font-size: 28px;
    color: #999;
    border-bottom: 1px solid #211a1a;
    line-height: 80px;
    padding-bottom: 10px;
}
.tab_nav div {
    position: relative;
    text-align: center;
}
.tab_nav div:first-child{
    margin-right: 100px;
}
.tab_nav .tab_check {
    white-space: nowrap;
    color: #fff;
    font-weight: 600;
}
.tab_nav .tab_check em {
    display: inline-block;
    width: 100%;
    border-bottom: 6px solid #ff3841;
    position: absolute;
    left: 50%;
    bottom: -0px;
    transform: translateX(-50%);
}

.ipt {
    width: 100%;
    height: 63px;
    display: flex;
    font-size: 26px;
    align-items: center;
    color: #999;
    padding: 0px 30px;
    border-bottom: 1px solid #211a1a;
}
.ipt div {
    width: 44px;
    height: 43px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -870px;
}
.ipt input {
  flex: 1;
  color: #fff;
  padding: 0px 30px;
}
.sx {
    width: 100%;
    height: 70px;
    background-color: #311d20;
    color: #fff;
    font-size: 30px;
    padding: 0px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sx div {
    flex: 1;
}
.sx select {
    width: 150px;
    height: 70px;
    color: #fff;
    font-size: 30px;
    text-align-last: center;
}
.sx select option {
    color: #333333;
    border-bottom: 1px solid #999999;
    text-align: center;
}
.center {
    padding: 60px 30px;
    .li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 60px;
        line-height: 36px;
        img {
            width: 52px;
            height: 52px;
            margin-right: 20px;
        }
        .left_li {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 28px;
            color: #fff;
            font-weight: 600;
            span {
                font-size: 26px;
                color: #999;
                font-weight: 500;
                margin-top: 20px;
            }
        }
        .right_li {
            color: #fff;
            font-size: 26px;
        }
    }
}

.user_li {
  width: 100%;
  font-size: 26px;
  color: #999;
  padding: 20px 0px;
}
.user_li .zm {
  margin-bottom: 10px;
}
.user_li .user{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: #fff;
}
.user_li .user span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #999;
}
.user_li .user img {
  width: 66px;
  height: 66px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0px 20px;
}
.user_li .user div {
  flex: 1;
}
.user_li .user .follow_btn {
    flex: none;
    width: 140px;
    height: 60px;
    line-height: 60px;
    border-radius: 60px;
    text-align: center;
    background-color: #311d20;
}
.user_li .user .NO {
    background-color: #ff3841;
}
.user_li .user .gd {
    color: #999;
    flex: none;
    font-size: 66px;
    margin-left: 20px;
}

.bottom_box {
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    transform: translateY(100%);
}
.bottom_check {
    transform: translateY(0%)
}
.bottom_check .ps {
    width: 100%;
    height: 136px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32px;
    text-align: center;
    margin: 0 auto;
}
.bottom_check .ps .text {
    font-size: 26px;
    color: #999;
    margin-top: 10px;
}
.bottom_check .xz {
    width: 100%;
    text-align: center;
    font-size: 32px;
    line-height: 107px;
    margin: 0 auto;
    border-bottom: 1px solid #dddddd;
}
.bottom_check .xian {
    width: 100%;
    height: 12px;
    background-color: #dddddd;
}
.bottom_check .qx {
    width: 100%;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
}
.bj {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.3);
    z-index: 9;
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
    line-height: 46px;
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
    line-height: 56px;
    display: flex;
}
.message_box .btn div {
    flex: 1;
    border-top: 1px solid #666;
}
.message_box .btn div:first-child {
    border-right: 1px solid #666;
}
  /* iphone 3 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 1) { 
   .top {
       margin-top: 30px
   } 
}

/* iphone 4 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       margin-top: 30px
   } 
 }

/* iphone 5 */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       margin-top: 30px
   } 
 }

/* iphone 6, 6s */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       margin-top: 30px
   } 
}

/* iphone 7, 8 */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       margin-top: 30px
   } 
}

/* iphone 6+, 6s+, 7+, 8+ */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       margin-top: 30px
   } 
}

/* iphone X */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       margin-top: 40px
   } 
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
   .top {
       margin-top: 40px
   } 
}
//  xs max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .top {
       margin-top: 40px
   } 
}
</style>