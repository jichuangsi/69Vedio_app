<template>
    <div class="myupload">
    <top :top_arr="top_arr"></top>
    <div class="center">
        <ScrollContent ref="myscrollfull" @load="loadDatas" @reload="reloadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
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
    </div>
    </div>
</template>

<script>
import {myvideos} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
import  top  from '@/components/top'
import {mapGetters} from 'vuex'
import store from '@/store';
export default {
  name: 'myupload',
  components: {
    ScrollContent,
    top
  },
  data() {
    return {
       top_arr:{left:true,title:'我的上传',right:{title:'开始上传',url:'/myupload'}},
        purchase_arr:[],
        mescrollValue: {up: true, down: true},     //页面你是否需要下拉上拉加载
        page:1
    }
  },
  computed: {
    //vuex 调用
    ...mapGetters([
      'myVideosList',
      'myVideosPage',
    ])
  },
  mounted () {
      this.getdata()
      console.log(this.myVideosList)
  },
  methods: {
    getdata(){
        if(this.page==1&&this.myVideosList&&this.myVideosList.length>0){
              this.page = this.myVideosPage+1;
              this.purchase_arr.push(...this.myVideosList)
        }else{
            myvideos(this.page).then(res=>{
                if(res.data.resultCode == 0&&res.data.data.videos.length !=0){
                  store.commit('SET_MY_VIDEOS_PAGE', this.page);
                  store.commit('SET_MY_VIDEOS_LIST', res.data.data.videos);
                    this.purchase_arr.push(...res.data.data.videos)
                    this.page = this.page+1
                }
                if(res.data.data.videos.length == 0){
                    Toast('没有更多了...')
                    this.mescrolls.endByPage(0,1)
                }
                this.mescrolls.endErr()
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    back(){
      window.history.go(-1)
    },
    Upload(){
       this.$router.push({ path:'/Upload' })
    },
    singleGo(val) {
        let num = sessionStorage.getItem('frequency')?Number(sessionStorage.getItem('frequency'))+1:1
        sessionStorage.setItem('Single'+num,JSON.stringify(val))
        sessionStorage.setItem('frequency',num)
        this.$router.push({
          path: '/Single_video'
        })
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    reloadDatas(){
        this.page = 1;
        this.purchase_arr = [];
        store.commit('SET_MY_VIDEOS_PAGE', this.page);
        store.commit('RESET__MY_VIDEOS_LIST', this.purchase_arr);
        this.getdata()
    },
    loadDatas(){
        this.getdata()
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
.center {
    // padding: 60px 30px;
    position: relative;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
	top:0px;
    padding: 20px;
	height: 90vh; /*如设置bottom:50px,则需height:auto才能生效*/
}
</style>