<template>
    <div class="personal">
    <div class="top">
        <div class="left" @click="back">
        </div>
        <div class="right">
        </div>
        <img src="../assets/images/cd29fe54b110d82bbe16d8400e0383b6.jpg" alt="">
    </div>
    <div class="center">
        <div class="user">
            <div class="userimg">
                <img :src="userimg" alt="">
                <div class="user_box">
                    <div class="username">{{username}}</div>
                    <div class="usersex">账户：545454136323</div>
                    <div class="usertext">广州市 25岁</div>
                </div>
            </div>
            <div class="follow_btn">关注</div>
            <div class="user_btn">私信</div>
        </div>
        <div class="synopsis">
            个人简介 <span>(100字以内)</span>
        </div>
        <div class="textare">

        </div>
        <div class="num">
            <div>
                <span>156</span>
                粉丝
            </div>
            <div>
                <span>156</span>
                关注
            </div>
            <div>
                <span>156</span>
                被赞
            </div>
        </div>
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">作品<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">喜欢<em></em></div>
            <div :class="{tab_check:tab_check == 2}" @click="tabclick(2)">购买<em></em></div>
        </div>
        <swiper :options="tab_my" ref="tab_my" @slideChangeTransitionEnd="tab_mycallback">
            <swiper-slide>
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in works_arr" :key="index">
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
            </swiper-slide>
            <swiper-slide>
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in love_arr" :key="index">
                            <div class="wonderful_img">
                                <img :src="item.img" alt="">
                                <div class="userimg">
                                    <img :src="item.userimg" alt="">
                                </div>
                            </div>
                            <div class="wonderful_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
            </swiper-slide>
            <swiper-slide>
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in purchase_arr" :key="index">
                            <div class="wonderful_img">
                                <img :src="item.img" alt="">
                                <div class="userimg">
                                    <img :src="item.userimg" alt="">
                                </div>
                            </div>
                            <div class="wonderful_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
            </swiper-slide>
        </swiper>
    </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'personal',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
        check_index:4,
        tab_check: 0,
        userimg:'',
        username:'',
        tab_my: {
            outHeight: true,
            observer: true,
        },
        works_arr:[
        ],
        love_arr:[
        ],
        purchase_arr:[
        ]
    }
  },
  computed: {
    tab_myswiper() {
      return this.$refs.tab_my.swiper
    }
  },
  mounted () {
      console.log(this.$route.query.userimg)
      console.log(this.$route.query.username)
      console.log(this.$route.query.id)
      this.userimg = this.$route.query.userimg?this.$route.query.userimg:require('../assets/images/星星.png')
      this.username = this.$route.query.username?this.$route.query.username:'爱笑的女孩'
  },
  methods: {
    back(){
      window.history.go(-1)
    },
    tab_mycallback(){
        this.tab_check = this.tab_myswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.tab_myswiper.slideTo(index)
    }
  }
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
}
.top img{
    width: 100%;
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
    top: 10px;
}
.top .right {
    width: 40px;
    height: 34px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -2068px;
    position: absolute;
    right: 30px;
    top: 10px;
}
.center {
    padding: 0px 30px;
    padding-bottom: 200px;
    position: relative;
}
.center .user {
    width: 100%;
    display: flex;
    font-size: 26px;
    color: #fff;
    align-items: top;
    justify-content: space-between;
    margin-bottom: 50px;
}
.center .user .userimg {
    flex: 1;
}
.center .user .userimg img {
    width: 160px;
    margin-right: 26px;
    background-color: #fff;
    border-radius: 50%;
    margin-top: -80px;
}
.center .user .user_box {
    flex: 1;
}
.center .user .user_box div{
    margin-bottom: 10px;
    line-height: 36px;
}
.center .user .follow_btn {
    width: 130px;
    height: 60px;
    border-radius: 60px;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    background-color: #ff3841;
    color: #fff;
    margin-right: 20px;
    margin-top: 20px;
}
.center .user .user_btn {
    width: 130px;
    height: 60px;
    border-radius: 60px;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    background-color: #999999;
    color: #fff;
    margin-top: 20px;
}
.center .watch {
    font-size: 32px;
    line-height: 46px;
    color: #fff;
    margin: 40px 0px;
}
.center .synopsis {
    font-size: 26px;
    color: #fff;
    margin-bottom: 20px;
}
.center .synopsis span{
    font-size: 24px;
    color: #999;
}
.center .textare {
    margin-bottom: 45px;
    padding: 20px;
    line-height: 36px;
    font-size: 22px;
    color: #999999;
    border: 1px solid #2b2121;
}
.center .num {
    width: 100%;
    height: 36px;
    font-size: 26px;
    margin-bottom: 40px;
}
.center .num div {
    display: inline-block;
    color: #9999;
    margin-left: 20px;
    line-height: 36px;
    position: relative;
}
.center .num div span {
    color: #fff;
}
.center .num div:first-child {
    margin-left: 0px;
}
.center .nav {
    width: 100%;
    font-size: 28px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    color: #fff;
}
.center .nav div {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.center .nav div img {
    width: 64px;
    margin-bottom: 20px;
}
.center .ranking_box {
    width: 100%;
    height: 148px;
    background-color: #1d0f11;
    display: flex;
    margin-bottom: 40px;
}
.center .ranking_box .ranking_nav {
    flex: 1;
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding: 20px;
}
.center .ranking_box .ranking_nav:first-child{
    border-right: 1px solid #2b2121;
}
.center .ranking_box .ranking_text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 28px;
    margin-bottom: 20px;
}
.center .ranking_box .ranking_text span:last-child {
    margin-top: 26px;
    color: #999999;
}
.center .ranking_box .ranking_first{
    display: flex;
    justify-content: center;
    font-size: 26px;
    align-items: center;
}
.center .ranking_box .ranking_first img {
    width: 106px;
    margin-right: 20px;
}
.center .tab_nav {
    display: flex;
    justify-content: center;
    font-size: 28px;
    color: #999;
    line-height: 48px;
}
.center .tab_nav div {
    position: relative;
    flex: 1;
    text-align: center;
}
.center .tab_nav div:first-child{
    margin-right: 60px;
}
.center .tab_nav .tab_check {
    white-space: nowrap;
    color: #fff;
    font-weight: 600;
}
.center .tab_nav .tab_check em {
    display: inline-block;
    width: 100%;
    border-bottom: 6px solid #ff3841;
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
}
.center .swiper-container {
    margin-top: 20px;
}
.center .wonderful_nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.center .wonderful_nav .wonderful_li {
    width: 330px;
    margin-bottom: 20px;
    margin-right: 20px;
}
.center .wonderful_nav .wonderful_li:nth-child(2n){
    margin-right: 0px;
}
.center .wonderful_nav .wonderful_li .wonderful_img {
    width: 100%;
    height: 595px;
    position: relative;
}
.center .wonderful_nav .wonderful_li .wonderful_img img {
    width: 100%;
    height: 100%;
    display: block;
}
.center .wonderful_nav .wonderful_li .wonderful_img .userimg {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 10px;
}
.center .wonderful_nav .wonderful_li .wonderful_text{
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
</style>