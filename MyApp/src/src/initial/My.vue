<template>
    <div class="My">
    <ScrollContent ref="myscrollfull" class="my_scroll" @reload="my_reloadDatas" :mescrollValue="my_mescrollValue" @init="my_mescrollsInit">
    <div class="top">
        <img src="../assets/images/cd29fe54b110d82bbe16d8400e0383b6.jpg" alt="">
    </div>
    <div class="center">
        <div class="user">
            <div class="userimg">
                <img :src="fileimg" alt="">
            </div>
            <div class="user_box">
                <div class="username">
                    {{nickname}}
                    <span v-if="vipstate == 0">(普通用户)</span>
                    <span class="vipuser" v-if="vipstate == 1">(VIP用户)</span>
                </div>
                <div class="usersex">账户：{{username}}</div>
                <div class="usertext">{{region}} {{year}}岁</div>
            </div>
            <div class="user_btn">
                <router-link to="edit">
                    编辑
                </router-link>
            </div>
        </div>
        <div class="watch">
            剩余观看次数：{{see}}
        </div>
        <div class="synopsis">
            个人简介 <span>(100字以内)</span>
        </div>
        <div class="textare">
            {{introduce}}
        </div>
        <div class="num">
            <div @click="follow_go(1)">
                <span>{{fansnum}}</span>
                粉丝
            </div>
            <div @click="follow_go(0)">
                <span>{{follownum}}</span>
                关注
            </div>
            <div>
                <span>{{fabulous}}</span>
                被赞
            </div>
            <div>
                <span>{{money}}</span>
                金币
            </div>
        </div>
        <div class="nav">
            <div>
                <div class="fxwx"></div>
                <span>分享无限</span>
            </div>
            <div>
                <router-link to="wallet">
                    <div class="wdqb"></div>
                    <span>我的钱包</span>
                </router-link>
            </div>
            <div>
                <router-link to="VIP">
                    <div class="vipcz"></div>
                    <span>VIP充值</span>
                </router-link>
            </div>
            <div>
                <router-link to="Extension">
                    <div class="dlzq"></div>
                    <span>代理赚钱</span>
                </router-link>
            </div>
        </div>
        <div class="ranking_box">
            <div class="ranking_nav">
                <div class="ranking_text">
                    <span>相册</span>
                    <span>我的照片</span>
                </div>
                <div class="ranking_first wdzp">
                </div>
            </div>
            <div class="ranking_nav">
                <div class="ranking_text">
                    <span>社区</span>
                    <span>我的社区</span>
                </div>
                <div class="ranking_first wdsq">
                </div>
            </div>
        </div>
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">作品<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">喜欢<em></em></div>
            <div :class="{tab_check:tab_check == 2}" @click="tabclick(2)">购买<em></em></div>
        </div>
        <swiper :options="tab_my" ref="tab_my" @slideChangeTransitionEnd="tab_mycallback">
            <swiper-slide>
                <ScrollContent ref="myscrollfull" @load="works_loadDatas" :mescrollValue="works_mescrollValue" @init="works_mescrollsInit">
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in works_arr" :key="index" @click="singleGo(item)">
                            <div class="wonderful_img">
                                <img :src="item.thumbnail" alt="">
                                <div class="userimg">
                                    <img :src="item.headimgurl" alt="">
                                </div>
                            </div>
                            <div class="wonderful_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                </ScrollContent>
            </swiper-slide>
            <swiper-slide>
                <ScrollContent ref="myscrollfull" @load="love_loadDatas" :mescrollValue="love_mescrollValue" @init="love_mescrollsInit">
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in love_arr" :key="index" @click="singleGo(item)">
                            <div class="wonderful_img">
                                <img :src="item.thumbnail" alt="">
                                <div class="userimg">
                                    <img :src="item.headimgurl" alt="">
                                </div>
                            </div>
                            <div class="wonderful_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                </ScrollContent>
            </swiper-slide>
            <swiper-slide>
                <ScrollContent ref="myscrollfull" @load="purchase_loadDatas" :mescrollValue="purchase_mescrollValue" @init="purchase_mescrollsInit">
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in purchase_arr" :key="index" @click="singleGo(item)">
                            <div class="wonderful_img">
                                <img :src="item.thumbnail" alt="">
                                <div class="userimg">
                                    <img :src="item.headimgurl" alt="">
                                </div>
                            </div>
                            <div class="wonderful_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                </ScrollContent>
            </swiper-slide>
        </swiper>
    </div>
    </ScrollContent>
    <foot :check_index='check_index'></foot>
    </div>
</template>

