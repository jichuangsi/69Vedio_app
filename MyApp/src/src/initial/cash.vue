<template>
    <div class="cash">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">金币提现</div>
    </div>
    <div class="center">
        <div class="text">
            <div>视频收益 <span>0</span>（可提现）</div><span>1元=10金币</span>
            <input type="number" class="cashipt" placeholder="输入大于100的整数，单笔最大提取1万元">
        </div>
        <div class="text">
            <div>手续费 <span>0</span>金币</div>
            <div>合计 <span>0</span>金币</div>
            <div>到账 <span>0</span>元</div>
        </div>
        <div class="messages">
            <div class="h4">填写收款人信息</div>
            <div class="ipt">
                <div>银行卡</div><input type="text" placeholder="请输入银行卡号">
            </div>
            <div class="ipt">
                <div>收款人</div><input type="text" placeholder="请输入收款人姓名">
            </div>
        </div>
        <div class="rule">
            <div class="h5">提现规则</div>
            <p>1.每次提现现金最低100元起（金币1000）可提现100的倍数</p>
            <p>1.每次提现现金最低100元起（金币1000）可提现100的倍数每次提现现金最低100元起（金币1000）可提现100的倍数</p>
            <p>1.每次提现现金最低100元起（金币1000）可提现100的倍数</p>
            <p>1.每次提现现金最低100元起（金币1000）可提现100的倍数</p>
        </div>
        <div class="btn">
            确认提现
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'cash',
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
    .text {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
        div {
            font-size: 28px;
            line-height: 36px;
            color: #fff;
            span {
                font-size: 28px;
                color: #ff3841;
            }
        }
        span {
            font-size: 26px;
            color: #999999;
        }
        .cashipt {
            width: 100%;
            height: 88px;
            background-color: #311d20 !important;
            color: #fff;
            font-size: 26px;
            margin-top: 20px;
            padding: 0px 30px;
        }
    }
    .messages {
        .ipt {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 32px;
            color: #fff;
            margin-bottom: 60px;
            input {
                flex: 1;
                padding: 0px 30px;
                font-size: 32px;
                color: #fff;
            }
        }
    }
    .rule {
        p {
            font-size: 26px;
            color:#999999;
            line-height: 36px;
            margin-bottom: 20px;
        }
    }
    .btn {
        width: 100%;
        height: 88px;
        border-radius: 88px;
        background-color: #ff3841;
        color: #fff;
        font-size: 36px;
        font-weight: 600;
        letter-spacing: 5px;
        text-align: center;
        line-height: 88px;
        margin-top: 40px;
    }
}
.center .h4 {
    font-size: 32px;
    line-height: 40px;
    border-left: 6px solid #ff3841;
    padding-left: 14px;
    color: #fff;
    margin-bottom: 30px;
    margin-top: 100px;
}
.center .h5 {
    font-size: 32px;
    line-height: 40px;
    color: #fff;
    margin-bottom: 30px;
    margin-top: 100px;
}
</style>