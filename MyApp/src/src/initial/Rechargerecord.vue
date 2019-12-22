<template>
    <div class="Rechargerecord">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">充值明细</div>
    </div>
    <div class="center">
                <div class="li">
                    <div class="left_li">
                        <div>提现100金币</div>
                        <span>2019/09/09 12:00:00</span>
                    </div>
                    <div class="right_li">
                        <div>+100</div>
                        <span>充值成功</span>
                    </div>
                </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Rechargerecord',
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
    back(){
      window.history.go(-1)
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
    .li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 60px;
        line-height: 36px;
        img {
            width: 52px;
            height: 52px;
            margin-right: 20px;
        }
        .left_li {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 28px;
            color: #fff;
            span {
                font-size: 26px;
                color: #999;
                margin-top: 20px;
            }
        }
        .right_li {
            color: #fff;
            font-size: 26px;
            div {
                font-style: 28px;
                margin-bottom: 20px;
            }
        }
    }
}
</style>