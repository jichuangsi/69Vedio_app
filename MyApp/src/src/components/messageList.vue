<template>
    <div class="messageList">
        <div class="top">
            <div class="left" @click="back"></div>
            <div class="title">{{title}}</div>
        </div>
        <div class="center">
        <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
            <div class="li" v-for="(item,index) in notify_arr" :key="index" @click="singleGo(item)">
                <div class="img">
                    <img :src="item.theadimgurl" alt="">
                </div>
                <div class="text">
                    <div class="username">{{item.snickname}}</div>
                    <div v-if="title == '赞'">赞了你的作品</div>
                    <div v-if="item.cpid ==0&&title != '赞'">{{item.content}}</div>
                    <div v-if="item.cpid > 0&&title != '赞'">回复<span @click.stop="personalgo(item.tid)">{{item.tnickname}}</span>:{{item.content}}</div>
                    <div class="time" v-if="item.type == 0&&title != '赞'">评论了你的作品 {{item.add_time}}</div>
                    <div class="time" v-if="item.type == 1&&title != '赞'">回复了你的评论 {{item.add_time}}</div>
                </div>
                <div class="fm">
                    <img :src="item.thumbnail" alt="">
                </div>
            </div>
        </ScrollContent>
        </div>
    </div>
</template>

<script>
import {mygoods,mycomments} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'messageList',
  components: {
    ScrollContent
  },
  data() {
    return {
        title:'',
        notify_arr: [],
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        page:1
    }
  },
  mounted () {
      this.title = this.$route.query.title
      this.getdata()
  },
  methods: {
      getdata(){
        if(this.title == '赞'){
            this.getgoods()
        }else{
            this.getmycomments()
        }
      },
      getgoods(){
          mygoods(this.page).then(res=>{
              console.log(res)
            if(res.data.resultCode == 0&&res.data.data.goods.length !=0){
                this.notify_arr.push(...res.data.data.goods)
                this.page = this.page+1
            }
            if(res.data.data.goods.length == 0){
                Toast('没有更多了...')
            }
            this.mescrolls.endErr()
          })
      },
      getmycomments(){
          mycomments(this.page).then(res=>{
              console.log(res)
            if(res.data.resultCode == 0&&res.data.data.comments.length !=0){
                this.notify_arr.push(...res.data.data.comments)
                this.page = this.page+1
            }
            if(res.data.data.comments.length == 0){
                Toast('没有更多了...')
            }
            this.mescrolls.endErr()
          })
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
    },
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
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
    letter-spacing: 5px;
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
    position: relative;
    .li {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
        .img {
            img{
                width: 68px;
                height: 68px;
                border-radius: 50%;
            }
        }
        .text {
            flex: 1;
            color: #fff;
            padding: 0px 20px;
            font-size: 24px;
            line-height: 46px;
            .time {
                color:#999;
            }
            span {
                color: #999
            }
        }
        .fm {
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
            }
        }
    }
}
.mescroll {
    position: absolute;
    left: 0px;
    top: 0px;
    height: auto;
}
</style>