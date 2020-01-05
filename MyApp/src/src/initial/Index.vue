<template>
  <div class="index">
    <div class="top">
        <div class="search" @click="searchListgo">
        </div>
        <div class="title">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">推荐<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">关注<em></em></div>
        </div>
    </div>
    <swiper :options="AllIndex" ref="AllIndex" @slideChangeTransitionEnd="AllIndexcallback">
      <swiper-slide>
        <videoplay :video_num="tab_check"></videoplay>
      </swiper-slide>
      <swiper-slide>
          <followvideo :video_num="tab_check" v-if='!followstatus'></followvideo>
                <div class="nofollow" v-show='followstatus'>
                    <div class="follow_box">
                        <div class="follow_title">
                            还没有关注人动态
                        </div>
                        <div class="follow_text">
                            赶紧去寻找更多可能认识的人吧
                        </div>
                    </div>
                    <div class="follow_ul">
                    <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
                        <div class="follow_li" v-for="(item,index) in notice_arr" :key="index" @click="personalgo(item.id)">
                            <div class="userimg">
                                <img :src="item.headimgurl" alt="">
                            </div>
                            <div class="user">
                                <div class="username">{{item.username}}</div>
                                <div class="usersex"><span><em :class="{nv:item.sex == 2,nan:item.sex == 1}"></em>{{item.sex == 1?'男':'女'}}</span></div>
                                <div class="usertext">可能认识的人</div>
                            </div>
                            <div class="follow_btn NO" v-if="item.concerned == null" @click.stop="add_concern(item.id,index)">关注</div>
                            <div class="follow_btn" v-if="item.concerned != null" @click.stop="del_concern(item.id,index)">已关注</div>
                        </div>
                    </ScrollContent>
                    </div>
                </div>
      </swiper-slide>
    </swiper>
    <foot :check_index='check_index'></foot>
  </div>
</template>

