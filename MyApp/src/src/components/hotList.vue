<template>
    <div class="hotList">
        <div class="top">
            <div class="left" @click="back"></div>
            <div class="title">{{title}}</div>
        </div>
        <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
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
</template>

<script>
import {homevideo,latestvideos,payvideos,playmostvideos,commentmostvideos,likemostvideos} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'hotList',
  components: {
    ScrollContent,
    },
  data() {
    return {
        title:'',
        data_arr:[],
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        page:1
    }
  },
  mounted () {
    this.title = this.$route.query.title
    console.log(this.title)
    this.getdata()
  },
  methods: {
      getdata(){
          if(this.title == '官方推荐'){
              homevideo(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                }
                this.mescrolls.endErr()
              })
          }else if(this.title == '最新上传'){
            latestvideos(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                }
                this.mescrolls.endErr()
            })
          }else if(this.title == '金币专区'){
            payvideos(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                }
                this.mescrolls.endErr()
            })
          }else if(this.title == '最多播放'){
            playmostvideos(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                }
                this.mescrolls.endErr()
            })
          }else if(this.title == '最多评论'){
            commentmostvideos(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                }
                this.mescrolls.endErr()
            })
          }else if(this.title == '最多点赞'){
            likemostvideos(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.videos.length != 0){
                    this.data_arr.push(...res.data.data.videos)
                    this.page = this.page + 1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多视频了...')
                }
                this.mescrolls.endErr()
            })
          }
      },
      loadDatas(){
          this.getdata()
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
.top img {
    width: 100%;
    display: block;
}
.mescroll {
	position: absolute;
	top: 100px;
	bottom: 0;
	height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
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