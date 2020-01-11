<template>
    <div class="Upload">
    <top :top_arr="top_arr"></top>
    <div class="center">
        <ScrollContent ref="myscrollfull" :mescrollValue="mescrollValue">
        <div class="video_title">
            <div class="h4">
                标题
                <span>（标题内容长度5-20个字）</span>
            </div>
            <input type="text" maxlength="20" v-model="title">
        </div>
        <div class="video_box">
            <div class="h4">
                上传视频&封面
            </div>
            <div class="mp4">
                <!--  @click="bottom_box('拍摄视频')" -->
                <div class="file_box" @click="bottom_box('拍摄视频')">
                    <div class="add">+</div>
                    <div>上传视频</div>
                    <video v-if="filevideo">
                        <source :src="filevideo" type="video/mp4">
                    </video>
                    <!-- <input type="file" name="" id="video" @change="videochange"> -->
                </div>
                <div>
                    <sup>※</sup>视频大小不能超过30M
                </div>
            </div>
            <div class="png">
                <!--  @click="bottom_box('拍摄图片')" -->
                <div class="file_box" @click="bottom_box('拍摄图片')">
                    <div class="add">+</div>
                    <div>上传图片</div>
                    <img :src="fileimg" v-if="fileimg" alt="">
                    <!-- <input type="file" name="" id="img"> -->
                </div>
                <div>
                    <sup>※</sup>点击选择封面（必选）
                </div>
            </div>
        </div>
        <div class="video_price">
            <div class="h4">
                设置价格
                <span>（1元={{golerate}}金币）</span>
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
                <div class="input" v-for="(item,index) in ipt_arr" :key="index" @click='delipt(index)'>{{item}}</div>
                <div @click="addipt()">+</div>
            </div>
        </div>
        <div class="video_label">
            <div class="h4">
                添加分类
            </div>
            <div class="ipt">
                <div class="input oneinput" @click='delclass()'>{{class_name}}</div>
            </div>
        </div>
        <div class="Agreement" @click="Agreement_state = !Agreement_state">
            <div :class="{Agreement_check:Agreement_state}"></div> 已阅读<span>69短视频</span>上传协议并同意上传视频
        </div>
        <div class="upload_btn" @click="uploadBtn" :class="{btn_o:btnstate}">
            提交
        </div>
        </ScrollContent>
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
    <div class="bj" v-if="tagsstate" @click="tagsstate = !tagsstate">
        <div class="white">
            <div v-for="(item,index) in tags_arr" :key="index" @click.stop="tags_check(item)">{{item.name}}</div>
        </div>
    </div>
    <div class="bj" v-if="classesstate" @click="classesstate = !classesstate">
        <div class="white">
            <div v-for="(item,index) in classes_arr" :key="index" @click.stop="classes_check(item)">{{item.name}}</div>
        </div>
    </div>
    <div class="bigbox" v-show="bigstate" @click="bigclick">
        <img :src="fileimg" alt="" v-if="ps_text == '拍摄图片'">
        <video loop v-if="ps_text != '拍摄图片'" ref="sp_video">
            <source :src="filevideo" type="video/mp4">
        </video>
    </div>
    <load v-if="!uploadbtn"></load>
    </div>
</template>