<script>
import enquip from '../lib/equipInfo'
import {register,locate,recommendconcerns,addconcern,delconcern,concernvideos} from '@/api/api'
import { Toast } from 'mint-ui';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import  videoplay  from '@/components/Video_play'
import  followvideo  from '@/components/follow_video'
import ScrollContent from '@/components/ScrollContent'
import  foot  from '@/components/Foot'
export default {
  name: "Index",
  components: {
    swiper,
    swiperSlide,
    foot,
    videoplay,
    ScrollContent,
    followvideo
  },
  data() {
    return {
      check_index:0,
      tab_check: 0,
      AllIndex: {
        direction : 'horizontal'
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        },
        notice_arr:[],
        mescrollValue: {up: true, down: false},
        page:1,
        followstatus: false,
    };
  },
  computed: {
    AllIndexswiper() {
      return this.$refs.AllIndex.swiper
    },
    Recommendswiper() {
      return this.$refs.Recommend.swiper
    }
  },
  mounted() {
    this.initialize()
    this.statusfollow()
    this.getdata()
  },
  methods: {
    initialize() {
        let self = this
        document.addEventListener(
            "deviceready",
            function(){
                if(!sessionStorage.getItem('dq')){
                    let options = {
                        enableHighAccuracy: true,
                        maximumAge: 3600000
                    }
                        
                    let watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                    function onSuccess(position) {
                            locate(position.coords.latitude,position.coords.longitude,position.coords.accuracy,position.timestamp).then(res=>{
                                if(res.data.resultCode == 0){
                                    sessionStorage.setItem('dq',res.data.data)
                                }
                            })
                    };

                    function onError(error) {
                        console.log(error);
                    }
                }
            }
        )
    },
    AllIndexcallback(){
      this.tab_check = this.AllIndexswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.AllIndexswiper.slideTo(index)
    },
    personalgo(id){
        this.$router.push({
             path:'/personal',
             query:{
                 id:id
                 } 
        })
    },
    statusfollow(){
        concernvideos(1).then(res=>{
            if(res.data.data.videos.length==0){
                this.followstatus = true
            }
        })
    },
    getdata(){
      recommendconcerns(this.page).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.members.length != 0){
                this.notice_arr.push(...res.data.data.members)
                this.page = this.page + 1
                console.log(this.notice_arr)
            }
            if(res.data.data.members.length == 0){
                Toast('没有更多了...')
                this.mescrolls.endByPage(0,1)
            }
            this.mescrolls.endErr()
        })
    },
    add_concern(id,index){
        console.log(id)
        addconcern(id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
            this.notice_arr[index].concerned = 0
                Toast(res.data.message)
            }
        })
    },
    del_concern(id,index){
        delconcern(id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.notice_arr[index].concerned = null
                Toast(res.data.message)
            }
        })
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    loadDatas(){
          this.getdata()
    },
    searchListgo(){
        this.$router.push({
             path:'/searchList'
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide {
    height: 100vh !important;
    background-color: #100909;
}
.swiper-slide video {
    width: 100%;
    height: 100%;
    /* object-fit: fill; */
    background-color: #100909;
}
.right_nav {
    position: fixed;
    right: 27px;
    bottom: 228px;
}
.right_nav div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 24px;
    margin-bottom: 60px;
    position: relative;
}
.right_nav div img {
    width: 70px;
}
.right_nav .userimg img {
    background-color: #fff;
    border-radius: 50%;
}
.right_nav .userimg span {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    position: absolute;
    bottom: -10px;
    background-color: #ff3841;
    border-radius: 50%;
}
.right_nav .love span:first-child{
    width: 70px;
    height: 61px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -538px;
    margin-bottom: 10px;
}
.right_nav .comment span:first-child{
    width: 71px;
    height: 70px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -643px;
    margin-bottom: 10px;
}
.right_nav .share span:first-child{
    width: 70px;
    height: 60px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -754px;
    margin-bottom: 10px;
}
.information {
    font-size: 24px;
    line-height: 46px;
    width: 60%;
    color: #fff;
    position: fixed;
    left: 30px;
    bottom: 126px;
}
.information div {
    margin-bottom: 30px;
}
.information .username {
    font-size: 36px;
}
.nofollow {
    width: 100%;
    height: 100vh;
    background-color: #100909;
    display: block;
    padding: 0px 30px;
    padding-bottom: 200px;
    overflow-y: auto;
}
.nofollow .follow_box {
    width: 100%;
    height: 460px;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #211a1a;
    overflow: hidden;
    margin-bottom: 50px;
}
.nofollow .follow_box .follow_title {
    font-size: 34px;
    line-height: 46px;
    font-weight: 600;
    margin-top: 260px;
    margin-bottom: 34px;
}
.nofollow .follow_box .follow_text {
    font-size: 28px;
    line-height: 46px;
    color: #999999;
}
.nofollow .follow_ul {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
}
.nofollow .follow_ul .follow_li {
    width: 100%;
    display: flex;
    font-size: 26px;
    color: #fff;
    align-items: center;
    margin-bottom: 50px;
}
.nofollow .follow_ul .follow_li .userimg {
    width: 1rem;
    margin-right: 26px;
}
.nofollow .follow_ul .follow_li .userimg img {
    width: 100%;
}
.nofollow .follow_ul .follow_li .user {
    flex: 1;
}
.nofollow .follow_ul .follow_li .user div{
    margin-bottom: 10px;
    line-height: 36px;
}
.nofollow .follow_ul .follow_li .user .usersex span {
    padding: 5px 10px;
    padding-top: 0px;
    background-color: #221214;
    border-radius: 5px;
}
.nofollow .follow_ul .follow_li .user .usersex span em {
    display: inline-block;
    width: 18px;
    height: 21px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    vertical-align: middle;
    margin-right: 10px;
}
.nofollow .follow_ul .follow_li .user .usersex span .nv {
    background-position: -16px -413px;
}
.nofollow .follow_ul .follow_li .user .usersex span .nan {
    background-position: -16px -470px;
}
.nofollow .follow_ul .follow_li .follow_btn {
    width: 130px;
    height: 60px;
    border-radius: 60px;
    background-color: #311d20;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    margin-right: 40px;
}
.nofollow .follow_ul .follow_li .NO {
    background-color: #ff3841;
}
.nofollow .follow_ul .follow_li .follow_del {
    width: 24px;
}
.top {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    font-size: 34px;
    font-weight: 500;
    color: #999999;
    z-index: 4;
}
.top .search {
    width: 44px;
    height: 43px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -870px;
    margin: 10px;
    position: absolute;
    left: 46px;
    bottom: -10px;
}
.top .title {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    line-height: 48px;
}
.top .title div {
    position: relative;
}
.top .title div:first-child{
    margin-right: 60px;
}
.top .title .tab_check {
    white-space: nowrap;
    color: #fff;
    font-weight: 600;
}
.top .title .tab_check em {
    display: inline-block;
    width: 100px;
    border-bottom: 6px solid #ff3841;
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
}
.mescroll {
    position: absolute;
    left: 20px;
    top: 20px;
	height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}

  /* iphone 3 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 1) { 
   .top {
       top: 30px
   } 
}

/* iphone 4 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       top: 30px
   } 
 }

/* iphone 5 */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       top: 30px
   } 
 }

/* iphone 6, 6s */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       top: 30px
   } 
}

/* iphone 7, 8 */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       top: 30px
   } 
}

/* iphone 6+, 6s+, 7+, 8+ */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       top: 30px
   } 
}

/* iphone X */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       top: 50px
   } 
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
   .top {
       top: 50px
   } 
}
/* // xs max */
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .top {
       top: 50px
   } 
}
</style>
