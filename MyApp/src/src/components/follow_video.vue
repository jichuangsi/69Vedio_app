<template>
    <div class="follow_video">
        <swiper :options="Recommend" ref="Recommend" @slideChangeTransitionEnd="Recommendcallback" @transitionStart="upgetdata">
          <swiper-slide v-for="(item,index) in video_data" :key="index">
            <!-- <video class="video_f" loop :poster="item.thumbnail" webkit-playsinline playsinline x5-playsinline>
              <source :src="item.url" type="video/mp4">
            </video> -->
             <video class="video_f" loop :poster="item.thumbnail" v-if="item.url!=''" webkit-playsinline="true" playsinline="true">
              <source :src="item.url==''&&item.gold!=0?item.preview:item.url" type="video/mp4">
            </video>
            <video class="video_f" :poster="item.thumbnail" v-if="item.url==''" @ended="end_video" webkit-playsinline="true" playsinline="true">
              <source :src="item.url==''&&item.gold!=0?item.preview:item.url" type="video/mp4">
            </video>
            <div class="right_nav">
            <div class="userimg" @click="personalgo(item.user_id)">
            <img :src="item.headimgurl" alt="">
            <span v-if="item.user_id != 0&&user.userid!=item.user_id">+</span>
            </div>
            <div class="love" :class="{love_check:item.isgood != 0}" @click="love(item,index)">
            <span></span>
            <span>{{item.good}}</span>
            </div>
            <div class="comment" @click="commentclick(item.id,item.user_id)">
            <span></span>
            <span>{{item.comment}}</span>
            </div>
            <div class="share">
            <span></span>
            <span>{{item.share}}</span>
            </div>
            <div class="gold" @click="buystatus= !buystatus">
            <span></span>
            <span>{{item.gold}}</span>
            </div>
            </div>
            <div class="information">
            <div class="username">{{item.username}}</div>
            <div class="text">{{item.title}}</div>
            <div class="music">{{item.musicname}}</div>
            </div>
          </swiper-slide>
        </swiper>
    <div class="bj" v-show="bottom_check">
        <div class="bottom_box" ref="message" :class="{bottom_check:bottom_check}">
            <div class="bottom_top">
                <div class="title">评论<span class="fr" @click="close">x</span></div>
            </div>
            <div class="center">
                <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
                <div class="li" v-for="(item,index) in f_arr" :key="index">
                    <div class="img">
                        <img :src="item.sheadimgurl" alt="">
                    </div>
                    <div class="message">
                        <div class="username" @click="hqclick(item.snickname,item.cid,item.sid)">
                            {{item.snickname}}
                        </div>
                        <div class="text">
                            {{item.content}}
                            <span class="time">{{item.add_time}}</span>
                        </div>
                        <div class="next_center" v-if="item.c_status">
                            <div class="li">
                                <div class="img">
                                    <img :src="item.children.sheadimgurl" alt="">
                                </div>
                                <div class="message">
                                    <div class="username" @click="hqclick(item.children.snickname,item.children.cid,item.children.sid)">{{item.children.snickname}}</div>
                                    <div class="text">
                                        {{item.children.content}}
                                        <span class="time">{{item.children.add_time}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="next_center" v-if="!item.c_status" v-for="(val,i) in item.children" :key="i">
                            <div class="li">
                                <div class="img">
                                    <img :src="val.sheadimgurl" alt="">
                                </div>
                                <div class="message">
                                    <div class="username" @click="hqclick(val.snickname,val.cid,val.sid)">{{val.snickname}}</div>
                                    <div class="text">
                                        {{val.content}}
                                        <span class="time">{{val.add_time}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="more" v-if="item.status" @click="more(item.cid,index)">一展开评论</div>
                    </div>
                </div>
                </ScrollContent>
            </div>
            <div class="ipt">
                <div>@{{sendname}}</div><input type="text" v-model="conntent"><span @click="send">发送</span>
            </div>
        </div>
    </div>
    <div class="bj" v-if="buystatus">
        <div class="message_box">
            <div class="title">
                购买
            </div>
            <div class="text">
                该视频需要<span>{{gold}}</span>金币才能观看全部精彩内容
            </div>
            <div class="my_money">
                我的金币：22888
            </div>
            <div class="btn">
                <div @click="buystatus= !buystatus">取消</div>
                <div @click="buyclick">购买</div>
            </div>
        </div>
    </div>
    <load v-if="!buybtn"></load>
    </div>
</template>

<script>
import {concernvideos ,videocollection,cancelcollection,getcomments,submitcomment,buyvideo,tryandsee} from '@/api/api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollContent from '@/components/ScrollContent'
import load from '@/components/loading'
import { Toast,MessageBox } from 'mint-ui';
export default {
  name: 'follow_video',
  components: {
    swiper,
    swiperSlide,
    ScrollContent,
    load
  },
  props: {
     video_num: {
        type: Number
      },
  },
  data() {
    return {
      Recommend: {
        direction : 'vertical',
        height : window.innerHeight,
        observer: true,
        initialSlide:sessionStorage.getItem('follow_videoIndex')?sessionStorage.getItem('follow_videoIndex'):0
      },
      video_arr: [],
      video_check:'',
      video_data:[],
      pageIndex:1,
      bottom_check:false,
      message_index:1,
      c_index:1,
      f_arr:[],
      c_arr:[],
      id:'',
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        sendname:'',
        conntent:'',
        userid:'',
        pid:'',
        buystatus:false,
        gold:'',
        buybtn:true,
        swiper_arr:[],
        user:'',
        upstate:true
    }
  },
  watch: {
      video_num(newval,oldval){
          if(newval == 0){
              this.video_check.pause()
          }else{
              tryandsee(this.id).then(res=>{
                if(res.data.resultCode == 0||res.data.resultCode == 9021){
                    this.video_check.play()
                }else{
                    MessageBox.confirm('免费次数已用完，请前往充值!').then(action => {
                        this.$router.push({
                         path:'/VIP',
                        })
                    });
                }
              })
          }
      }
  },
  computed: {
    Recommendswiper() {
      return this.$refs.Recommend.swiper
    },
  },
  mounted () {
      let self = this
    if(sessionStorage.getItem('follow_video')){
        self.video_data = JSON.parse(sessionStorage.getItem('follow_video'))
        self.gold = self.video_data[sessionStorage.getItem('follow_videoIndex')].gold
        self.id = self.video_data[sessionStorage.getItem('follow_videoIndex')].id
        self.pageIndex = sessionStorage.getItem('follow_page')
         tryandsee(self.id).then(res=>{
            if(res.data.resultCode == 0||res.data.resultCode == 9021){
                self.video_arr = document.getElementsByClassName('video_f')
                if(self.video_num == 1){
                    self.video_arr[sessionStorage.getItem('follow_videoIndex')].play()
                }
                self.video_check = self.video_arr[sessionStorage.getItem('follow_videoIndex')]
                self.swiper_arr = document.getElementsByClassName('swiper-container')
            }else{
                    MessageBox.confirm('免费次数已用完，请前往充值!').then(action => {
                        this.$router.push({
                         path:'/VIP',
                        })
                    });
                }
        })
    }else{
        self.getdata(0)
    }
    self.user = JSON.parse(sessionStorage.getItem('usermessage'))
  },
  methods: {
      upgetdata(){
          if(this.Recommendswiper.realIndex == 0&&this.upstate){
            this.video_data = []
            this.pageIndex = 1
            this.upstate = true
            this.getdata(0)
          }
      },
      getdata(index){
          let self = this
        concernvideos(self.pageIndex).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.videos.length!=0){
                self.video_data.push(...res.data.data.videos)
                self.pageIndex = self.pageIndex + 1
                sessionStorage.setItem('follow_video',JSON.stringify(self.video_data))
                sessionStorage.setItem('follow_videoIndex',index)
                sessionStorage.setItem('follow_page',self.pageIndex)
                self.gold = self.video_data[index].gold
                self.id = self.video_data[index].id
                tryandsee(self.id).then(res=>{
                    if(res.data.resultCode == 0||res.data.resultCode == 9021){
                        self.video_arr = document.getElementsByClassName('video_f')
                        if(self.video_num == 1){
                            self.video_arr[index].play()
                        }
                        self.video_check = self.video_arr[index]
                        self.swiper_arr = document.getElementsByClassName('swiper-container')
                    }else{
                        MessageBox.confirm('免费次数已用完，请前往充值!').then(action => {
                        this.$router.push({
                         path:'/VIP',
                        })
                    });
                    }
                })
            }
        })
      },
      love(val,index){
          if(val.isgood == 0){
              videocollection(val.id).then(res=>{
                  if(res.data.resultCode == 0){
                    //   Toast(res.data.message)
                      this.video_data[index].isgood = 1
                      this.video_data[index].good = this.video_data[index].good + 1
                      sessionStorage.setItem('follow_video',JSON.stringify(this.video_data))
                  }
              })
          }else{
              cancelcollection(val.id).then(res=>{
                  if(res.data.resultCode == 0){
                    //   Toast(res.data.message)
                      this.video_data[index].isgood = 0
                      this.video_data[index].good = this.video_data[index].good - 1
                      sessionStorage.setItem('follow_video',JSON.stringify(this.video_data))
                  }
              })    
          }
      },
    Recommendcallback(){
        for(let i = 0;i<this.video_arr.length;i++){
            if(this.Recommendswiper.realIndex == i){
                this.gold = this.video_data[i].gold
                this.id = this.video_data[i].id
                this.upstate = this.Recommendswiper.realIndex == 0?true:false
                tryandsee(this.id).then(res=>{
                    if(res.data.resultCode == 0||res.data.resultCode == 9021){
                        this.video_arr[i].play()
                        this.video_check =this.video_arr[i]
                        sessionStorage.setItem('follow_videoIndex',this.Recommendswiper.realIndex)
                    }else{
                        MessageBox.confirm('免费次数已用完，请前往充值!').then(action => {
                        this.$router.push({
                         path:'/VIP',
                        })
                    });
                    }
                })
            }else{
                this.video_arr[i].pause()
            }
        }
      if(this.Recommendswiper.realIndex == this.video_data.length-1){
          this.getdata(this.Recommendswiper.realIndex)
      }
    },
    personalgo(id){
        if(id != 0&&id != this.user.userid){
            this.$router.push({
             path:'/personal',
             query:{
                 id:id
                 } 
            })
        }
    },
    getmassage(){
        getcomments(this.id,this.message_index).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.comments.length !=0){
                for(let i =0;i<res.data.data.comments.length;i++){
                    if(res.data.data.comments[i].children){
                        res.data.data.comments[i].status = true
                        res.data.data.comments[i].c_status = true
                    }
                }
                this.f_arr.push(...res.data.data.comments)
                this.message_index = this.message_index+1
            }
            if(res.data.data.comments.length == 0){
                Toast('没有更多了...')
                this.mescrolls.endByPage(0,1)
            }
            this.mescrolls.endErr()
        })
    },
    commentclick(id,userid){
        this.xh(3)
        this.bottom_check = true
        this.id = id
        this.userid = userid
        this.getmassage()
        this.$refs.message.style.position = 'absolute'
    }, 
    close(){
        this.bottom_check = false
        this.f_arr = []
        this.c_arr = []
        this.message_index = 1
        this.c_index = 1
        this.xh(1)
        this.sendname = ''
        this.userid = ''
        this.pid = ''
        this.$refs.message.style.position = 'fixed'
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    loadDatas(){
        this.getmassage()
    },
    more(id,index){
        getcomments(this.id,this.c_index,id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.comments.length !=0){
                this.f_arr[index].children = this.f_arr[index].children.length?this.f_arr[index].children:[]
                this.f_arr[index].children.push(...res.data.data.comments)
                this.c_index = res.data.data.currentPage+1
                this.f_arr[index].c_status = false
            }
            if(res.data.data.comments.length == 0){
                this.f_arr[index].status = false
            }
        })
    },
    hqclick(name,pid,sid){
        this.sendname = name
        this.userid = sid
        this.pid = pid
    },
    send(){
        if(this.conntent != ''){
            let val = this.conntent
            this.conntent = ''
            submitcomment(this.id,val,this.userid,this.pid).then(res=>{
                console.log(res)
                Toast(res.data.message)
                if(res.data.resultCode==0){
                    this.sendname = ''
                    this.pid = ''
                    this.close()
                }
            })
        }
    },
    end_video(){
        this.buystatus = this.video_data[sessionStorage.getItem('recommend_videoIndex')].gold!=0&&this.video_data[sessionStorage.getItem('recommend_videoIndex')].gold==''?false:true
    },
    buyclick(){
        this.xh(7)
        this.buybtn = false
        buyvideo(this.id).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.video_data[sessionStorage.getItem('recommend_videoIndex')].url = res.data.data
                this.user.money = Number(this.user.money) - Number(this.gold)
                sessionStorage.setItem('usermessage',JSON.stringify(this.user))
                tryandsee(this.id).then(res=>{
                    if(res.data.resultCode == 0||res.data.resultCode == 9021){
                        this.video_arr = document.getElementsByClassName('video_f')
                        this.video_arr[sessionStorage.getItem('recommend_videoIndex')].play()
                        this.video_check = this.video_arr[sessionStorage.getItem('recommend_videoIndex')]
                        sessionStorage.setItem('recommend_video',JSON.stringify(this.video_data))
                    }else{
                        MessageBox.confirm('免费次数已用完，请前往充值!').then(action => {
                        this.$router.push({
                         path:'/VIP',
                        })
                    });
                    }
                })
            }
            this.buybtn = true
            this.buystatus = false
            this.xh(1)
            let message = res.data.message?res.data.message:res.data.error
            Toast(message)
        }).catch(err=>{
            this.buybtn = true
            this.xh(1)
        })
    },
    xh(num){
        for(let i = 0; i<this.swiper_arr.length;i++){
            this.swiper_arr[i].style.zIndex = num
        }
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-slide {
    height: 100vh !important;
    background-color: #100909;
}
.swiper-slide video {
    width: 100%;
    height: 100%;
    /* object-fit: fill; */
    background-color: #100909;
}
.right_nav {
    position: absolute;
    right: 27px;
    bottom: 228px;
}
.right_nav div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 24px;
    margin-bottom: 60px;
    position: relative;
}
.right_nav div img {
    width: 70px;
    height: 70px;
}
.right_nav .userimg img {
    background-color: #fff;
    border-radius: 50%;
}
.right_nav .userimg span {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    position: absolute;
    bottom: -10px;
    background-color: #ff3841;
    border-radius: 50%;
}
.right_nav .love span:first-child{
    width: 70px;
    height: 61px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -538px;
    margin-bottom: 10px;
}
.right_nav .love_check span:first-child{
    background-position: -314px -538px;
}
.right_nav .comment span:first-child{
    width: 71px;
    height: 70px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -643px;
    margin-bottom: 10px;
}
.right_nav .share span:first-child{
    width: 70px;
    height: 60px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -754px;
    margin-bottom: 10px;
}
.right_nav .gold span:first-child{
    width: 65px;
    height: 65px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -2649px;
    margin-bottom: 10px;
}
.information {
    font-size: 30px;
    line-height: 46px;
    width: 60%;
    color: #fff;
    position: absolute;
    left: 30px;
    bottom: 126px;
}
.information div {
    margin-bottom: 30px;
}
.information .username {
    font-size: 36px;
}

