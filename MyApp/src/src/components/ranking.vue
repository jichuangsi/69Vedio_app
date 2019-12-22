<template>
    <div class="ranking">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">{{title}}</div>
    </div>
    <div class="center">
        <div class="li" v-for="(item,index) in ranking_arr" :key="index" :class="{one:index == 0,two:index==1,three:index==2,four:index==3,all:index<=2}" @click="personalgo(item.pid)">
            <div class="index" v-if="index <= 2">
                <img v-if="index == 0" src="../assets/images/1.png" alt="">
                <img v-if="index == 1" src="../assets/images/2.png" alt="">
                <img v-if="index == 2" src="../assets/images/3.png" alt="">
            </div>
            <div class="hg" v-if="index <= 2">
                <img v-if="index == 0" src="../assets/images/皇冠1.png" alt="">
                <img v-if="index == 1" src="../assets/images/皇冠2.png" alt="">
                <img v-if="index == 2" src="../assets/images/皇冠3.png" alt="">
            </div>
            <div class="index" v-if="index > 2">{{index+1}}</div>
            <div class="img">
                <img :src="item.headimgurl" alt="">
            </div>
            <div class="text">
                <div class="name">{{item.nickname}}</div>
                <div class="num" v-if="item.uids">邀请{{item.uids}}人</div>
                <div class="num" v-if="item.vids">上传{{item.vids}}个</div>
            </div>
            <div class="follow_btn NO" v-if="item.concerned == null" @click.stop="add_concern(item.pid,index)">关注</div>
            <div class="follow_btn" v-if="item.concerned != null" @click.stop="del_concern(item.pid,index)">已关注</div>
        </div>
    </div>
    </div>
</template>

<script>
import {inviterank,uploadrand,addconcern,delconcern} from '@/api/api'
import { Toast } from 'mint-ui';
export default {
  name: 'ranking',
  data() {
    return {
        title:'邀请大神',
        ranking_arr:[]
    }
  },
  mounted () {
      this.title = this.$route.query.title
      this.getdata(this.title)
  },
  methods: {
    getdata(val){
        if(val == '邀请大神'){
            inviterank().then(res=>{
                console.log(res)
                if(res.data.resultCode == 0){
                    this.ranking_arr = res.data.data.members
                }
            })
        }else{
            uploadrand().then(res=>{
                console.log(res)
                if(res.data.resultCode == 0){
                    this.ranking_arr = res.data.data.members
                }
            })
        }
    },
    back(){
      window.history.go(-1)
    },
    add_concern(id,index){
        addconcern(id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
            this.ranking_arr[index].concerned = 0
                Toast(res.data.message)
            }
        })
    },
    del_concern(id,index){
        delconcern(id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.ranking_arr[index].concerned = null
                Toast(res.data.message)
            }
        })
    },
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
    },
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
    padding: 30px;
    position: relative;
}
.li {
    font-size: 26px;
    line-height: 36px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0px;
}
.one {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: column;
    text-align: center;
}
.two {
    position: absolute;
    left: 30px;
    flex-direction: column;
    text-align: center;
}
.three {
    position: absolute;
    right:30px;
    flex-direction: column;
    text-align: center;
}
.all .text .name {
    margin-top: 20px;
}
.all .text .num {
    margin-bottom: 20px;
}
.all .img {
    margin-right: 0px !important;
}
.all .index img {
    width: 28px;
    height: 28px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 110px;
}
.all .hg img{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
} 
.one .hg img {
    top: -40px;
}
.one .img img{
    border: 1px solid #d4862e;
}
.two .img img{
    border: 1px solid #f5e280;
}
.three .img img{
    border: 1px solid #f8e898;
}
.four {
    margin-top: 380px;
}
.li .img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: #fff;
}
.li .img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.li .index {
    width: 60px;
    color:#ff3841;
    font-weight: 700;
    text-align: left;
}
.li .text {
    flex: 1;
}
.li .text .num {
    color:#999999;
    margin-top: 20px;
}
.follow_btn {
    width: 130px;
    height: 60px;
    border-radius: 60px;
    background-color: #311d20;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
}
.NO {
    background-color: #ff3841;
}
</style>