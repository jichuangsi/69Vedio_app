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
        <div class="user_li">
          <div class="zm">a</div>
          <div class="user">
            <span></span>
            <img src="../assets/images/首页 (2) (1).png" alt="">
            <div>ation</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'friend',
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
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