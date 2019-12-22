<template>
    <div class="friend">
      <div class="ipt">
        <div></div><input type="text" placeholder="搜索">
      </div>
      <div class="add">
        <div>已加入群聊</div>
        <div>》</div>
      </div>
      <div class="box">
        <div class="user_li" v-for="(item,index) in friends_arr" :key="index" @click="personalgo(item.id)">
          <div class="user">
            <span></span>
            <img :src="item.headimgurl" alt="">
            <div>{{item.username}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getfriends} from '@/api/api'
export default {
  name: 'friend',
  data() {
    return {
      friends_arr:[]
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    getdata(){
      getfriends().then(res=>{
        if(res.data.resultCode == 0){
          this.friends_arr = res.data.data.members
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
.add {
    width: 100%;
    height: 63px;
    display: flex;
    justify-content: space-between;
    font-size: 26px;
    align-items: center;
    color: #fff;
    padding: 0px 30px;
    border-bottom: 1px solid #211a1a;
    margin-bottom: 60px;
}
.box {
  width: 100%;
  padding: 0px 30px;
}
.box .user_li {
  width: 100%;
  font-size: 26px;
  color: #999;
  padding: 20px 0px;
}
.box .user_li .zm {
  margin-bottom: 10px;
}
.box .user_li .user{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: #fff;
}
.box .user_li .user span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #999;
}
.box .user_li .user img {
  width: 66px;
  margin: 0px 20px;
}
.box .user_li .user div {
  flex: 1;
}
</style>