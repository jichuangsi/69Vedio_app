import axios from '../utils/axios'
// import axios from 'axios'


//登录
export function register(equipInfo) {
  return axios({
    method: 'POST',
    url: `/Userservice/register`,
    data: equipInfo
  });
}

//上传
export function upload(param) {
  return axios({
    method: 'POST',
    url: `/Videoservice/upload`,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data: param,
    withCredentials:true
  });
}
//编辑个人信息
export function editmemberinfo(param) {
  return axios({
    method: 'POST',
    url: `/Memberservice/editmemberinfo`,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data:param,
    withCredentials:true
  });
}


//获取标签
export function gettags() {
  return axios({
    method: 'POST',
    url: `/Videoservice/gettags`
  });
}

//获取分类
export function getclasses() {
  return axios({
    method: 'POST',
    url: `/Videoservice/getclasses`
  });
}

//获取推荐视频
export function homevideo(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/homevideo`,
    data:{
      page
    }
  });
}
//点赞视频
export function videocollection(vid) {
  return axios({
    method: 'POST',
    url: `/Videoservice/videocollection`,
    data:{
      vid
    }
  });
}
//取消点赞视频
export function cancelcollection(vid) {
  return axios({
    method: 'POST',
    url: `/Videoservice/cancelcollection`,
    data:{
      vid
    }
  });
}

//获取喜欢列表
export function mylike(page,uid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/mylike`,
    data:{
      page,
      uid
    }
  });
}

//获取购买列表
export function mybuyvideos(page,uid) {
  return axios({
    method: 'POST',
    url: `/Videoservice/mybuyvideos`,
    data:{
      page,
      uid
    }
  });
}

//获取个人信息
export function getmemberinfo(uid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/getmemberinfo`,
    data:{
      uid
    }
  });
}

//通过经纬度获取详细地址
export function locate(latitude,longitude,accuracy,timestamp) {
  return axios({
    method: 'POST',
    url: `/Geoservice/locate`,
    data:{
      latitude,longitude,accuracy,timestamp
    }
  });
}
//获取定位信息
export function getlocation() {
  return axios({
    method: 'POST',
    url: `/Geoservice/getlocation`
  });
}
//获取附近的人
export function nearbymember() {
  return axios({
    method: 'POST',
    url: `/Geoservice/nearbymember`
  });
}

//人气排行
export function popularrank() {
  return axios({
    method: 'POST',
    url: `/Rankservice/popularrank`
  });
}
//邀请大神
export function inviterank() {
  return axios({
    method: 'POST',
    url: `/Rankservice/inviterank`
  });
}
//上传大神
export function uploadrand() {
  return axios({
    method: 'POST',
    url: `/Rankservice/uploadrand`
  });
}

//我的视频
export function myvideos(page,uid) {
  return axios({
    method: 'POST',
    url: `/Videoservice/myvideos`,
    data:{
      page,uid
    }
  });
}
//最新上传
export function latestvideos(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/latestvideos`,
    data:{
      page
    }
  });
}
//金币专区
export function payvideos(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/payvideos`,
    data:{
      page
    }
  });
}
//最多播放
export function playmostvideos(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/playmostvideos`,
    data:{
      page
    }
  });
}
//最多评论
export function commentmostvideos(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/commentmostvideos`,
    data:{
      page
    }
  });
}
//最多点赞
export function likemostvideos(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/likemostvideos`,
    data:{
      page
    }
  });
}

// /Videoservice/concernvideos 关注人视频
export function concernvideos(page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/concernvideos`,
    data:{
      page
    }
  });
}
// /Memberservice/addconcern 关注用户
export function addconcern(cid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/addconcern`,
    data:{
      cid
    }
  });
}
// /Memberservice/delconcern 取消关注用户
export function delconcern(cid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/delconcern`,
    data:{
      cid
    }
  });
}
// /Memberservice/getfriends 获取好友列表
export function getfriends(page) {
  return axios({
    method: 'POST',
    url: `/Memberservice/getfriends`,
    data:{
      page
    }
  });
}
//Memberservice/getconcerns 获取关注列表
export function getconcerns(uid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/getconcerns`,
    data:{
      uid
    }
  });
}
// /Memberservice/getconcerneds 获取粉丝列表
export function getconcerneds(uid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/getconcerneds`,
    data:{
      uid
    }
  });
}
// /Memberservice/removeconcerneds 移出粉丝列表
export function removeconcerneds(cid,uid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/removeconcerneds`,
    data:{
      cid,uid
    }
  });
}
// /Memberservice/recommendconcerns 推荐关注列表(可翻页)
export function recommendconcerns(page) {
  return axios({
    method: 'POST',
    url: `/Memberservice/recommendconcerns`,
    data:{
      page
    }
  });
}

