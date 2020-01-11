<template>
  <div class="wallet">
    <top :top_arr="top_arr"></top>
    <div class="balance">
      <div>账户余额（金币）</div>
      <span>{{user.money}}</span>
    </div>
    <div class="center">
      <div class="router_go">
        <div class="left_go">
          <router-link to="cash">
            <span></span>
            提现
          </router-link>
        </div>
        <div class="right_go">
          <router-link to="Profit">
            <span></span>
            收益明细
          </router-link>
        </div>
      </div>

      <div class="tab_nav">
        <div class="tab_check"
        >在线支付<em></em></div>
      </div>
      <div class="wallet_ul">
        <div
          class="wallet_li"
          v-for="(item,index) in money_arr"
          :key="index"
        >
          <span></span>
          <span>{{item.gold}}</span>
          <span>{{item.name}}</span>
          <!-- <span :class="{te:item.give == 0}">送{{item.give}}金币</span> -->
          <span>￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getgoldlist } from "@/api/api";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import top from "@/components/top";
export default {
  name: "wallet",
  components: {
    swiper,
    swiperSlide,
    top
  },
  data() {
    return {
      top_arr: {
        left: true,
        title: "我的钱包",
        right: { title: "充值明细", url: "/Rechargerecord?title=2" }
      },
      wallet: {
        outHeight: true,
        observer: true
      },
      money_arr: [],
      user: ""
    };
  },
  computed: {
    walletswiper() {
      return this.$refs.wallet.swiper;
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      getgoldlist().then(res => {
        console.log(res);
        if (res.data.resultCode == 0) {
          this.money_arr = res.data.data;
        }
      });
    },
  }
};
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  border-bottom: 1px solid #211a1a;
  background-color: #100909;
  position: relative;
}
.top .title {
  text-align: center;
  font-size: 42px;
  line-height: 80px;
  color: #fff;
  font-weight: 600;
}
.top .left {
  width: 19px;
  height: 36px;
  background: url("../assets/images/微信图片_20191206173627.png") no-repeat;
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
.balance {
  width: 100%;
  height: 188px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #211a1a;
  color: #999999;
  padding: 30px;
  font-size: 24px;
}
.balance span {
  font-size: 34px;
  color: #ff3841;
  margin-top: 20px;
}
.center {
  padding: 60px 30px;
  .router_go {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    div {
      width: 280px;
      height: 60px;
      border-radius: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      letter-spacing: 5px;
      font-style: 28px;
      font-weight: 600;
      background-color: #ff3841;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right_go span {
      width: 34px;
      height: 25px;
      background: url("../assets/images/微信图片_20191206173627.png") no-repeat;
      background-size: 750px 4532px;
      background-position: -16px -2837px;
      margin-right: 10px;
    }
    .left_go span {
      width: 32px;
      height: 34px;
      background: url("../assets/images/微信图片_20191206173627.png") no-repeat;
      background-size: 750px 4532px;
      background-position: -16px -2757px;
      margin-right: 10px;
    }
  }
}
.center .tab_nav {
  font-size: 28px;
  color: #999;
  line-height: 48px;
  margin-bottom: 40px;
}
.center .tab_nav div {
  position: relative;
  display: inline-block;
}
.center .tab_nav .tab_check {
  white-space: nowrap;
  color: #fff;
  font-weight: 600;
}
.center .tab_nav .tab_check em {
  display: inline-block;
  width: 2em;
  border-bottom: 6px solid #ff3841;
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
}
  .wallet_ul {
    width: 100%;
  margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .wallet_li {
      width: 216px;
      height: 240px;
      background-color: #261515;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 28px;
      margin-bottom: 20px;
      margin-right: 20px;
      padding: 20px 0px;
      span:nth-child(1) {
        width: 65px;
        height: 65px;
        background-color: #fff;
        background: url("../assets/images/微信图片_20191206173627.png")
          no-repeat;
        background-size: 750px 4532px;
        background-position: -16px -2649px;
      }
      span:nth-child(2) {
        color: #ffeaa8;
      }
      span:nth-child(3) {
        font-size: 24px;
        color: #999999;
      }
      span:nth-child(4) {
        color: #fff;
      }
    }
    .wallet_li:nth-child(3n) {
      margin-right: 0px;
    }
  }
</style>