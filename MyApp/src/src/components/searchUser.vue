<template>
    <div class="searchUser">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="tab_nav">
            <div :class="{tab_check:tab_check == 0}" @click="tabclick(0)">发现好友<em></em></div>
            <div :class="{tab_check:tab_check == 1}" @click="tabclick(1)">好友列表<em></em></div>
        </div>
    </div>
      <div class="ipt">
        <div></div><input type="text" placeholder="搜索">
      </div>
    <div class="center">
        <swiper :options="follow" ref="follow" @slideChangeTransitionEnd="followcallback">
            <swiper-slide>
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
            </swiper-slide>
            <swiper-slide>
                <div class="user_li" v-for="(item,index) in friends_arr" :key="index" @click="personalgo(item.id)">
                <div class="user">
                    <span></span>
                    <img :src="item.headimgurl" alt="">
                    <div>{{item.username}}</div>
                </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
    </div>
</template>

<script>
import {getfriends,recommendconcerns,addconcern,delconcern} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'searchUser',
  components: {
    swiper,
    swiperSlide,
    ScrollContent
  },
  data() {
    return {
        tab_check: 0,
        follow: {
            outHeight: true,
            observer: true,
        },
        friends_arr:[],
        page:1,
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        notice_arr:[]
    }
  },
  computed: {
    followswiper() {
      return this.$refs.follow.swiper
    }
  },
  mounted () {
      this.getdata()
  },
  methods: {
    getdata(){
      getfriends().then(res=>{
          console.log(res)
        if(res.data.resultCode == 0){
          this.friends_arr = res.data.data.members
        }
      })
      recommendconcerns(this.page).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.members.length != 0){
                this.notice_arr.push(...res.data.data.members)
                this.page = this.page + 1
                console.log(this.notice_arr)
            }
            if(res.data.data.members.length == 0){
                Toast('没有更多了...')
            }
            this.mescrolls.endErr()
        })
    },
    back(){
      window.history.go(-1)
    },
    followcallback(){
        this.tab_check = this.followswiper.realIndex
    },
    tabclick(index){
        this.tab_check = index
        this.followswiper.slideTo(index)
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
    },
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
    },
  }
}
</script>

<style scoped lang="scss">
.swiper-slide {
    position: relative;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
}
.top {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #211a1a;
    background-color: #100909;
    position: relative;
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
.tab_nav {
    display: flex;
    justify-content: center;
    font-size: 28px;
    color: #999;
    border-bottom: 1px solid #211a1a;
    line-height: 80px;
    padding-bottom: 10px;
}
.tab_nav div {
    position: relative;
    text-align: center;
}
.tab_nav div:first-child{
    margin-right: 100px;
}
.tab_nav .tab_check {
    white-space: nowrap;
    color: #fff;
    font-weight: 600;
}
.tab_nav .tab_check em {
    display: inline-block;
    width: 100%;
    border-bottom: 6px solid #ff3841;
    position: absolute;
    left: 50%;
    bottom: -0px;
    transform: translateX(-50%);
}

.ipt {
    width: 100%;
    height: 63px;
    display: flex;
    font-size: 26px;
    align-items: center;
    color: #999;
    padding: 0px 30px;
    border-bottom: 1px solid #211a1a;
}
.ipt div {
    width: 44px;
    height: 43px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -870px;
}
.ipt input {
  flex: 1;
  color: #fff;
  padding: 0px 30px;
}

.user_li {
  width: 100%;
  font-size: 26px;
  color: #999;
  padding: 20px;
}
.user_li .zm {
  margin-bottom: 10px;
}
.user_li .user{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: #fff;
}
.user_li .user span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #999;
}
.user_li .user img {
  width: 66px;
  margin: 0px 20px;
}
.user_li .user div {
  flex: 1;
}
.follow_li {
    width: 100%;
    display: flex;
    font-size: 26px;
    color: #fff;
    align-items: center;
    margin-bottom: 50px;
}
.follow_li .userimg {
    width: 1rem;
    margin-right: 26px;
}
.follow_li .userimg img {
    width: 100%;
}
.follow_li .user {
    flex: 1;
}
.follow_li .user div{
    margin-bottom: 10px;
    line-height: 36px;
}
.follow_li .user .usersex span {
    padding: 5px 10px;
    padding-top: 0px;
    background-color: #221214;
    border-radius: 5px;
}
.follow_li .user .usersex span em {
    display: inline-block;
    width: 18px;
    height: 21px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    vertical-align: middle;
    margin-right: 10px;
}
.follow_li .user .usersex span .nv {
    background-position: -16px -413px;
}
.follow_li .user .usersex span .nan {
    background-position: -16px -470px;
}
.follow_li .follow_btn {
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
.follow_li .NO {
    background-color: #ff3841;
}
.follow_li .follow_del {
    width: 24px;
}
.mescroll {
    position: absolute;
    left: 20px;
    top: 20px;
	height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}
</style>