// Geoservice/getaddress 移出粉丝列表
export function getaddress(upid) {
  return axios({
    method: 'POST',
    url: `/Geoservice/getaddress`,
    data:{
      upid
    }
  });
}

///Memberservice/sharelink代理分享链接
export function sharelink() {
  return axios({
    method: 'POST',
    url: `/Memberservice/sharelink`
  });
}
// Commentservice/getnotice系统通知
export function getnotice() {
  return axios({
    method: 'POST',
    url: `/Commentservice/getnotice`
  });
}


// Commentservice/mygoods我的点赞列表
export function mygoods(page) {
  return axios({
    method: 'POST',
    url: `/Commentservice/mygoods`,
    data:{
      page
    }
  });
}
// Commentservice/mycomments我的评论列表
export function mycomments(page) {
  return axios({
    method: 'POST',
    url: `/Commentservice/mycomments`,
    data:{
      page
    }
  });
}

// Commentservice/getcomments获取评论
export function getcomments(vid,page,pid) {
  return axios({
    method: 'POST',
    url: `/Commentservice/getcomments`,
    data:{
      vid,page,pid
    }
  });
}
// Commentservice/submitcomment评论
export function submitcomment(vid,content,tid,pid) {
  return axios({
    method: 'POST',
    url: `/Commentservice/submitcomment`,
    data:{
      vid,content,tid,pid
    }
  });
}
// Memberservice/buyvideo购买视频
export function buyvideo(vid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/buyvideo`,
    data:{
      vid
    }
  });
}
// Videoservice/videosearch搜索
export function videosearch(k,page) {
  return axios({
    method: 'POST',
    url: `/Videoservice/videosearch`,
    data:{
      k,page
    } 
  });
}
// Memberservice/tryandsee获取点击
export function tryandsee(vid) {
  return axios({
    method: 'POST',
    url: `/Memberservice/tryandsee`,
    data:{
      vid
    }
  });
}
// /Goldservice/getgolerate获取金币汇率、最低提现、是否提现
export function getgolerate() {
  return axios({
    method: 'POST',
    url: `/Goldservice/getgolerate`,
  });
}
// /Goldservice/getgoldlist获取金币套餐
export function getgoldlist() {
  return axios({
    method: 'POST',
    url: `/Goldservice/getgoldlist`,
  });
}
// /Goldservice/getviplist获取金VIP套餐
export function getviplist() {
  return axios({
    method: 'POST',
    url: `/Goldservice/getviplist`,
  });
}
// Goldservice/cashwithdrawal提现申请
export function cashwithdrawal(gold,money,cid) {
  return axios({
    method: 'POST',
    url: `/Goldservice/cashwithdrawal`,
    data:{
      gold,money,cid
    }
  });
}

// /Goldservice/getgoldrecord获取用户支出，收入
export function getgoldrecord(gstatus,page,gtype) {
  return axios({
    method: 'POST',
    url: `/Goldservice/getgoldrecord`,
    data:{
      gstatus,page,gtype
    }
  });
}
// /Memberservice/getcard
export function getcard() {
  return axios({
    method: 'POST',
    url: `/Memberservice/getcard`,
  });
}
// /Memberservice/editcard
export function editcard(aname,account,type,bank) {
  return axios({
    method: 'POST',
    url: `/Memberservice/editcard`,
    data:{
      aname,account,type,bank
    }
  });
}

// /Goldservice/viprechargeVIP充值
export function viprecharge(rid) {
  return axios({
    method: 'POST',
    url: `/Goldservice/viprecharge`,
    data:{
      rid
    }
  });
}
// /Goldservice/cashlist提现记录
export function cashlist(page) {
  return axios({
    method: 'POST',
    url: `/Goldservice/cashlist`,
    data:{
      page
    }
  });
}

// /Goldservice/rechargelist充值记录
export function rechargelist(page) {
  return axios({
    method: 'POST',
    url: `/Goldservice/rechargelist`,
    data:{
      page
    }
  });
}
// /Goldservice/getposter广告
export function getposter(aid) {
  return axios({
    method: 'POST',
    url: `/Goldservice/getposter`,
    data:{
      aid
    }
  });
}