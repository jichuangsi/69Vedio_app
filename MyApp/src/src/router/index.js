import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/initial/Index'
import My from '@/initial/My'
import Popularity from '@/initial/Popularity'
import personal from '@/initial/personal'
import Upload from '@/initial/Upload'
import myupload from '@/initial/myupload'
import news from '@/initial/news'
import wallet from '@/initial/wallet'
import cash from '@/initial/cash'
import Profit from '@/initial/Profit'
import Rechargerecord from '@/initial/Rechargerecord'
import follow from '@/initial/follow'
import notice from '@/components/notice'
import nearby from '@/components/nearby'
import friend from '@/components/friend'
import Video_play from '@/components/Video_play'
import Single_video from '@/components/Single_video'
import Foot from '@/components/Foot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/My',
      name: 'My',
      component: My
    },
    {
      path: '/Popularity',
      name: 'Popularity',
      component: Popularity
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/myupload',
      name: 'myupload',
      component: myupload
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: nearby
    },
    {
      path: '/friend',
      name: 'friend',
      component: friend
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '/cash',
      name: 'cash',
      component: cash
    },
    {
      path: '/Profit',
      name: 'Profit',
      component: Profit
    },
    {
      path: '/Rechargerecord',
      name: 'Rechargerecord',
      component: Rechargerecord
    },
    {
      path: '/follow',
      name: 'follow',
      component: follow
    },
    {
      path: '/Video_play',
      name: 'Video_play',
      component: Video_play
    },
    {
      path: '/Single_video',
      name: 'Single_video',
      component: Single_video
    },
    {
      path: '/Foot',
      name: 'Foot',
      component: Foot
    }
  ]
})
