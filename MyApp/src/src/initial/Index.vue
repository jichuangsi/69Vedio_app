<template>
  <div class="index">
    <div class="top">
        <div class="search">
        </div>
        <div class="title">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">推荐<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">关注<em></em></div>
        </div>
    </div>
    <swiper :options="AllIndex" ref="AllIndex" @slideChangeTransitionEnd="AllIndexcallback">
      <swiper-slide>
        <!-- <swiper :options="Recommend" ref="Recommend" @slideChangeTransitionEnd="Recommendcallback">
          <swiper-slide v-for="(item,index) in video_data" :key="index">
            <video loop>
              <source :src="item.video" type="video/mp4">
            </video>
            <div class="right_nav">
            <div class="userimg" @click="personalgo()">
            <img :src="item.userimg" alt="">
            <span>+</span>
            </div>
            <div class="love">
            <span></span>
            <span>{{item.love}}</span>
            </div>
            <div class="comment">
            <span></span>
            <span>{{item.comment}}</span>
            </div>
            <div class="share">
            <span></span>
            <span>{{item.share}}</span>
            </div>
            </div>
            <div class="information">
            <div class="username">{{item.username}}</div>
            <div class="text">{{item.title}}</div>
            <div class="music">{{item.musicname}}</div>
            </div>
          </swiper-slide>
        </swiper> -->
        <videoplay :video_num="tab_check"></videoplay>
      </swiper-slide>
      <swiper-slide>
                <div class="nofollow">
                    <div class="follow_box">
                        <div class="follow_title">
                            还没有关注人动态
                        </div>
                        <div class="follow_text">
                            赶紧去寻找更多可能认识的人吧
                        </div>
                    </div>
                    <div class="follow_ul">
                        <div class="follow_li" @click="personalgo(1)">
                            <div class="userimg">
                                <img src="../assets/images/星星.png" alt="">
                            </div>
                            <div class="user">
                                <div class="username">Tina</div>
                                <div class="usersex"><span><em class="nv"></em>女</span></div>
                                <div class="usertext">可能认识的人</div>
                            </div>
                            <div class="follow_btn">关注</div>
                            <div class="follow_del">x</div>
                        </div>
                        <div class="follow_li" @click="personalgo(2)">
                            <div class="userimg">
                                <img src="../assets/images/星星.png" alt="">
                            </div>
                            <div class="user">
                                <div class="username">Tina</div>
                                <div class="usersex"><span><em class="nv"></em>女</span></div>
                                <div class="usertext">可能认识的人</div>
                            </div>
                            <div class="follow_btn">关注</div>
                            <div class="follow_del">x</div>
                        </div>
                        <div class="follow_li" @click="personalgo(3)">
                            <div class="userimg">
                                <img src="../assets/images/星星.png" alt="">
                            </div>
                            <div class="user">
                                <div class="username">Tina</div>
                                <div class="usersex"><span><em class="nan"></em>男</span></div>
                                <div class="usertext">可能认识的人</div>
                            </div>
                            <div class="follow_btn">关注</div>
                            <div class="follow_del">x</div>
                        </div>
                    </div>
                </div>
      </swiper-slide>
    </swiper>
    <foot :check_index='check_index'></foot>
  </div>
</template>

<script>
import enquip from '../lib/equipInfo'
import {register} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import  videoplay  from '@/components/Video_play'
import  foot  from '@/components/Foot'
export default {
  name: "Index",
  components: {
    swiper,
    swiperSlide,
    foot,
    videoplay
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
        a:''
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
    //   this.initialize()
    //   this.getdata()
  },
  methods: {
    initialize() {
        let self = this
      document.addEventListener(
        "deviceready",
        function(){
            console.log(enquip())
            let a = enquip()
            setTimeout(function(){
                register(a).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            },5000)
        }
      );
    },
    getdata(){
        let a = {
            sw: 'paCm',
            sh: 'oKKm',
            sp: '4',
            gv: '',
            gr: '',
            du: '9KSkr6Kioaf10KL3p6Sgrw'
        }
                register(a).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })  
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
    overflow-y: auto;
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
    background-color: #ff3841;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    margin-right: 40px;
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
    z-index: 2;
}
.top .search {
    width: 44px;
    height: 43px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -870px;
    position: absolute;
    left: 46px;
    top: 30px;
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
</style>
