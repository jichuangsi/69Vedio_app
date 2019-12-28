<template>
    <div class="nearby">
        <ScrollContent ref="myscrollfull" @reload="reloadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
        <div class="dz">
            <div><span></span>默认地址：{{dq}}</div>
            <!-- <div>切换></div> -->
        </div>
        <div class="follow_ul">
            <div class="follow_li" v-for="(item,index) in nearby_arr" :key="index" @click="personalgo(item.uid)">
                <div class="userimg">
                    <img :src="item.headimgurl" alt="">
                </div>
                <div class="user">
                    <div class="username">{{item.username}}</div>
                    <div class="usersex"><span><em :class="{nv:item.sex == 2,nan:item.sex == 1}"></em>{{item.sex == 1?'男':'女'}}</span></div>
                    <div class="usertext">可能认识的人</div>
                </div>
                <div class="follow_btn NO" v-if="item.concerned == null" @click.stop="add_concern(item.uid,index)">关注</div>
                <div class="follow_btn" v-if="item.concerned != null" @click.stop="del_concern(item.uid,index)">已关注</div>
            </div>
        </div>
        </ScrollContent>
    </div>
</template>

<script>
import {nearbymember,getlocation,locate,addconcern,delconcern} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'nearby',
  components: {
    ScrollContent,
    },
  data() {
    return {
        mescrollValue: {up: false, down: true},     //页面你是否需要下拉上拉加载
        dq:'广州',
        nearby_arr:[]
    }
  },
  mounted () {
      this.getnearby()
  },
  methods: {
    getnearby(){
        getlocation().then(res=>{
            if(res.data.resultCode == 0&&res.data.data.length!=0){
                this.dq=res.data.data[0].address
            }
        })
        nearbymember().then(res=>{
            // console.log(res)
            if(res.data.resultCode == 0){
                this.nearby_arr = res.data.data
            }
        })
    },
    initialize() {
      document.addEventListener(
        "deviceready",
        function(){}
      )
    },
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
    },
    getdata(){
        let options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }
                    
        let watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position) {
                        locate(position.coords.latitude,position.coords.longitude,position.coords.accuracy,position.timestamp).then(res=>{
                            if(res.data.resultCode == 0){
                                sessionStorage.setItem('dq',res.data.data)
                            }
                            this.mescrolls.endErr()
                        })
            };

            function onError(error) {
                    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    //下拉刷新
    reloadDatas(){
        let self = this
        self.getdata()
        setTimeout(function(){
            self.getnearby()
        },500)
    },
    add_concern(id,index){
        addconcern(id).then(res=>{
            // console.log(res)
            if(res.data.resultCode == 0){
                this.getnearby()
                Toast(res.data.message)
            }
        })
    },
    del_concern(id,index){
        delconcern(id).then(res=>{
            // console.log(res)
            if(res.data.resultCode == 0){
                this.getnearby()
                Toast(res.data.message)
            }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.dz {
    width: 100%;
    height: 63px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    align-items: center;
    color: #999;
    padding: 0px 30px;
    border-bottom: 1px solid #211a1a;
    margin-bottom: 60px;
}
.dz span {
    display: inline-block;
    width: 28px;
    height: 40px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -2561px;
    vertical-align: middle;
    margin-right: 10px;
}
.follow_ul {
    width: 100%;
    padding: 0px 30px;
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
</style>