<script>
import axios from 'axios'
import {upload,gettags,getclasses,getgolerate} from '@/api/api'
import { Toast } from 'mint-ui';
import load from '@/components/loading'
import  top  from '@/components/top'
import ScrollContent from '@/components/ScrollContent'
export default {
  name: 'Upload',
  components: {
      ScrollContent,
      load,
      top
  },
  data() {
    return {
      top_arr:{left:true,title:'上传视频',right:{title:'我的上传',url:'/myupload'}},
      ipt_arr: [],
      bottom_check:false,
      Agreement_state:true,
      ps_text: "拍摄视频",
      ready:false,
      mescrollValue: {up: false, down: false},     //页面你是否需要下拉上拉加载
    //   fileimg: require('../assets/images/cd29fe54b110d82bbe16d8400e0383b6.jpg'),
      fileimg:'',
      filevideo:'',
      bigstate: false,
      ylstate: false,
      title:'',
      money:0,
      param:'',
      class_name:'',
      tagsstate:false,
      tags_arr:[],
      classesstate:false,
      classes_arr:[],
      tags_id:[],
      classes_id:'',
      uploadbtn:true,
      golerate:''
    }
  },
  computed:{
      btnstate(){
          if(this.title.length>=5&&this.fileimg!=''&&this.filevideo!=''&&this.Agreement_state){
              return true
          }else{
              return false
          }
      }
  },
  mounted () {
    this.initialize();
    this.getdata()
    this.param = new FormData()
  },
  methods: {
      getdata(){
          gettags().then(res=>{
            //   console.log(res)
            //   if(res.data.resultCode == 0){
                this.tags_arr = res.data.data
            //   }
          })
          getclasses().then(res=>{
            //   console.log(res)
            //   if(res.data.resultCode == 0){
                this.classes_arr = res.data.data
            //   }
          })
          getgolerate().then(res=>{
              console.log(res)
            this.golerate = res.data.data.goldrate
          })
      },
      uploadBtn(){
          let self = this
          if(self.btnstate&&self.uploadbtn){
              self.uploadbtn = false
              let a = self.tags_id.toString()
              self.param.append('title',self.title)
              self.param.append('accept',self.Agreement_state?1:0)
              self.param.append('gold',self.money)
              self.param.append('tags',a)
              self.param.append('class',self.classes_id)
            upload(self.param).then(res=>{
                console.log(res)
                Toast(res.data.message)
                self.uploadbtn = true
                if(res.data.resultCode == 0){
                    self.title = ''
                    self.Agreement_state = true
                    self.money = 0
                    self.fileimg = ''
                    self.filevideo = ''
                    self.classes_id = ''
                    self.class_name = ''
                    self.tags_id = []
                    self.ipt_arr = []
                }
            }).catch(err=>{
                console.log(err)
                self.uploadbtn = true
            })
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
    addipt(){
      if(this.ipt_arr.length<5){
        this.tagsstate = true
      }
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
            onSuccess,// 视频录制功后的处理成
            onFail, // 视频录制失败后的处理
            {
                duration: 15,// 限制录制的视频时间长度，单位：/秒
                limit:1, // 非必填，不写此项时，默认为1
                // 在ios一次只能录一个视频，
                //在Android上，连续录制视频的个数受limit的限制
                quality: 1
            }
        );
        function onSuccess(res){
            // self.filevideo = res[0].fullPath
            // self.$refs.sp_video.src = res[0].fullPath
            self.bottom_check = false
            self.uploadbtn = false
            console.log(res)

        if(device.platform == 'iOS'){
            self.edit(res[0])
        }else{
          var permissions = cordova.plugins.permissions
          permissions.checkPermission(
            permissions.WRITE_EXTERNAL_STORAGE,
            function(s) {
              if (!s.hasPermission) {
                //没有权限
                //app申请写入权限
                permissions.requestPermission(
                  permissions.WRITE_EXTERNAL_STORAGE,
                  function(s) {
                    if (s.hasPermission) {
                      //申请成功
                      console.log('request WRITE_EXTERNAL_STORAGE success');
                      self.edit(res[0])
                    } else {
                      console.log('request WRITE_EXTERNAL_STORAGE fail');
                    }
                  },
                  function(error) {}
                )
              }else{
                console.log('has WRITE_EXTERNAL_STORAGE already');
                self.edit(res[0])
              }
            },
            function(error) {}
          );
        }
        }


        function onFail(err){
            console.log(err)
            self.bottom_check = false
        }
    },
    zp(){
        let self = this
        if(self.ready){
         let ratio = window.screen.width / window.screen.height;
         let targetHeight = window.screen.height / 0.5;
         let targetWidth = targetHeight * ratio;
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 100,
          destinationType: Camera.DestinationType.NATIVE_URI,
          mediaType: 0,
          saveToPhotoAlbum: true,
          cameraDirection: 0,
          targetWidth:targetWidth,
          targetHeight:targetHeight,
          encodingType: Camera.EncodingType.PNG
        });
        function onSuccess(imageData) {
        console.log(imageData)
        if(device.platform == 'iOS'){
            self.fileimg = 'cdvfile://localhost/' + imageData
        }else{
            self.fileimg = imageData
        }
        self.bottom_check = false
        // self.uploadbtn = false
        window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        fileEntry.file(function (file) {
            console.log(file)
            console.log(file.size)
            if(device.platform == 'iOS'){
                self.fileimg = file.localURL
            }
            // self.zp_edit(file,imageData)
            if(file.size<5048576){
            self.zhuan(imageData)
            }else{
            Toast('图片过大')
            }
        });
        }, (err)=>{
            console.log(6666)
            console.log(err)
        })
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
        // self.filevideo = 'file://'+ mp4Data
        // self.$refs.sp_video.src = mp4Data
        console.log(mp4Data)
        self.bottom_check = false
        self.uploadbtn = false
        console.log(device.platform)
        if(device.platform == 'iOS'){
            window.resolveLocalFileSystemURL( 'file://'+ mp4Data, (fileEntry) => {
                fileEntry.file(function (file) {
                  self.edit(file,'file://'+ mp4Data)
                });
              }, (err)=>{
                console.log(6666)
                console.log(err)
            })
        }else{
          var permissions = cordova.plugins.permissions
          permissions.checkPermission(
            permissions.WRITE_EXTERNAL_STORAGE,
            function(s) {
              if (!s.hasPermission) {
                //没有权限
                //app申请写入权限
                permissions.requestPermission(
                  permissions.WRITE_EXTERNAL_STORAGE,
                  function(s) {
                    if (s.hasPermission) {
                      //申请成功
                      console.log('request WRITE_EXTERNAL_STORAGE success');
                      window.resolveLocalFileSystemURL('file://'+ mp4Data, (fileEntry) => {
                        fileEntry.file(function (file) {
                          self.edit(file,'file://'+ mp4Data)
                        });

                      }, (err)=>{
                        console.log(6666)
                        console.log(err)
                      })


                    } else {
                      console.log('request WRITE_EXTERNAL_STORAGE fail');
                    }
                  },
                  function(error) {}
                )
              }else{
                console.log('has WRITE_EXTERNAL_STORAGE already');

                window.resolveLocalFileSystemURL('file://'+ mp4Data, (fileEntry) => {
                  fileEntry.file(function (file) {
                    self.edit(file,'file://'+ mp4Data)
                  });

                }, (err)=>{
                  console.log(6666)
                  console.log(err)
                })

              }
            },
            function(error) {}
          );

        }
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
        self.bottom_check = false
        if(device.platform == 'iOS'){
            self.fileimg = 'cdvfile://localhost/' + imageData
        }else{
            self.fileimg = imageData
        }
        console.log(imageData)
        // self.uploadbtn = false
        window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        fileEntry.file(function (file) {
            console.log(file)
            console.log(file.size)
            // self.zp_edit(file,imageData)
            if(device.platform == 'iOS'){
                self.fileimg = file.localURL
            }
            if(file.size<5048576){
            self.zhuan(imageData)
            }else{
            Toast('图片过大')
            }
        });
        }, (err)=>{
            console.log(6666)
            console.log(err)
        })
        }
        function onFail(message) {
        console.log(message)
        self.bottom_check = false
          //Toast("选择图片，原因为: " + message);
        }
        }else{
        }
    },
    edit(val,path){
        console.log(val)
        console.log(path);
        console.log(val.fullPath);
        let self = this
        let urlpath
        if(device.platform == 'iOS'){
            urlpath = path?path:val.localURL
        }else{
            urlpath = path?path:val.fullPath
        }
        console.log(urlpath)
        if(val.size < 10485760){
            self.zhuan(urlpath)
            self.filevideo = urlpath
            self.uploadbtn = true
            if(device.platform == 'iOS'){
                self.$refs.sp_video.src = path?path:val.fullPath
            }else{
                self.$refs.sp_video.src = urlpath
            }
        }else{

          console.log(urlpath);
          window.resolveLocalFileSystemURL(
            urlpath,
            function(entry){
              console.log(entry);
              let fileurl = entry.toURL()
              let videoFileName = val.name.split('.')[0];
              let videoName = val.name
              let ratio = (val.size/1048576)/10;
              let expressed = ratio*1048576;
              console.log(fileurl);
              VideoEditor.transcodeVideo(
                videoTranscodeSuccess,
                videoTranscodeError,
                {
                  fileUri: fileurl,
                  outputFileName: videoFileName,
                  outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
                  optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
                  saveToLibrary: true,
                  maintainAspectRatio: true,
                  // width: 640,
                  // height: 640,
                  videoBitrate: expressed, // 1 megabit
                  fps: 30,
                  audioChannels: 2,
                  audioSampleRate: 44100,
                  audioBitrate: 128000, // 128 kilobits
                  progress: function(info) {
                    console.log('transcodeVideo progress callback, info: ' + info);
                  }
                }
              );
            }
          );
            /*let file = val;
            let videoFileName = val.name.split('.')[0];
            let videoName = val.name
            let ratio = (file.size/1048576)/10;
            let expressed = ratio*1048576;
            urlpath = file.localURL;
            console.log(file.localURL);
            console.log(file.size);
            console.log(ratio);
            console.log(expressed);
            VideoEditor.transcodeVideo(
                    videoTranscodeSuccess,
                    videoTranscodeError,
                    {
                        fileUri: urlpath,
                        outputFileName: videoFileName,
                        outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
                        optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
                        saveToLibrary: true,
                        maintainAspectRatio: true,
                        // width: 640,
                        // height: 640,
                        videoBitrate: expressed, // 1 megabit
                        fps: 30,
                        audioChannels: 2,
                        audioSampleRate: 44100,
                        audioBitrate: 128000, // 128 kilobits
                        progress: function(info) {
                            console.log('transcodeVideo progress callback, info: ' + info);
                        }
                    }
                );*/
        }

            function videoTranscodeSuccess(result) {
                    self.filevideo = result
                    self.$refs.sp_video.src = result
                    self.uploadbtn = true
                    let url = 'file://'+result
                    self.zhuan(url)
            }
            function videoTranscodeError(err) {
                Toast('上传视频出错')
                    self.uploadbtn = true
                console.log('videoTranscodeError, err: ' + err);
            }
    },
    zp_edit(val,path){
        console.log(val)
        console.log(555)
        let self = this
        let urlpath = path?path:val.localURL
        if(val.size<5048576){
        console.log(999)
            self.zhuan(urlpath)
            self.fileimg = urlpath
            self.uploadbtn = true
        }else{
            console.log(1)
            Toast('图片过大')
        }
    },
    zhuan(url){
        let self = this
        window.resolveLocalFileSystemURL(url, (fileEntry) => {
            fileEntry.file(function (file) {
                if(file.type.indexOf('image')!=-1&&file.size>5048576){
                    Toast('图片过大')
                }
                if(file.type.indexOf('video')!=-1&&file.size>30485760){
                    Toast('视频过大')
                }
            var reader = new FileReader()
            reader.readAsArrayBuffer(file);
            reader.onload = function() {
            let imgBlob = new Blob([this.result], {
                type: file.type
            })
            if(file.type.indexOf('image')!=-1){
                if(file.type.indexOf('png')!=-1){
                    self.param.append('fileimg', imgBlob, file.name+'.png')
                }else{
                    self.param.append('fileimg', imgBlob, file.name)
                }
                    }else{
                    self.param.append('filevideo', imgBlob, file.name)
                    }
                    }
                    })
                })
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
    },
    delipt(index){
        console.log(index)
        this.ipt_arr.splice(index,1)
        this.tags_id.splice(index,1)
    },
    tags_check(val){
        this.ipt_arr.push(val.name)
        this.tags_id.push(val.tid)
        this.tagsstate = false
    },
    delclass(){
        this.classesstate = true
    },
    classes_check(val){
        this.class_name = val.name
        this.classes_id = val.cid
        this.classesstate = false
    }
  }
}
</script>

