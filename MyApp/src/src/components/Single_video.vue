<template>
    <div class="Single_video">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title"></div>
        <div class="right"></div>
    </div>
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
  name: 'Single_video',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      Recommend: {
        direction : 'vertical',
        height : window.innerHeight,
        observer: true,
        initialSlide:localStorage.getItem('Single_index')
      },
      video_arr: [],
      video_check:'',
      video_data:[],
      video_index:0,
      lovelist:''
    }
  },
  computed: {
    Recommendswiper() {
      return this.$refs.Recommend.swiper
    },
  },
  mounted () {
    let self = this
    console.log(self.video_data)
    self.video_data = JSON.parse(localStorage.getItem('Single'))
    self.video_index = localStorage.getItem('Single_index')

    setTimeout(function(){
        self.video_arr = document.getElementsByTagName('video')
        self.video_arr[self.video_index].play()
        self.video_check = self.video_arr[self.video_index]
    },500)
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
        this.video_index = this.Recommendswiper.realIndex
        for(let i = 0;i<this.video_arr.length;i++){
            if(this.Recommendswiper.realIndex == i){
                this.video_arr[i].play()
                this.video_check =this.video_arr[i]
            }else{
                this.video_arr[i].pause()
            }
        }
    },
    personalgo(val,index){
        localStorage.setItem('Single_index',this.video_index)
        this.$router.push({
             path:'/personal',
             query:{
                 id:index+1,
                 userimg:val.userimg,
                 username:val.username
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
.Single_video {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.top {
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 3;
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