<template>
    <div class="news">
        <top :top_arr="top_arr"></top>
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">通知<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">附近<em></em></div>
            <div :class="{tab_check:tab_check == 2}" @click="tabclick(2)">好友<em></em></div>
            <div class="add">
                <router-link to="searchUser">
                    添加关注
                </router-link>
            </div>
        </div>
        <swiper :option="news" ref="news" @slideChangeTransitionEnd="newscallback">
            <swiper-slide>
                <notice></notice>
            </swiper-slide>
            <swiper-slide>
                <nearby></nearby>
            </swiper-slide>
            <swiper-slide>
                <friend></friend>
            </swiper-slide>
        </swiper>
        <foot :check_index='check_index'></foot>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import  notice  from '@/components/notice'
import  nearby  from '@/components/nearby'
import  friend  from '@/components/friend'
import  foot  from '@/components/Foot'
import  top  from '@/components/top'
export default {
  name: 'news',
  components: {
    swiper,
    swiperSlide,
    notice,
    nearby,
    friend,
    foot,
    top
  },
  data() {
    return {
      top_arr:{left:false,title:'消息',right:{title:'开始上传',url:false}},
      check_index:3,
      tab_check: 0,
      news:{
          autoHeight: true
      }
    }
  },
  computed: {
    newsswiper() {
      return this.$refs.news.swiper
    }
  },
  mounted () {
  },
  methods: {
    newscallback(){
        this.tab_check = this.newsswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.newsswiper.slideTo(index)
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
.tab_nav {
    display: flex;
    font-size: 28px;
    color: #999;
    line-height: 48px;
    height: 70px;
    border-bottom: 1px solid #211a1a;
}
.tab_nav div {
    position: relative;
    padding: 0px 30px;
    height: 48px;
    text-align: center;
}
.tab_nav .tab_check {
    white-space: nowrap;
    color: #fff;
    font-weight: 600;
}
.tab_nav .tab_check em {
    display: inline-block;
    width: 1em;
    border-bottom: 6px solid #ff3841;
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
}
.tab_nav .add {
    flex: 1;
    text-align: right;
    color: #fff;
    font-size: 32px;
    margin-top: 2px;
}
</style>