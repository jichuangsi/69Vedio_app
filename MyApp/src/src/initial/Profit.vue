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
        <select name="" id="" v-model="selected">>
            <option value="0">全部明细</option>
            <option value="2">收入</option>
            <option value="1">支出</option>
        </select>
    </div>
    <div class="center">
        <swiper :options="Profit" ref="Profit" @slideChangeTransitionEnd="Profitcallback">
            <swiper-slide>
                <ScrollContent ref="myscrollfull" @load="Budget_loadDatas" :mescrollValue="Budget_mescrollValue" @init="Budget_mescrollsInit">
                <div class="li" v-for="(item,index) in Budget_arr" v-if="selected == 0||selected == 1&&item.gold<0||selected == 2&&item.gold>0" :key="index">
                    <div class="left_li">
                        <div>{{item.explain}}{{item.gold}}金币</div>
                        <span>{{item.add_time}}</span>
                    </div>
                    <div class="right_li">
                        {{item.gold}}
                    </div>
                </div>
                </ScrollContent>
            </swiper-slide>
            <swiper-slide>
                <ScrollContent ref="myscrollfull" @load="works_loadDatas" :mescrollValue="works_mescrollValue" @init="works_mescrollsInit">
                <div class="li" v-for="(item,index) in works_arr" :key="index">
                    <img src="../assets/images/心.png" alt="">
                    <div class="left_li">
                        <div>mic 赠送100金币</div>
                        <span>2019/09/09 12:00:00</span>
                    </div>
                    <div class="right_li">
                        +10
                    </div>
                </div>
                </ScrollContent>
            </swiper-slide>
        </swiper>
    </div>
    </div>
</template>

<script>
import {getgoldrecord} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'Profit',
  components: {
    swiper,
    swiperSlide,
    ScrollContent
  },
  data() {
    return {
        tab_check: 0,
        Profit: {
            outHeight: true,
            observer: true,
        },
        Budget_arr:[],
        works_arr:[],
        Budget_mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        works_mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        works_index:1,
        Budget_index:1,
        selected:0
    }
  },
  computed: {
    Profitswiper() {
      return this.$refs.Profit.swiper
    }
  },
  mounted () {
      this.getBudget()
      this.getworks()
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
    },
    getBudget(){
          getgoldrecord(0,this.Budget_index).then(res=>{
              console.log(res)
              if(res.data.resultCode == 0&&res.data.data.recordlist.length != 0){
                this.Budget_arr.push(...res.data.data.recordlist)
                this.Budget_index = this.Budget_index+1
              }
                if(res.data.data.recordlist.length == 0){
                    Toast('没有更多了...')
                    this.Budget_mescrolls.endByPage(0,1)
                }
                this.Budget_mescrolls.endErr()
          })    
    },
    getworks(){
          getgoldrecord(0,this.works_index,'video').then(res=>{
              console.log(res)
              if(res.data.resultCode == 0&&res.data.data.recordlist.length != 0){
                this.works_arr.push(...res.data.data.recordlist)
                this.works_index = this.works_index+1
              }
                if(res.data.data.recordlist.length == 0){
                    Toast('没有更多了...')
                    this.works_mescrolls.endByPage(0,1)
                }
                this.works_mescrolls.endErr()
          })
    },
    
    works_mescrollsInit (mescrolls) {
        this.works_mescrolls = mescrolls;
    },
    works_loadDatas(){
        this.getworks()
    },
    Budget_mescrollsInit (mescrolls) {
        this.Budget_mescrolls = mescrolls;
    },
    Budget_loadDatas(){
        this.getBudget()
    },
  }
}
</script>

<style scoped lang="scss">
.Profit {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
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
.swiper-slide {
    height: 90vh;
    width: 100% !important;
    position: relative;
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
.mescroll {
    position: absolute;
    left: 0px;
	top:0px;
	height: 90vh; /*如设置bottom:50px,则需height:auto才能生效*/
    padding-bottom: 200px;
}
  /* iphone 3 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 1) { 
   .top {
       padding-top: 30px
   } 
}

/* iphone 4 */
@media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       padding-top: 30px
   } 
 }

/* iphone 5 */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    .top {
       padding-top: 30px
   } 
 }

/* iphone 6, 6s */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       padding-top: 30px
   } 
}

/* iphone 7, 8 */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { 
    .top {
       padding-top: 30px
   } 
}

/* iphone 6+, 6s+, 7+, 8+ */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       padding-top: 30px
   } 
}

/* iphone X */
@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) { 
    .top {
       padding-top: 40px
   } 
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
   .top {
       padding-top: 40px
   } 
}
//  xs max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .top {
       padding-top: 40px
   } 
}
</style>