<template>
    <div class="Popularity">
        <div class="top">
            <div class="search">
                <img src="../assets/images/工具箱.png" alt="">
            </div>
            <div class="title">
                人气
            </div>
        </div>
        <div class="center">
            <div class="activity">

            </div>
            <div class="nav">
                <div>
                    <span>top4</span>
                    <img src="../assets/images/4.jpg" alt="">
                    <span><em></em>52115522</span>
                </div>
                <div>
                    <span>top3</span>
                    <img src="../assets/images/3.jpg" alt="">
                    <span><em></em>52115522</span>
                </div>
                <div>
                    <span>top2</span>
                    <img src="../assets/images/2.jpg" alt="">
                    <span><em></em>52115522</span>
                </div>
                <div>
                    <span>top1</span>
                    <img src="../assets/images/1.jpg" alt="">
                    <span><em></em>52115522</span>
                </div>
            </div>
            <div class="community">
                <div class="h4">
                    社区
                </div>
                <div class="community_btn">

                </div>
            </div>
            <div class="ranking">
                <div class="h4">
                    人气榜
                </div>
                <div class="ranking_box">
                    <div class="ranking_nav">
                        <div class="ranking_text">
                            <span>邀请大神</span>
                            <span>></span>
                        </div>
                        <div class="ranking_first">
                            <img src="../assets/images/1.jpg" alt="">
                            <span>top1</span>
                        </div>
                    </div>
                    <div class="ranking_nav">
                        <div class="ranking_text">
                            <span>上传大神</span>
                            <span>></span>
                        </div>
                        <div class="ranking_first">
                            <img src="../assets/images/5.jpg" alt="">
                            <span>top1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="heat">
                <div class="h4">
                    69最热
                </div>
                <div class="heat_nav">
                    <div>
                        <span class="heat_img heat_img1"></span>
                        <span>官方推荐</span>
                    </div>
                    <div>
                        <span class="heat_img heat_img2"></span>
                        <span>最新上传</span>
                    </div>
                    <div>
                        <span class="heat_img heat_img3"></span>
                        <span>金币专区</span>
                    </div>
                    <div>
                        <span class="heat_img heat_img4"></span>
                        <span>最多播放</span>
                    </div>
                    <div>
                        <span class="heat_img heat_img5"></span>
                        <span>最多评论</span>
                    </div>
                    <div>
                        <span class="heat_img heat_img6"></span>
                        <span>最多点赞</span>
                    </div>
                </div>
            </div>
            <div class="wonderful">
                <div class="h4">
                    发现精彩
                </div>
                <div class="wonderful_nav">
                    <div class="wonderful_li" v-for="(item,index) in wonderful" :key="index" @click="singleGo(wonderful,index)">
                        <div class="wonderful_img">
                            <img :src="item.posterimg" alt="">
                            <div class="userimg">
                                <img :src="item.userimg" alt="">
                            </div>
                        </div>
                        <div class="wonderful_text">
                             {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <foot :check_index='check_index'></foot>
    </div>
</template>

<script>
import  foot  from '@/components/Foot'
export default {
  name: 'Popularity',
  components: {
    foot
  },
  data() {
    return {
        check_index:1,
        wonderful:[
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
        ]
    }
  },
  mounted () {
  },
  methods: {
    singleGo(arr,index) {
        localStorage.setItem('Single',JSON.stringify(arr))
        localStorage.setItem('Single_index',index)
        this.$router.push({
          path: '/Single_video'
        })
    }
  }
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    font-size: 34px;
    font-weight: 600;
    color: #fff;
    z-index: 2;
    background-color: #100909;
}
.top .search {
    width: 60px;
    position: absolute;
    left: 46px;
    top: 50%;
    transform: translateY(-50%);
}
.top .search img {
    width: 100%;
}
.top .title {
    text-align: center;
    line-height: 78px;
}
.center {
    padding: 95px 30px;
    padding-bottom: 200px;
}
.center .activity {
    width: 100%;
    height: 142px;
    background-color: #fff;
    margin-bottom: 40px;
}
.center .activity img {
    width: 100%;
    height: 100%;
}
.center .nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;
}
.center .nav div {
    width: 156px;
    height: 156px;
    background-color: #999;
    border-radius: 20px;
    font-size: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
     background-size: 750px 4532px;
     background-position: -16px -3232px;
}
.center .nav div img {
    width: 80px;
    border-radius: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
}
.center .nav div span {
    display: flex;
    align-items: center;
}
.center .nav div span em{
    width: 24px;
    height: 21px;
    display: inline-block;
     background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
     background-size: 750px 4532px;
     background-position: -16px -3180px;
}
.center .community {
    margin-bottom: 80px;
}
.center .community .community_btn {
    width: 690px;
    height: 100px;
    border-radius: 100px;
     background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
     background-size: 750px 4532px;
     background-position: -16px -4036px;
}
.center .ranking {
    margin-bottom: 80px;
}
.center .ranking .ranking_box {
    width: 100%;
    height: 148px;
    background-color: #1d0f11;
    display: flex;
}
.center .ranking .ranking_box .ranking_nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 20px;
}
.center .ranking .ranking_box .ranking_nav:first-child{
    border-right: 1px solid #2b2121;
}
.center .ranking .ranking_box .ranking_text{
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    margin-bottom: 20px;
}
.center .ranking .ranking_box .ranking_first{
    display: flex;
    justify-content: center;
    font-size: 26px;
    align-items: center;
}
.center .ranking .ranking_box .ranking_first img {
    width: 72px;
    margin-right: 20px;
    border-radius: 50%;
}
.center .heat {
    margin-bottom: 80px;
}
.center .heat .heat_nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.center .heat .heat_nav div{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
    font-size: 28px;
    color: #fff;
}
.center .heat .heat_nav div .heat_img {
     width: 70px;
     height: 70px;
     background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
     background-size: 750px 4532px;
     margin-bottom: 10px;
}
.center .heat .heat_nav div .heat_img1 {
     background-position: -16px -3431px;
}
.center .heat .heat_nav div .heat_img2 {
     background-position: -16px -3529px;
}
.center .heat .heat_nav div .heat_img3 {
     background-position: -16px -3629px;
}
.center .heat .heat_nav div .heat_img4 {
     background-position: -16px -3727px;
}
.center .heat .heat_nav div .heat_img5 {
     background-position: -16px -3827px;
}
.center .heat .heat_nav div .heat_img6 {
     background-position: -16px -3925px;
}
.center .wonderful {
    margin-bottom: 80px;
}
.center .wonderful .wonderful_nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.center .wonderful .wonderful_nav .wonderful_li {
    width: 330px;
    margin-bottom: 20px;
    margin-right: 20px;
}
.center .wonderful .wonderful_nav .wonderful_li:nth-child(2n){
    margin-right: 0px;
}
.center .wonderful .wonderful_nav .wonderful_li .wonderful_img {
    width: 100%;
    height: 595px;
    position: relative;
}
.center .wonderful .wonderful_nav .wonderful_li .wonderful_img img {
    width: 100%;
    height: 100%;
    display: block;
}
.center .wonderful .wonderful_nav .wonderful_li .wonderful_img .userimg {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 10px;
}
.center .wonderful .wonderful_nav .wonderful_li .wonderful_text{
    width: 90%;
    margin: 20px auto;
    font-size: 26px;
    line-height: 36px;
    color: #fff;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.center .h4 {
    font-size: 32px;
    line-height: 40px;
    border-left: 6px solid #ff3841;
    padding-left: 14px;
    color: #fff;
    margin-bottom: 30px;
}
</style>