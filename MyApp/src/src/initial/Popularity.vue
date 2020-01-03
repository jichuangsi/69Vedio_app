<template>
    <div class="Popularity">
        <top :top_arr="top_arr"></top>
        <div class="center">
        <ScrollContent ref="myscrollfull" @load="loadDatas" @reload="reloadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
            <div class="activity">
                <img src="../assets/images/微信图片_20191212151058.png" alt="">
            </div>
            <div class="nav">
                <div v-for="(item,index) in popularrank_arr" :key="index">
                    <span>top{{index+1}}</span>
                    <div class="img"><img :src="item.headimgurl" alt=""></div>
                    <span><em></em>{{item.goods}}</span>
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
                    <div class="ranking_nav" @click="rankinggo('邀请大神')">
                        <div class="ranking_text">
                            <span>邀请大神</span>
                            <span>></span>
                        </div>
                        <div class="ranking_first">
                            <div class="img">
                                <img :src="inviteimg" alt="">
                            </div>
                            <span>top1</span>
                        </div>
                    </div>
                    <div class="ranking_nav" @click="rankinggo('上传大神')">
                        <div class="ranking_text">
                            <span>上传大神</span>
                            <span>></span>
                        </div>
                        <div class="ranking_first">
                            <div class="img">
                                <img :src="uploadimg" alt="">
                            </div>
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
                    <div @click="hotListgo('官方推荐')">
                        <span class="heat_img heat_img1"></span>
                        <span>官方推荐</span>
                    </div>
                    <div @click="hotListgo('最新上传')">
                        <span class="heat_img heat_img2"></span>
                        <span>最新上传</span>
                    </div>
                    <div @click="hotListgo('金币专区')">
                        <span class="heat_img heat_img3"></span>
                        <span>金币专区</span>
                    </div>
                    <div @click="hotListgo('最多播放')">
                        <span class="heat_img heat_img4"></span>
                        <span>最多播放</span>
                    </div>
                    <div @click="hotListgo('最多评论')">
                        <span class="heat_img heat_img5"></span>
                        <span>最多评论</span>
                    </div>
                    <div @click="hotListgo('最多点赞')">
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
                    <div class="wonderful_li" v-for="(item,index) in wonderful" :key="index" @click="singleGo(item)">
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
            </div>
            </ScrollContent>
        </div>
        <foot :check_index='check_index'></foot>
    </div>
</template>

<script>
import {popularrank,inviterank,uploadrand,homevideo} from '@/api/api'
import  foot  from '@/components/Foot'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
import  top  from '@/components/top'
import {mapGetters} from 'vuex'
import store from '@/store';
export default {
  name: 'Popularity',
  components: {
    foot,
    ScrollContent,
    top
  },
  data() {
    return {
       top_arr:{left:false,title:'人气',right:{title:'开始上传',url:false}},
        check_index:1,
        wonderful:[],
        popularrank_arr:[],
        inviteimg:'',
        uploadimg:'',
        page:1,
        mescrollValue: {up: true, down: true},     //页面你是否需要下拉上拉加载
    }
  },
  computed: {
    //vuex 调用
    ...mapGetters([
      'homeVideosList',
      'homeVideosPage',
      'Popularity'
    ])
  },
  mounted () {
      this.getdata()
      this.getvideo()
  },
  methods: {
    getdata(){
        if(this.Popularity.good){
            this.popularrank_arr = this.Popularity.good
            this.inviteimg = this.Popularity.invite[0].headimgurl
            this.uploadimg = this.Popularity.upload[0].headimgurl
        }else{
            popularrank().then(res=>{
                console.log(res)
                if(res.data.resultCode == 0){
                    store.commit('SET_POPULARITY', res.data.data);
                    this.popularrank_arr = res.data.data.good
                    this.inviteimg = res.data.data.invite[0].headimgurl
                    this.uploadimg = res.data.data.upload[0].headimgurl
                }
            })
        }
    },
    getvideo(){
        if(this.page==1&&this.homeVideosList&&this.homeVideosList.length>0){
              this.page = this.homeVideosPage+1;
              this.wonderful.push(...this.homeVideosList)
        }else{
            homevideo(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length!=0){
                  store.commit('SET_HOME_VIDEOS_PAGE', this.page);
                  store.commit('SET_HOME_VIDEOS_LIST', res.data.data.videos);
                    this.wonderful.push(...res.data.data.videos)
                    this.page = this.page+1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多了...')
                    this.mescrolls.endByPage(0,1)
                }
                this.mescrolls.endErr()
            })
        }
    },
    singleGo(val) {
        let num = sessionStorage.getItem('frequency')?Number(sessionStorage.getItem('frequency'))+1:1
        sessionStorage.setItem('Single'+num,JSON.stringify(val))
        sessionStorage.setItem('frequency',num)
        this.$router.push({
          path: '/Single_video'
        })
    },
    rankinggo(val){
        this.$router.push({
          path: '/ranking',
          query:{
              title:val
          }
        })
    },
    hotListgo(val){
        this.$router.push({
          path: '/hotList',
          query:{
              title:val
          }
        })
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    reloadDatas(){
        this.page = 1;
        this.wonderful = [];
        store.commit('SET_HOME_VIDEOS_PAGE', this.page);
        store.commit('RESET__HOME_VIDEOS_LIST', this.wonderful);
        let data = {}
        store.commit('SET_POPULARITY', data);
        this.getdata()
        this.getvideo()
    },
    loadDatas(){
        this.getvideo()
    }
  }
}
</script>

<style scoped lang="scss">  
.center {
    position: relative;
}
.center .activity {
    width: 100%;
    height: 142px;
    // background-color: #fff;
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
.center .nav div .img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    background-color: #fff;
}
.center .nav div img {
    width: 100%;
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
.center .ranking .ranking_box .ranking_first .img {
    width: 72px;
    height: 72px;
    margin-right: 20px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #999;
}
.center .ranking .ranking_box .ranking_first img {
    width: 100%;
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
    position: relative;
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
    background-color: #1d0f11;
    justify-content: center;
    align-items: center;
    display: flex;
}
.center .wonderful .wonderful_nav .wonderful_li .wonderful_img img {
    width: 100%;
    display: block;
}
.center .wonderful .wonderful_nav .wonderful_li .wonderful_img .userimg {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
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
.mescroll {
    position: absolute;
    left: 0px;
    // padding: 0px 20px;
    height: 100vh; /*如设置bottom:50px,则需height:auto才能生效*/
    padding: 175px 30px;
    padding-top: 0px;
}
</style>