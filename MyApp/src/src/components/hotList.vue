<template>
    <div class="hotList">
        <top :top_arr="top_arr"></top>
        <div class="center">
        <ScrollContent ref="myscrollfull" @load="loadDatas" @reload="newDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
        <div class="wonderful_nav">
            <div class="wonderful_li" v-for="(item,index) in data_arr" :key="index" @click="singleGo(item)">
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
        </div>
    </div>
</template>

<script>
import {homevideo,latestvideos,payvideos,playmostvideos,commentmostvideos,likemostvideos} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
import  top  from '@/components/top'
import {mapGetters} from 'vuex'
import store from '@/store';
export default {
  name: 'hotList',
  components: {
    ScrollContent,
    top
    },
  data() {
    return {
        top_arr:{left:true,title:'人气',right:{title:'开始上传',url:false}},
        title:'',
        data_arr:[],
        mescrollValue: {up: true, down: true},     //页面你是否需要下拉上拉加载
        page:1
    }
  },
  computed: {
    //vuex 调用
    ...mapGetters([
      'homeVideosList',
      'homeVideosPage',
      'latestVideosList',
      'latestVideosPage',
      'payVideosList',
      'payVideosPage',
      'playVideosList',
      'playVideosPage',
      'commentVideosList',
      'commentVideosPage',
      'likeVideosList',
      'likeVideosPage'
    ])
  },
  mounted () {
    this.top_arr.title = this.$route.query.title
    this.title = this.$route.query.title
    console.log(this.title)
    this.getdata()
  },
  methods: {
      getdata(){
          if(this.title == '官方推荐'){
            if(this.page==1&&this.homeVideosList&&this.homeVideosList.length>0){
              this.page = this.homeVideosPage+1;
              this.data_arr.push(...this.homeVideosList)
            }else{
              homevideo(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                  store.commit('SET_HOME_VIDEOS_PAGE', this.page);
                  store.commit('SET_HOME_VIDEOS_LIST', res.data.data.videos);
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                    this.mescrolls.endByPage(0,1)
                }
                this.mescrolls.endErr()
              })
            }
          }else if(this.title == '最新上传'){
            //console.log(store.getters.latestVideosList);
            if(this.page==1&&this.latestVideosList&&this.latestVideosList.length>0){
              this.page = this.latestVideosPage+1;
              this.data_arr.push(...this.latestVideosList)
              /*console.log(1);
              console.log(this.page);
              console.log(this.data_arr);*/
            }else{
              latestvideos(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                  store.commit('SET_LATEST_VIDEOS_PAGE', this.page);
                  store.commit('SET_LATEST_VIDEOS_LIST', res.data.data.videos);
                  this.data_arr.push(...res.data.data.videos)
                  this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                  Toast('没有更多视频了...')
                    this.mescrolls.endByPage(0,1)
                }
                /*console.log(2);
                console.log(this.page);
                console.log(this.data_arr);*/

                this.mescrolls.endErr()
              })
            }
          }else if(this.title == '金币专区'){
            if(this.page==1&&this.payVideosList&&this.payVideosList.length>0){
              this.page = this.payVideosPage+1;
              this.data_arr.push(...this.payVideosList)
            }else{
                payvideos(this.page).then(res=>{
                    console.log(res)
                    if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                        store.commit('SET_PAY_VIDEOS_PAGE', this.page);
                        store.commit('SET_PAY_VIDEOS_LIST', res.data.data.videos);
                        this.data_arr.push(...res.data.data.videos)
                        this.page = this.page + 1
                    }
                    if(res.data.data.videos.length == 0){
                        Toast('没有更多视频了...')
                        this.mescrolls.endByPage(0,1)
                    }
                    this.mescrolls.endErr()
                })
            }
          }else if(this.title == '最多播放'){
            if(this.page==1&&this.playVideosList&&this.playVideosList.length>0){
              this.page = this.playVideosPage+1;
              this.data_arr.push(...this.playVideosList)
            }else{
                playmostvideos(this.page).then(res=>{
                    console.log(res)
                    if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                        store.commit('SET_PLAY_VIDEOS_PAGE', this.page);
                        store.commit('SET_PLAY_VIDEOS_LIST', res.data.data.videos);
                        this.data_arr.push(...res.data.data.videos)
                        this.page = this.page + 1
                    }
                    if(res.data.data.videos.length == 0){
                        Toast('没有更多视频了...')
                        this.mescrolls.endByPage(0,1)
                    }
                    this.mescrolls.endErr()
                })
            }
          }else if(this.title == '最多评论'){
            if(this.page==1&&this.commentVideosList&&this.commentVideosList.length>0){
              this.page = this.commentVideosPage+1;
              this.data_arr.push(...this.commentVideosList)
            }else{
                commentmostvideos(this.page).then(res=>{
                    console.log(res)
                    if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                        store.commit('SET_COMMENT_VIDEOS_PAGE', this.page);
                        store.commit('SET_COMMENT_VIDEOS_LIST', res.data.data.videos);
                        this.data_arr.push(...res.data.data.videos)
                        this.page = this.page + 1
                    }
                    if(res.data.data.videos.length == 0){
                        Toast('没有更多视频了...')
                        this.mescrolls.endByPage(0,1)
                    }
                    this.mescrolls.endErr()
                })
            }
          }else if(this.title == '最多点赞'){
            if(this.page==1&&this.likeVideosList&&this.likeVideosList.length>0){
              this.page = this.likeVideosPage+1;
              this.data_arr.push(...this.likeVideosList)
            }else{
                likemostvideos(this.page).then(res=>{
                    console.log(res)
                    if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                        store.commit('SET_LIKE_VIDEOS_PAGE', this.page);
                        store.commit('SET_LIKE_VIDEOS_LIST', res.data.data.videos);
                        this.data_arr.push(...res.data.data.videos)
                        this.page = this.page + 1
                    }
                    if(res.data.data.videos.length == 0){
                        Toast('没有更多视频了...')
                        this.mescrolls.endByPage(0,1)
                    }
                    this.mescrolls.endErr()
                })
            }
          }
      },
      loadDatas(){
          this.getdata()
      },
      newDatas(){
        this.page = 1;
        this.data_arr = [];
          if(this.title == '官方推荐'){
            store.commit('SET_HOME_VIDEOS_PAGE', this.page);
            store.commit('RESET__HOME_VIDEOS_LIST', this.data_arr);
          }else if(this.title == '最新上传'){
            store.commit('SET_LATEST_VIDEOS_PAGE', this.page);
            store.commit('RESET__LATEST_VIDEOS_LIST', this.data_arr);
          }else if(this.title == '金币专区'){
            store.commit('SET_PAY_VIDEOS_PAGE', this.page);
            store.commit('RESET__PAY_VIDEOS_LIST', this.data_arr);
          }else if(this.title == '最多播放'){
            store.commit('SET_PLAY_VIDEOS_PAGE', this.page);
            store.commit('RESET__PLAY_VIDEOS_LIST', this.data_arr);
          }else if(this.title == '最多评论'){
            store.commit('SET_COMMENT_VIDEOS_PAGE', this.page);
            store.commit('RESET__COMMENT_VIDEOS_LIST', this.data_arr);
          }else if(this.title == '最多点赞'){
            store.commit('SET_LIKE_VIDEOS_PAGE', this.page);
            store.commit('RESET__LIKE_VIDEOS_LIST', this.data_arr);
          }
        this.getdata();
      },

    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    back(){
      window.history.go(-1)
    },
    singleGo(val) {
        let num = sessionStorage.getItem('frequency')?Number(sessionStorage.getItem('frequency'))+1:1
        sessionStorage.setItem('Single'+num,JSON.stringify(val))
        sessionStorage.setItem('frequency',num)
        this.$router.push({
          path: '/Single_video'
        })
    }
  }
}
</script>

<style scoped lang="scss">
.center {
    position: relative;
}
.mescroll {
	position: absolute;
	top: 0px;
    left: 0px;
	height: 100vh; /*如设置bottom:50px,则需height:auto才能生效*/
    padding-bottom: 80px;
}
.wonderful_nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
}
.wonderful_nav .wonderful_li {
    width: 330px;
    margin-bottom: 20px;
    margin-right: 20px;
}
.wonderful_nav .wonderful_li:nth-child(2n){
    margin-right: 0px;
}
.wonderful_nav .wonderful_li .wonderful_img {
    width: 100%;
    height: 595px;
    position: relative;
    background-color: #221010;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wonderful_nav .wonderful_li .wonderful_img img {
    width: 100%;
    display: block;
}
.wonderful_nav .wonderful_li .wonderful_img .userimg {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    border-radius: 50%;
    overflow: hidden;
}
.wonderful_nav .wonderful_li .wonderful_text{
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