<script>
import {myvideos,mylike,mybuyvideos,getmemberinfo} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import  foot  from '@/components/Foot'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
import {mapGetters} from 'vuex'
import store from '@/store';
export default {
  name: 'My',
  components: {
    swiper,
    swiperSlide,
    foot,
    ScrollContent
  },
  data() {
    return {
        check_index:4,
        tab_check: 0,
        tab_my: {
            outHeight: true,
            observer: true,
        },
        works_arr:[],
        love_arr:[],
        purchase_arr:[],
        works_index:1,
        love_index:1,
        purchase_index:1,
        my_mescrollValue: {up: false, down: true},     //页面你是否需要下拉上拉加载
        works_mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        love_mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        purchase_mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        username:'',
        nickname:'',
        introduce:'',
        sex:'',
        birthday:'',
        fileimg:'',
        region:'',
        year:'',
        fansnum:'',
        follownum:'',
        money:'',
        fabulous:'',
        see:'',
        vipstate:0
    }
  },
  watch: {
  },
  computed: {
    tab_myswiper() {
      return this.$refs.tab_my.swiper
    },
    //vuex 调用
    ...mapGetters([
      'myVideosList',
      'myVideosPage',
      'mylikeVideosList',
      'mylikeVideosPage',
      'buyVideosList',
      'buyVideosPage',
    ])
  },
  mounted () {
      this.getdata()
  },
  methods: {
      getdata(){
          if(!sessionStorage.getItem('user')){
              getmemberinfo().then(res=>{
              console.log(res)
              if(res.data.resultCode == 0){
                this.username = res.data.data.username
                this.nickname = res.data.data.nickname
                this.introduce = res.data.data.introduce
                this.sex = res.data.data.sex == 1?'男':'女'
                this.birthday = res.data.data.birthday
                this.fileimg = res.data.data.headimgurl
                this.region = res.data.data.regionname
                this.year = res.data.data.year
                this.fansnum = res.data.data.fansnum
                this.follownum = res.data.data.follownum
                this.money = res.data.data.money
                this.fabulous = res.data.data.fabulous
                this.see = res.data.data.try_and_see
                this.vipstate = res.data.data.isvip
                sessionStorage.setItem('user',JSON.stringify(res.data.data))
              }
          })
          }else{
              let user = JSON.parse(sessionStorage.getItem('user'))
                this.username = user.username
                this.nickname = user.nickname
                this.introduce = user.introduce
                this.sex = user.sex == 1?'男':'女'
                this.birthday = user.birthday
                this.fileimg = user.headimgurl
                this.region = user.regionname
                this.year = user.year
                this.fansnum = user.fansnum
                this.follownum = user.follownum
                this.money = user.money
                this.fabulous = user.fabulous
                this.see = user.try_and_see
                this.vipstate = user.isvip
          }
          this.getMylove()
          this.getMyvideo()
          this.getMybuy()
            this.my_mescrolls.endErr()
      },
    getMylove(){
        if(this.love_index==1&&this.mylikeVideosList&&this.mylikeVideosList.length>0){
              this.love_index = this.mylikeVideosPage+1;
              this.love_arr.push(...this.mylikeVideosList)
        }else{
          mylike(this.love_index).then(res=>{
            //   console.log(res)
              if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                store.commit('SET_MYLIKE_VIDEOS_PAGE', this.works_index);
                store.commit('SET_MYLIKE_VIDEOS_LIST', res.data.data.videos);
                this.love_arr.push(...res.data.data.videos)
                this.love_index = this.love_index+1
              }
                if(res.data.data.videos.length == 0){
                    // Toast('没有更多了...')
                    this.love_mescrolls.endByPage(0,1)
                }
                this.love_mescrolls.endErr()
          }) 
        }  
    },
    getMyvideo(){
        if(this.works_index==1&&this.myVideosList&&this.myVideosList.length>0){
              this.works_index = this.myVideosPage+1;
              this.works_arr.push(...this.myVideosList)
        }else{
          myvideos(this.works_index).then(res=>{
            //   console.log(res)
              if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                store.commit('SET_MY_VIDEOS_PAGE', this.works_index);
                store.commit('SET_MY_VIDEOS_LIST', res.data.data.videos);
                this.works_arr.push(...res.data.data.videos)
                this.works_index = this.works_index+1
              }
                if(res.data.data.videos.length == 0){
                    // Toast('没有更多了...')
                    this.works_mescrolls.endByPage(0,1)
                }
                this.works_mescrolls.endErr()
          })
        }
    },
    getMybuy(){
        if(this.purchase_index==1&&this.buyVideosList&&this.buyVideosList.length>0){
              this.purchase_index = this.buyVideosPage+1;
              this.purchase_arr.push(...this.buyVideosList)
        }else{
            mybuyvideos(this.purchase_index).then(res=>{
                // console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    store.commit('SET_BUY_VIDEOS_PAGE', this.works_index);
                    store.commit('SET_BUY_VIDEOS_LIST', res.data.data.videos);
                    this.purchase_arr.push(...res.data.data.videos)
                    this.purchase_index = this.purchase_index+1
                }
                    if(res.data.data.videos.length == 0){
                        // Toast('没有更多了...')
                        this.purchase_mescrolls.endByPage(0,1)
                    }
                    this.purchase_mescrolls.endErr()
            })
        }
    },
    tab_mycallback(){
        this.tab_check = this.tab_myswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.tab_myswiper.slideTo(index)
    },
    follow_go(index){
        this.$router.push({
          path: '/follow',
          query: {
            index: index,
            my:0
          }
        })
    },
    singleGo(val) {
        let num = sessionStorage.getItem('frequency')?Number(sessionStorage.getItem('frequency'))+1:1
        sessionStorage.setItem('Single'+num,JSON.stringify(val))
        sessionStorage.setItem('frequency',num)
        this.$router.push({
          path: '/Single_video'
        })
    },
    my_mescrollsInit (mescrolls) {
        this.my_mescrolls = mescrolls;
    },
    my_reloadDatas(){
        this.works_index = 1;
        this.works_arr = [];
        store.commit('SET_MY_VIDEOS_PAGE', this.works_index);
        store.commit('RESET__MY_VIDEOS_LIST', this.works_arr);
        this.love_index = 1;
        this.love_arr = [];
        store.commit('SET_MYLIKE_VIDEOS_PAGE', this.love_index);
        store.commit('RESET__MYLIKE_VIDEOS_LIST', this.love_arr);
        this.purchase_index = 1;
        this.purchase_arr = [];
        store.commit('SET_BUY_VIDEOS_PAGE', this.purchase_index);
        store.commit('RESET__BUY_VIDEOS_LIST', this.purchase_arr);
        sessionStorage.removeItem('user')
        this.getdata()
    },
    works_mescrollsInit (mescrolls) {
        this.works_mescrolls = mescrolls;
    },
    works_loadDatas(){
        this.getMyvideo()
    },
    love_mescrollsInit (mescrolls) {
        this.love_mescrolls = mescrolls;
    },
    love_loadDatas(){
        this.getMylove()
    },
    purchase_mescrollsInit (mescrolls) {
        this.purchase_mescrolls = mescrolls;
    },
    purchase_loadDatas(){
        this.getMybuy()
    }
  }
}
</script>

