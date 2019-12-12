<template>
    <div class="Video_play">
        <swiper :options="Recommend" ref="Recommend" @slideChangeTransitionEnd="Recommendcallback">
          <swiper-slide v-for="(item,index) in video_data" :key="index">
            <video loop :poster="item.posterimg">
              <source :src="item.video" type="video/mp4">
            </video>
            <div class="right_nav">
            <div class="userimg" @click="personalgo(item,index)">
            <img :src="item.userimg" alt="">
            <span>+</span>
            </div>
            <div class="love" :class="{love_check:lovelist.indexOf(index)!=-1}" @click="love(index)">
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
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Video_play',
  components: {
    swiper,
    swiperSlide
  },
  props: {
     video_num: {
        type: Number
      },
  },
  data() {
    return {
      Recommend: {
        direction : 'vertical',
        height : window.innerHeight,
        observer: true,
      },
      video_arr: [],
      video_check:'',
      video_data:[
          {
              "id":1,
              "video":require("../assets/images/1.mp4"),
              "posterimg":require("../assets/images/1_1.jpg"),
              "userimg":require("../assets/images/1.jpg"),
              "love":26,
              "comment":28,
              "share":30,
              "username":"#晓亦呀",
              "title":"#我 不觉得玻璃心有什么问题，只要玻璃心没有干涉到别人",
              "musicname":"黄宛宛"
          },
          {
              "id":2,
              "video":require("../assets/images/2.mp4"),
              "posterimg":require("../assets/images/2_2.jpg"),
              "userimg":require("../assets/images/2.jpg"),
              "love":999,
              "comment":460,
              "share":200,
              "username":"#碰碰彭彭彭",
              "title":"让一下，我要来炸场子了，炸街版《西游记》，了解一下",
              "musicname":"碰碰彭彭彭"
          },
          {
              "id":3,
              "video":require("../assets/images/3.mp4"),
              "posterimg":require("../assets/images/3_3.jpg"),
              "userimg":require("../assets/images/3.jpg"),
              "love":65564,
              "comment":2015,
              "share":30,
              "username":"#带古拉K",
              "title":"和@朱潇涵小姐姐给大家拜个早年，请签收我们的舞蹈节目",
              "musicname":"带古拉K"
          },
          {
              "id":4,
              "video":require("../assets/images/4.mp4"),
              "posterimg":require("../assets/images/4_4.jpg"),
              "userimg":require("../assets/images/4.jpg"),
              "love":26,
              "comment":28,
              "share":30,
              "username":"#小洛海外跑腿",
              "title":"网红舞，卡路里，看整段的，晚上发教学视频1",
              "musicname":"小洛海外跑腿"
          },
          {
              "id":5,
              "video":require("../assets/images/5.mp4"),
              "posterimg":require("../assets/images/5_5.jpg"),
              "userimg":require("../assets/images/5.jpg"),
              "love":26,
              "comment":28,
              "share":30,
              "username":"#浙江美女榜",
              "title":"#肤白貌美大长腿，多少月薪的男生才能追求",
              "musicname":"浙江美女榜"
          }
      ],
      lovelist:''
    }
  },
  watch: {
      video_num(newval,oldval){
          if(newval == 1){
              this.video_check.pause()
          }else{
              this.video_check.play()
          }
      }
  },
  computed: {
    Recommendswiper() {
      return this.$refs.Recommend.swiper
    },
  },
  mounted () {
      if(localStorage.getItem('my_video')){
          this.video_data.push(...JSON.parse(localStorage.getItem('my_video')))
      }
    this.video_arr = document.getElementsByTagName('video')
    this.video_arr[0].play()
    this.video_check = this.video_arr[0]
    this.$emit('video_num', 0);
  },
  methods: {
      love(index){
        if(this.lovelist.indexOf(index)!=-1){
            this.lovelist = this.lovelist.split(index)[0]+ this.lovelist.split(index)[0]
            this.video_data[index].love = Number(this.video_data[index].love)-1
        }else{
            this.video_data[index].love = Number(this.video_data[index].love)+1
            this.lovelist += index
        }
      },
    Recommendcallback(){
        console.log(this.Recommendswiper.realIndex)
        for(let i = 0;i<this.video_arr.length;i++){
            if(this.Recommendswiper.realIndex == i){
                this.video_arr[i].play()
                this.video_check =this.video_arr[i]
            }else{
                this.video_arr[i].pause()
            }
        }
      if(this.Recommendswiper.realIndex == this.video_data.length-2){
      }
    },
    personalgo(val,index){
        console.log(val)
        this.$router.push({
             path:'/personal',
             query:{
                 id:index+1,
                 userimg:val.userimg,
                 username:val.username
                 } 
            })
    }
  }
}
</script>

<style scoped lang="scss">
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
.right_nav .love_check span:first-child{
    background-position: -314px -538px;
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
    font-size: 30px;
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
</style>