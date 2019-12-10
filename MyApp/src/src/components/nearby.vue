<template>
    <div class="nearby">
        <div class="dz">
            <div><span></span>默认地址：广州</div>
            <div>切换></div>
        </div>
        <div class="follow_ul">
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
  name: 'nearby',
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
    personalgo(id){
        this.$router.push({ path:'/personal',query:{id:id} })
    },
    getdata(){
        navigator.geolocation.getCurrentPosition(geolocationSuccess);
        function geolocationSuccess(position){
            alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
        }
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