.bottom_box {
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    transform: translateY(100%);
}
.bottom_check {
    transform: translateY(0%)
}
.bottom_box .bottom_top {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 46px;
}
.bottom_box .bottom_top .title {
    font-size: 32px;
    letter-spacing: 5px;
}
.bottom_box .bottom_top span {
    margin-right: 20px;
}
.bottom_box .center {
    width: 100%;
    padding: 20px;
    height: 600px;
    overflow-y: auto;
    line-height: 36px;
    position: relative;
}
.bottom_box .li {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0px;
} 
.bottom_box .li .img {
    width: 80px;
    height: 80px;
}
.bottom_box .next_center .li .img {
    width: 70px;
    height: 70px;
}
.bottom_box .li .img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.bottom_box .li .message {
    flex: 1;
    padding: 0px 20px;
    font-size: 28px;
}
.bottom_box .li .message .username {
    color: #999;
    margin-bottom: 10px;
}
.bottom_box .li .time{
    font-size: 26px;
    color:#999;
}
.bottom_box .li .more {
    margin-top: 20px;
    color: #999;
}
.bottom_box .ipt {
    width: 100%;
    height: 56px;
    line-height: 56px;
    display: flex;
    padding:0px 20px;
    margin-bottom: 20px;
    font-size: 28px;
    input {
        flex: 1;
        background-color: #99999954 !important;
        border-radius: 56px;
        font-size: 30px;
        padding: 0px 20px;
    }
    span {
        margin-left: 20px;
    }
}
.bj {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.3);
    z-index: 8;
}
.bj .btn {
    font-size: 32px;
    display: flex;
    line-height: 56px;
    border-bottom: 1px solid #0094ff;
}
.bj .btn div {
    flex: 1;
    text-align: center;
    color: #0094ff;
}
.bj .btn div:first-child {
    border-right: 1px solid #0094ff;
}
.mescroll {
    position: absolute;
    left: 0px;
	top:0px;
    padding: 20px;
	height: 100%; /*如设置bottom:50px,则需height:auto才能生效*/
}

.message_box {
    width: 80%;
    // background-color: rgba(197, 180, 180, 0.99);
    background-color: #fff;
    // border-radius: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.message_box .title {
    font-size: 32px;
    line-height: 86px;
    padding-top: 10px;
    font-weight: 700;
    margin-bottom: 10px;
}
.message_box .text {
    font-size: 26px;
    line-height: 36px;
    margin-bottom: 20px;
    padding: 20px;
    span {
        color: #fbaf18;
    }
}
.message_box .my_money {
    text-align: right;
    font-size: 26px;
    line-height: 86px;
    margin-bottom: 20px;
    color: #fbaf18;
    margin-right: 20px;
}
.message_box .btn {
    font-size: 28px;
    line-height: 76px;
    display: flex;
    border-bottom: none;
}
.message_box .btn div {
    flex: 1;
    border-top: 1px solid #666;
    color: #333;
}
.message_box .btn div:first-child {
    border-right: 1px solid #666;
}
</style>