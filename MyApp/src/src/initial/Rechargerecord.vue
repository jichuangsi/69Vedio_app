<template>
    <div class="Rechargerecord">
        <top :top_arr="top_arr"></top>
    <div class="center">
                <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
                <div class="li" v-for="(item,index) in list_arr" :key="index" v-if="id == 1">
                    <div class="left_li">
                        <div>提现{{item.gold}}金币</div>
                        <span>{{item.add_time}}</span>
                    </div>
                    <div class="right_li">
                        <div>{{item.gold}}</div>
                        <span v-if="item.status == 0">处理中</span>
                        <span v-if="item.status == 1">提现成功</span>
                        <span v-if="item.status == 2">提现失败</span>
                    </div>
                </div>
                <div class="li" v-for="(item,index) in list_arr" :key="index" v-if="id == 2">
                    <div class="left_li">
                        <div v-if="item.buy_type == 1">购买金币</div>
                        <div v-if="item.buy_type == 2">{{item.buy_vip_info.name}}</div>
                        <span>{{item.add_time}}</span>
                    </div>
                    <div class="right_li">
                        <div v-if="item.buy_type == 2">{{item.price}}</div>
                        <div v-if="item.buy_type == 1">{{item.buy_glod_num}}</div>
                    </div>
                </div>
                </ScrollContent>
    </div>
    </div>
</template>

<script>
import {getgolerate,cashlist,rechargelist} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import  top  from '@/components/top'
import { Toast } from 'mint-ui';
export default {
  name: 'Rechargerecord',
  components: {
    top,
    ScrollContent
  },
  data() {
    return {
        top_arr:{left:true,title:'充值明细',right:{title:'充值明细',url:false}},
        id:'',
        list_arr:[],
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        page:1
    }
  },
  mounted () {
      this.id = window.location.href.split('title=')[1]
      this.top_arr.title = this.id == 1?'提现明细':'充值明细'
      this.getdata()
  },
  methods: {
      getdata(){
          if(this.id == 1){
              cashlist(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.drlist.length != 0){
                    this.list_arr.push(...res.data.data.drlist)
                    this.page = this.page+1
                }
                    if(res.data.data.drlist.length == 0){
                        Toast('没有更多了...')
                        this.mescrolls.endByPage(0,1)
                    }
                    this.mescrolls.endErr()
            })
          }else{
              rechargelist(this.page).then(res=>{
                console.log(res)
                if(res.data.resultCode == 0&&res.data.data.drlist.length != 0){
                    this.list_arr.push(...res.data.data.drlist)
                    this.page = this.page+1
                }
                    if(res.data.data.drlist.length == 0){
                        Toast('没有更多了...')
                        this.mescrolls.endByPage(0,1)
                    }
                    this.mescrolls.endErr()
            })
          }
      },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    loadDatas(){
        this.getdata()
    },
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
    height: 90vh;
    position: relative;
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
.mescroll {
    position: absolute;
    left: 0px;
	top:0px;
	height: 90vh; /*如设置bottom:50px,则需height:auto才能生效*/
    padding: 60px 30px;
    padding-bottom: 200px;
}
</style>