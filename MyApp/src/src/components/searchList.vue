<template>
    <div class="searchList">
        <div class="ipt">
            <div class="search">
                <span @click="btn"></span>
                <input type="text" v-model="search_text">
            </div>
            <div class="qx" @click="back">取消</div>
        </div>
        <ScrollContent ref="myscrollfull" @load="loadDatas" :mescrollValue="mescrollValue" @init="mescrollsInit">
            <div class="center">
                <div class="li" v-for="(item,index) in search_arr" :key="index">
                    <div class="userimg">
                        <img :src="item.headimgurl" alt="">
                    </div>
                    <div class="username">
                        {{item.nickname}} ·
                    </div>
                    <div class="time">
                        {{item.add_time}}
                    </div>
                    <div class="title">
                        {{item.title}}
                        <span v-for="(val,i) in item.tags" :key="i">#{{val.name}}</span>
                    </div>
                    <div class="thumbnail" @click="singleGo(item)">
                        <img :src="item.thumbnail" alt="">
                    </div>
                </div>
            </div>
        </ScrollContent>
    </div>
</template>

<script>
import {videosearch} from '@/api/api'
import ScrollContent from '@/components/ScrollContent'
import { Toast } from 'mint-ui';
export default {
  name: 'searchList',
  components: {
    ScrollContent
  },
  data() {
    return {
        page:1,
        search_text:'',
        search_arr:[],
        mescrollValue: {up: true, down: false},     //页面你是否需要下拉上拉加载
        btnstatus:false
    }
  },
  watch: {
      search_text(newval,oldval){
          this.btnstatus = true
      }
  },
  mounted () {
      if(sessionStorage.getItem('search_arr')){
          this.search_arr = JSON.parse(sessionStorage.getItem('search_arr'))
          this.page = sessionStorage.getItem('search_index')
          this.search_text = sessionStorage.getItem('search_text')
      }
  },
  methods: {
    back(){
      window.history.go(-1)
    },
    btn(){
        console.log(this.btnstatus)
        videosearch(this.search_text,this.page).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0&&res.data.data.videos.length !=0){
                this.page = this.page+1
                if(this.btnstatus){
                    this.search_arr = res.data.data.videos
                    this.btnstatus = false
                }else{
                    this.search_arr.push(...res.data.data.videos)
                }
                sessionStorage.setItem('search_arr',JSON.stringify(this.search_arr))
                sessionStorage.setItem('search_index',this.page)
                sessionStorage.setItem('search_text',this.search_text)
            }
            if(res.data.data.videos.length == 0){
                Toast('没有更多了...')
                this.mescrolls.endByPage(0,1)
            }
            this.mescrolls.endErr()
        })
    },
    singleGo(val) {
        let num = sessionStorage.getItem('frequency')?Number(sessionStorage.getItem('frequency'))+1:1
        sessionStorage.setItem('Single'+num,JSON.stringify(val))
        sessionStorage.setItem('frequency',num)
        this.$router.push({
          path: '/Single_video'
        })
    },
    mescrollsInit (mescrolls) {
        this.mescrolls = mescrolls;
    },
    loadDatas(){
        this.btn()
    }
  }
}
</script>

<style scoped lang="scss">
.ipt {
    width: 100%;
    padding: 20px 30px;
    border: 1px solid #211a1a;
    display: flex;
    align-items: center;
    .search {
        flex: 1px;
        margin-right: 46px;
        background-color: #211212;
        height: 88px;
        line-height: 88px;
        border-radius: 88px;
        display: flex;
        align-items: center;
        padding: 0px 20px;
        span {
            width: 44px;
            height: 43px;
            display: block; 
            background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
            background-size: 750px 4532px;
            background-position: -16px -870px;
        }
        input {
            font-size: 28px;
            color: #999;
            padding: 0px 20px;
        }
    }
    .qx {
        font-size: 26px;
        color: #ff3841;
    }
}
.center {
    padding: 20px;
    position: relative;
    .li {
        width: 100%;
        line-height: 46px;
        margin-bottom: 30px;
        .userimg {
            width: 84px;
            height: 84px;
            display: inline-block;
            vertical-align: middle;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .username {
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
            color: #fff;
            font-size: 30px;
        }
        .time {
            display: inline-block;
            vertical-align: middle;
            font-size: 30px;
            color: #999;
        }
        .title {
            font-size: 30px;
            margin-top: 20px;
            margin-bottom: 30px;
            color: #fff;
            span {
                color: #ff3841;
                margin-left: 20px;
            }
        }
        .thumbnail {
            width: 336px;
            img {
                width: 100%;
            }
        }
    }
}
.mescroll {
    position: absolute;
    left: 0px;
	top:128px;
    padding: 20px;
	height: 90vh; /*如设置bottom:50px,则需height:auto才能生效*/
    background-color: #100909;
}
</style>