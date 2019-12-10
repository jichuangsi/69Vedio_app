<template>
    <div class="Upload">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">上传视频</div>
        <div class="right" @click="myupload">我的上传</div>
    </div>
    <div class="center">
        <div class="video_title">
            <div class="h4">
                标题
                <span>（标题内容长度8-20个字）</span>
            </div>
            <input type="text" maxlength="20" v-model="title">
        </div>
        <div class="video_box">
            <div class="h4">
                上传视频&封面
            </div>
            <div class="mp4">
                <div class="file_box" @click="bottom_box('拍摄视频')">
                    <div class="add">+</div>
                    <div>上传视频</div>
                    <video loop v-if="filevideo">
                        <source :src="filevideo" type="video/mp4">
                    </video>
                    <!-- <input type="file" name="" id=""> -->
                </div>
                <div>
                    <sup>※</sup>视频大小不能超过50M
                </div>
            </div>
            <div class="png">
                <div class="file_box" @click="bottom_box('拍摄图片')">
                    <div class="add">+</div>
                    <div>上传图片</div>
                    <img :src="fileimg" v-if="fileimg" alt="">
                    <!-- <input type="file" name="" id=""> -->
                </div>
                <div>
                    <sup>※</sup>点击选择封面（必选）
                </div>
            </div>
        </div>
        <div class="video_price">
            <div class="h4">
                设置价格
                <span>（1元=10金币）</span>
            </div>
            <div class="ipt">
                <input type="number" v-model="money"><span>(若不输入价格则为免费)</span>
            </div>
        </div>
        <div class="video_label">
            <div class="h4">
                添加标签
                <span>（最多添加5个标签）</span>
            </div>
            <div class="ipt">
                <input type="text" v-for="(item,index) in ipt_arr" :key="index">
                <div @click="addipt()">+</div>
            </div>
        </div>
        <div class="Agreement" @click="Agreement_state = !Agreement_state">
            <div :class="{Agreement_check:Agreement_state}"></div> 已阅读<span>69短视频</span>上传协议并同意上传视频
        </div>
        <div class="upload_btn" @click="uploadBtn" :class="{btn_o:btnstate}">
            提交
        </div>
    </div>
    <div class="bj" v-if="bottom_check">
    <div class="bottom_box" :class="{bottom_check:bottom_check}">
        <div class="ps" @click="ps(ps_text)">
            <div>拍摄</div>
            <div class="text">{{ps_text}}</div>
        </div>
        <div class="xz" @click="xz(ps_text)">
            <div>从手机相册选择</div>
        </div>
        <div class="xz" v-if="ylstate" @click="ylclick">
            <div>预览</div>
        </div>
        <div class="xian"></div>
        <div class="qx" @click="bottom_check = !bottom_check">取消</div>
    </div>
    </div>
    <div class="bigbox" v-show="bigstate" @click="bigclick">
        <img :src="fileimg" alt="" v-if="ps_text == '拍摄图片'">
        <video loop v-if="ps_text == '拍摄视频'" ref="sp_video">
            <source :src="filevideo" type="video/mp4">
        </video>
    </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'Upload',
  data() {
    return {
      ipt_arr: [1],
      bottom_check:false,
      Agreement_state:false,
      ps_text: "拍摄视频",
      ready:false,
    //   fileimg: require('../assets/images/cd29fe54b110d82bbe16d8400e0383b6.jpg'),
      fileimg:'',
      filevideo:'',
      bigstate: false,
      ylstate: false,
      title:'',
      money:''
    }
  },
  computed:{
      btnstate(){
          if(this.title!=''&&this.fileimg!=''&&this.filevideo!=''&&this.Agreement_state){
              return true
          }else{
              return false
          }
      }
  },
  mounted () {
    this.initialize();
  },
  methods: {
      uploadBtn(){
          
              Toast('上传成功')
          if(this.btnstate){
              let data = localStorage.getItem('my_video')?JSON.parse(localStorage.getItem('my_video')):[]
              data.push({
                "video":this.filevideo,
                "posterimg":this.fileimg,
                "userimg":require('../assets/images/星星.png'),
                "love":0,
                "comment":0,
                "share":0,
                "username":"#爱笑的女孩",
                "title":this.title,
                "musicname":"爱笑的女孩"
              })
              localStorage.setItem('my_video',JSON.stringify(data))
              this.filevideo = ''
              this.fileimg = ''
              this.title = ''
              this.money = ''
              this.ipt_arr = [1]
          }
      },
    initialize() {
      let _this = this;
      document.addEventListener(
        "deviceready",
        _this.onDeviceReady.bind(this),
        false
      );
    },
    onDeviceReady(val) {
      this.ready = true;
    },
    back(){
      window.history.go(-1)
    },
    addipt(){
      if(this.ipt_arr.length<5){
        this.ipt_arr.push(this.ipt_arr.length)
      }
    },
    myupload(){
       this.$router.push({ path:'/myupload' })
    },
    bottom_box(val){
        this.bottom_check = true
        this.ps_text = val
        if(val == '拍摄视频'&&this.filevideo!=''){
            this.ylstate = true
        }else if(val == '拍摄图片'&&this.fileimg!=''){
            this.ylstate = true
        }else{
            this.ylstate = false
        }
    },
    ps(val){
        if(val == '拍摄视频'){
            this.sp()
        }else{
            this.zp()
        }
    },
    sp(){
        let self = this
        navigator.device.capture.captureVideo(
            onSuccess,// 视频录制成功后的处理
            onFail, // 视频录制失败后的处理
            {
                duration: 15,// 限制录制的视频时间长度，单位：/秒
                limit:1 // 非必填，不写此项时，默认为1
                // 在ios一次只能录一个视频，
                //在Android上，连续录制视频的个数受limit的限制
            }
        );
        function onSuccess(res){
            console.log(res)
            console.log(res[0].localURL)
            self.filevideo = res[0].fullPath
            
            self.$refs.sp_video.src = res[0].fullPath
            self.bottom_check = false
        }
        function onFail(err){
            console.log(err)
            self.bottom_check = false
        }
    },
    zp(){
        let self = this
        if(self.ready){
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.NATIVE_URI,
          mediaType: 0,
          saveToPhotoAlbum: true,
          cameraDirection: 0,
          encodingType: Camera.EncodingType.PNG
        });
        function onSuccess(imageData) {
        console.log(imageData)
        self.fileimg = imageData
        self.bottom_check = false
        }
        function onFail(message) {
        console.log(message)
        self.bottom_check = false
          //Toast("拍照失败，原因为: " + message);
        }
        }else{
        }
    },
    xz(val){
        if(val == '拍摄视频'){
            this.sp_file()
        }else{
            this.zp_file()
        }
    },
    sp_file(){
        let self = this
        if(self.ready){
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.NATIVE_URI,
          sourceType:0,
          mediaType: 1,
          cameraDirection: 0
        });
        function onSuccess(mp4Data) {
        console.log(mp4Data)
        console.log('file://'+ mp4Data)
        self.filevideo = 'file://'+ mp4Data
        self.$refs.sp_video.src = 'file://'+ mp4Data
        self.bottom_check = false
        }
        function onFail(message) {
        console.log(message)
        self.bottom_check = false
          //Toast("选择视频，原因为: " + message);
        }
        }else{
        }
    },
    zp_file(){
        let self = this
        if(self.ready){
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.NATIVE_URI,
          sourceType:0,
          mediaType: 0,
          cameraDirection: 0,
          encodingType: Camera.EncodingType.PNG
        });
        function onSuccess(imageData) {
        console.log(imageData)
        self.fileimg = imageData
        self.bottom_check = false
        }
        function onFail(message) {
        console.log(message)
        self.bottom_check = false
          //Toast("选择图片，原因为: " + message);
        }
        }else{
        }
    },
    ylclick(){
        this.bigstate = true
        this.bottom_check = false
        console.log(this.$refs.sp_video)
        if(this.ps_text == '拍摄视频'&&this.bigstate == true){
            this.$refs.sp_video.play()
        }
    },
    bigclick(){
        this.bigstate = false
        if(this.ps_text == '拍摄视频'&&this.bigstate == false){
            this.$refs.sp_video.pause()
        }
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
}
.center .video_title {
    padding-bottom: 60px;
}
.center .video_title input {
    width: 100%;
    height: 88px;
    display: block;
    background-color: #241618 !important;
    color: #fff;
    padding: 0px 30px;
}
.center .video_box {
    margin-bottom: 60px;
    font-size: 28px;
    line-height: 36px;
    color: #999;
}
.center .video_box .mp4 {
    display: inline-block;
    margin-right: 20px;
}
.center .video_box .png {
    display: inline-block;
}
.center .video_box .file_box {
    width: 180px;
    height: 180px;
    background-color: #241618;
    position: relative;
    margin-bottom: 20px;
    text-align: center;
}
.center .video_box .file_box .add{
    font-size: 180px;
    line-height: 120px;
    color: #312121;
}
.center .video_box .file_box img,.center .video_box .file_box video {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #333;
}
.center .video_box sup {
    font-size: 16px;
    color: #ff3841;
}
.center .video_price {
    margin-bottom: 60px;
}
.center .video_price .ipt {
    width: 100%;
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.center .video_price .ipt input {
    width: 436px;
    height: 100%;
    background-color: #241618 !important;
    color: #fff;
    padding: 0px 30px;
}
.center .video_price .ipt span {
    font-size: 26px;
    color: #999999;
    margin-left: 42px;
}
.center .video_label {
    margin-bottom: 60px;
}
.center .video_label .ipt {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.center .video_label .ipt input{
    width: 120px;
    height: 72px;
    background-color: #241618 !important;
    color: #fff;
    padding: 0px 10px;
    margin-right: 20px;
    margin-bottom: 20px;
}
.center .video_label .ipt div {
    font-size: 66px;
    color: #312121;
    margin-bottom: 20px;
}
.center .Agreement {
    margin-bottom: 60px;
    font-size: 26px;
    color: #999999;
    display: flex;
    align-items: center;
}
.center .Agreement span {
    color: #ff3841;
}
.center .Agreement div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #999999;
    margin-right: 10px;
}
.center .Agreement .Agreement_check {
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -314px -4425px;
}
.center .upload_btn {
    width: 600px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    background-color: #999999;  
    color: #fff;
    letter-spacing: 5px;
    margin: 60px auto;
    border-radius: 80px;
}
.center .btn_o{
    background-color: #ff3841;
}
.center .h4 {
    font-size: 28px;
    line-height: 40px;
    border-left: 6px solid #ff3841;
    padding-left: 14px;
    color: #fff;
    margin-bottom: 30px;
    font-weight: 600;
}
.center .h4 span {
    color: #999;
    font-size: 22px;
}
.bottom_box {
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    transform: translateY(100%)
}
.bottom_check {
    transform: translateY(0%)
}
.bottom_check .ps {
    width: 690px;
    height: 136px;
    border-bottom: 1px solid #dddddd;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32px;
    text-align: center;
}
.bottom_check .ps .text {
    font-size: 26px;
    color: #999;
    margin-top: 10px;
}
.bottom_check .xz {
    width: 690px;
    text-align: center;
    font-size: 32px;
    line-height: 107px;
    margin: 0 auto;
    border-bottom: 1px solid #dddddd;
}
.bottom_check .xian {
    width: 100%;
    height: 12px;
    background-color: #dddddd;
}
.bottom_check .qx {
    width: 100%;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
}
.bj {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.3);
}
.bigbox {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.6);
    overflow-y: auto;
}
.bigbox img {
    width: auto;
    max-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.bigbox video {
    width: 100%;
}
</style>