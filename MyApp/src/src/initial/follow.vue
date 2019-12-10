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
                <div class="user_li">
                <div class="zm">a</div>
                <div class="user">
                    <span></span>
                    <img src="../assets/images/首页 (2) (1).png" alt="">
                    <div>ation</div>
                    <div class="btn">已关注</div>
                </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="user_li">
                <div class="zm">a</div>
                <div class="user">
                    <span></span>
                    <img src="../assets/images/首页 (2) (1).png" alt="">
                    <div>ation</div>
                    <div class="btn">已关注</div>
                    <div class="gd">···</div>
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
        }
    }
  },
  computed: {
    followswiper() {
      return this.$refs.follow.swiper
    }
  },
  mounted () {
  },
  methods: {
    back(){
      window.history.go(-1)
    },
    followcallback(){
        this.tab_check = this.followswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.followswiper.slideTo(index)
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
  margin: 0px 20px;
}
.user_li .user div {
  flex: 1;
}
.user_li .user .btn {
    flex: none;
    width: 140px;
    height: 60px;
    line-height: 60px;
    border-radius: 60px;
    text-align: center;
    background-color: #311d20;
}
.user_li .user .gd {
    color: #999;
    flex: none;
    font-size: 66px;
    margin-left: 20px;
}
</style>