<style scoped lang="scss">
.Upload {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.center {
    position: relative;
}
.mescroll {
	position: absolute;
	top: 0px;
    left: 0px;
	height: 100vh; /*如设置bottom:50px,则需height:auto才能生效*/
    padding: 60px 30px;
    padding-bottom: 80px;
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
    font-size: 26px;
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
    flex-wrap: wrap;
}
.center .video_price .ipt input {
    flex:1;
    height: 100%;
    background-color: #241618 !important;
    color: #fff;
    padding: 0px 30px;
}
.center .video_price .ipt span {
    width: 100%;
    font-size: 26px;
    color: #999999;
    margin-top: 20px;
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
.center .video_label .ipt .input{
    width: 120px;
    height: 72px;
    background-color: #241618 !important;
    color: #fff;
    padding: 0px 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    font-size: 32px;
    line-height: 72px;
    text-align: center;
}
.center .video_label .ipt .oneinput {
    width: 240px;
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
    background-color: #999999;
    margin-right: 10px;
    background: url('../assets/images/微信图片_20191206173627.png') no-repeat;
    background-size: 750px 4532px;
    background-position: -16px -4425px;
}
.center .Agreement .Agreement_check {
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
    transform: translateY(100%);
}
.bottom_check {
    transform: translateY(0%)
}
.bottom_check .ps {
    width: 100%;
    height: 136px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32px;
    text-align: center;
    margin: 0 auto;
}
.bottom_check .ps .text {
    font-size: 26px;
    color: #999;
    margin-top: 10px;
}
.bottom_check .xz {
    width: 100%;
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
.white {
    width: 90%;
    height: 60%;
    overflow-y: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    background-color: #fff;
    padding: 20px;
}
.white div {
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #999;
    color: #999;
    margin-right: 20px;
    margin-bottom: 20px;
    font-size: 26px;
    line-height: 36px;
    display: inline-block;
}
</style>