<style scoped lang="scss">
.My {
    height: 100vh;
    overflow-y: auto;
}
.swiper-slide {
    position: relative;
    height: 750px;
    overflow-y: auto;
    overflow-x: hidden;
}
.top {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
}
.top img{
    width: 100%;
}
.center {
    padding: 0px 30px;
    padding-bottom: 200px;
    background-color: #1d0f11;
    position: relative;
    margin-top: 150px;
}
.center .user {
    width: 100%;
    display: flex;
    font-size: 26px;
    color: #fff;
    align-items: center;
    margin-bottom: 30px;
}
.center .user .userimg {
    width: 160px;
    height: 160px;
    margin-right: 26px;
    background-color: #fff;
    border-radius: 50%;
    margin-top: -20px;
}
.center .user .userimg img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.center .user .user_box {
    flex: 1;
}
.center .user .user_box div{
    margin-bottom: 10px;
    line-height: 36px;
}
.center .user .user_box .vipuser {
    color: #ff3841;
}
.center .user .user_btn {
    width: 130px;
    height: 60px;
    border-radius: 60px;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    border: 2px solid #999999;
    color: #999999;
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
    border: 2px solid #2b2121;
}
.center .num {
    width: 100%;
    height: 36px;
    font-size: 24px;
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
    font-size: 26px;
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
.center .nav div a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.center .nav div div {
    width: 64px;
    height: 64px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    margin-bottom: 20px;
}
.center .nav div .fxwx {
    background-position: -16px -1058px;
}
.center .nav div .wdqb {
    background-position: -16px -1174px;
}
.center .nav div .vipcz {
    background-position: -16px -1280px;
}
.center .nav div .dlzq {
    background-position: -16px -1380px;
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
    font-size: 26px;
    margin-bottom: 20px;
}
.center .ranking_box .ranking_text span:last-child {
    margin-top: 26px;
    color: #999999;
}
.center .ranking_box .ranking_first{
    display: flex;
    justify-content: center;
    font-size: 24px;
    align-items: center;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    margin-right: 20px;
}
.center .ranking_box .wdzp{
    width: 102px;
    height: 81px;
    background-position: -16px -1499px;
}
.center .ranking_box .wdsq{
    width: 100px;
    height: 92px;
    background-position: -16px -1633px;
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
    background-color: #221010;
    display: flex;
    justify-content: center;
    align-items: center;
}
.center .wonderful_nav .wonderful_li .wonderful_img img {
    width: 100%;
    display: block;
}
.center .wonderful_nav .wonderful_li .wonderful_img .userimg {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
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
.mescroll {
    position: absolute;
    left: 0px;
	bottom:50px;
	height: 700px; /*如设置bottom:50px,则需height:auto才能生效*/
}
.my_scroll {
    height: 100%;
    top: 0px;
    bottom: auto;
    overflow-y: auto;
}
.swiper-slide {
    padding: 0px 20px;
}
</style>