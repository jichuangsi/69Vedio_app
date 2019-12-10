<template>
    <div class="notice">
        <div class="nav">
            <div>
                <span class="fs"></span>
                <span>粉丝</span>
            </div>
            <div>
                <span class="dz"></span>
                <span>点赞</span>
            </div>
            <div>
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
            <div class="li">
                <img src="../assets/images/火 (1).png" alt="">
                <span>Tina</span>
                <div>19：00</div>
            </div>
            <div class="li">
                <img src="../assets/images/微信图片_20191210111856.png" alt="">
                <span>视频助手</span>
                <div>星期五</div>
            </div>
        </div>
        <div class="follow_ul">
            <div class="h4">推荐关注</div>
            <div class="follow_li" @click="personalgo(1)">
                <div class="userimg">
                    <img src="../assets/images/星星.png" alt="">
                </div>
                <div class="user">
                    <div class="username">Tina</div>
                    <div class="usersex"><span><em class="nv"></em>女</span></div>
                    <div class="usertext">可能认识的人</div>
                </div>
                <div class="follow_btn">关注</div>
                <div class="follow_del">x</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'notice',
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
    }
  }
}
</script>

<style scoped lang="scss">
.notice {
    padding: 0px 30px;
    padding-bottom: 200px;
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
    background-color: #ff3841;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    margin-right: 40px;
}
.follow_ul .follow_li .follow_del {
    width: 24px;
}
</style>