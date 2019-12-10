<template>
    <div class="myupload">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">我的上传</div>
        <div class="right" @click="Upload">开始上传</div>
    </div>
    <div class="center">
                    <div class="wonderful_nav">
                        <div class="wonderful_li" v-for="(item,index) in purchase_arr" :key="index" @click="singleGo(purchase_arr,index)">
                            <div class="wonderful_img">
                                <img :src="item.posterimg" alt="">
                                <div class="userimg">
                                    <img :src="item.userimg" alt="">
                                </div>
                            </div>
                            <div class="wonderful_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'myupload',
  data() {
    return {
        purchase_arr:[]
    }
  },
  mounted () {
      this.purchase_arr = localStorage.getItem('my_video')?JSON.parse(localStorage.getItem('my_video')):[]
  },
  methods: {
    back(){
      window.history.go(-1)
    },
    Upload(){
       this.$router.push({ path:'/Upload' })
    },
    singleGo(arr,index) {
        localStorage.setItem('Single',JSON.stringify(arr))
        localStorage.setItem('Single_index',index)
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
.center {
    padding: 60px 30px;
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
</style>