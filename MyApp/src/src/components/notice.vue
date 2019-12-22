<template>
    <div class="notice">
        <div class="nav">
            <div @click="follow_go(1)">
                <span class="fs"></span>
                <span>粉丝</span>
            </div>
            <div @click="messageList('赞')">
                <span class="dz"></span>
                <span>点赞</span>
            </div>
            <div @click="messageList('评论')">
                <span class="pl"></span>
                <span>评论</span>
            </div>
        </div>
        <div class="system_notice">
            <div class="h4">系统公告</div>
            <div class="li">
                <img src="../assets/images/微信图片_20191210111856.png" alt="">
                <span>69视频助手</span>
                <div class="btn">下载</div>
            </div>
            <div class="li" @click="notifygo()">
                <img src="../assets/images/微信图片_20191210111856.png" alt="">
                <span>系统通知</span>
                <div></div>
            </div>
            <div class="li">
                <img src="../assets/images/微信图片_20191210111856.png" alt="">
                <span>视频助手</span>
                <div>星期五</div>
            </div>
        </div>
        <div class="follow_ul">
            <div class="h4">推荐关注</div>
            
            <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
                <div class="follow_li" v-for="(item,index) in notice_arr" :key="index" @click="personalgo(item.id)">
                    <div class="userimg">
                        <img :src="item.headimgurl" alt="">
                    </div>
                    <div class="user">
                        <div class="username">{{item.username}}</div>
                        <div class="usersex"><span><em :class="{nv:item.sex == 2,nan:item.sex == 1}"></em>{{item.sex == 1?'男':'女'}}</span></div>
                        <div class="usertext">可能认识的人</div>
                    </div>
                    <div class="follow_btn NO" v-if="item.concerned == null" @click.stop="add_concern(item.id,index)">关注</div>
                    <div class="follow_btn" v-if="item.concerned != null" @click.stop="del_concern(item.id,index)">已关注</div>
                </div>
            </ScrollContent>
        </div>
    </div>
</template>

<script>
import {recommendconcerns,addconcern,delconcern} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'notice',
  components: {
    ScrollContent,
    },
  data() {
    return {
        page:1,
        notice_arr:[],
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
    }
  },
  mounted () {
      this.getdata()
  },
  methods: {
    getdata(){
        recommendconcerns(this.page).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.members.length != 0){
                this.notice_arr.push(...res.data.data.members)
                this.page = this.page + 1
            }
            if(res.data.data.members.length == 0){
                Toast('没有更多了...')
            }
            this.mescrolls.endErr()
        })
    },
    follow_go(index){
        this.$router.push({
          path: '/follow',
          query: {
            index: index
          }
        })
    },
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
    },
    notifygo(){
        this.$router.push({ path:'/notify' })
    },
    messageList(val){
        this.$router.push({ path:'/messageList',query:{title:val} })
    },
    add_concern(id,index){
        addconcern(id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
            this.notice_arr[index].concerned = 0
                Toast(res.data.message)
            }
        })
    },
    del_concern(id,index){
        delconcern(id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.notice_arr[index].concerned = null
                Toast(res.data.message)
            }
        })
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    loadDatas(){
          this.getdata()
    }
  }
}
</script>

<style scoped lang="scss">
.notice {
    padding: 0px 30px;
    padding-bottom: 500px;
}
.nav {
    width: 100%;
    height: 230px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #211a1a;
    margin-bottom: 20px;
}
.nav div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #fff;
}
.nav div span:first-child {
    display: block;
    width: 84px;
    height: 84px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    margin-bottom: 20px;
}
.nav .fs:first-child {
    background-position: -16px -2231px;
}
.nav .dz:first-child {
    background-position: -16px -2338px;
}
.nav .pl:first-child {
    background-position: -16px -2443px;
}
.h4 {
    font-size: 30px;
    color: #999999;
    margin-bottom: 40px;
}
.system_notice {
    width: 100%;
    margin-bottom: 60px;
}
.system_notice .li {
    width: 100%;
    padding: 28px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #211a1a;
}
.system_notice .li img {
    width: 68px;
    margin-right: 20px;
}
.system_notice .li span {
    flex: 1;
    font-size: 30px;
    color: #fff;
}
.system_notice .li div {
    font-size: 26px;
    color: #999999;
}
.system_notice .li .btn {
    width: 130px;
    height: 60px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-style: 32px;
    background-color: #ff3841;
    border-radius: 60px;
}
.follow_ul {
    width: 100%;
    overflow-y: auto;
}
.follow_ul .follow_li {
    width: 100%;
    display: flex;
    font-size: 26px;
    color: #fff;
    align-items: center;
    margin-bottom: 50px;
}
.follow_ul .follow_li .userimg {
    width: 1rem;
    margin-right: 26px;
}
.follow_ul .follow_li .userimg img {
    width: 100%;
}
.follow_ul .follow_li .user {
    flex: 1;
}
.follow_ul .follow_li .user div{
    margin-bottom: 10px;
    line-height: 36px;
}
.follow_ul .follow_li .user .usersex span {
    padding: 5px 10px;
    padding-top: 0px;
    background-color: #221214;
    border-radius: 5px;
}
.follow_ul .follow_li .user .usersex span em {
    display: inline-block;
    width: 18px;
    height: 21px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    vertical-align: middle;
    margin-right: 10px;
}
.follow_ul .follow_li .user .usersex span .nv {
    background-position: -16px -413px;
}
.follow_ul .follow_li .user .usersex span .nan {
    background-position: -16px -470px;
}
.follow_ul .follow_li .follow_btn {
    width: 130px;
    height: 60px;
    border-radius: 60px;
    background-color: #311d20;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    margin-right: 40px;
}
.follow_ul .follow_li .NO {
    background-color: #ff3841;
}
.follow_ul .follow_li .follow_del {
    width: 24px;
}
.mescroll {
    position: absolute;
    left: 20px;
	bottom:95px;
	height: 400px; /*如设置bottom:50px,则需height:auto才能生效*/
}
</style>