<template>
    <div class="Profit">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">收支明细<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">作品收益<em></em></div>
        </div>
        </div>
    </div>
    <div class="sx">
        <div>筛选</div>
        <select name="" id="">
            <option value="">全部明细</option>
            <option value="">收入</option>
            <option value="">支出</option>
        </select>
    </div>
    <div class="center">
        <swiper :options="Profit" ref="Profit" @slideChangeTransitionEnd="Profitcallback">
            <swiper-slide>
                <div class="li">
                    <div class="left_li">
                        <div>提现100金币</div>
                        <span>2019/09/09 12:00:00</span>
                    </div>
                    <div class="right_li">
                        已放入钱包
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="li">
                    <img src="../assets/images/心.png" alt="">
                    <div class="left_li">
                        <div>mic 赠送100金币</div>
                        <span>2019/09/09 12:00:00</span>
                    </div>
                    <div class="right_li">
                        +10
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
  name: 'Profit',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
        tab_check: 0,
        Profit: {
            outHeight: true,
            observer: true,
        }
    }
  },
  computed: {
    Profitswiper() {
      return this.$refs.Profit.swiper
    }
  },
  mounted () {
  },
  methods: {
    back(){
      window.history.go(-1)
    },
    Profitcallback(){
        this.tab_check = this.Profitswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.Profitswiper.slideTo(index)
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
.top .tab_nav {
    display: flex;
    justify-content: center;
    font-size: 28px;
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
</style>