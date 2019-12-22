<template>
    <div class="edit">
    <div class="top">
        <div class="left" @click="back"></div>
        <div class="title">编辑个人信息</div>
        <div class="right" @click="edit">修改</div>
    </div>
    <div class="center">
        <div class="userimg" @click="bottom_check = !bottom_check">
            <img :src="fileimg" alt="">
            <div class="img_edit">
                点击更换头像
            </div>
        </div>
        <div class="userinfo">
            <div class="info_li" @click="iptbox(0)">
                <span>名字</span>
                <div>{{nickname}}</div>
                <em>></em>
            </div>
            <div class="info_li" @click="iptbox(1)">
                <span>账户</span>
                <div>{{username}}</div>
                <em>></em>
            </div>
            <div class="info_li" @click="iptbox(2)">
                <span>简介</span>
                <div>{{introduce}}</div>
                <em>></em>
            </div>
            <div class="info_li" @click="sexstatus = !sexstatus">
                <span>性别</span>
                <div>{{sex == 1?'男':'女'}}</div>
                <em>></em>
            </div>
            <div class="info_li" @click="$refs.picker.open()">
                <span>生日</span>
                <div>{{birthday}}</div>
                <em>></em>
            </div>
            <div class="info_li" @click="picker_dq = !picker_dq">
                <span>地区</span>
                <div>{{regionname}}</div>
                <em>></em>
            </div>
        </div>
    </div>
    <div class="bj" v-if="sexstatus" @click="sexstatus = !sexstatus">
        <div class="bottom_box" :class="{bottom_check:sexstatus}">
            <div class="xz" @click.stop="sexstatus = !sexstatus;sex = 1">
                <div>男</div>
            </div>
            <div class="xz" @click.stop="sexstatus = !sexstatus;sex = 2">
                <div>女</div>
            </div>
            <div class="xian"></div>
            <div class="qx" @click.stop="sexstatus = !sexstatus">取消</div>
        </div>
    </div>
    <div class="bj" v-if="picker_dq" @click="picker_dq = !picker_dq">
        <div class="bottom_box" :class="{bottom_check:picker_dq}">
            <div class="btn">
                <div class="left">
                    取消
                </div>
                <div class="right">
                    确认
                </div>
            </div>
            <mt-picker :slots="slots" value-key="name" @change="onValuesChange"></mt-picker>
        </div>
    </div>
        <mt-datetime-picker
                    type="date"
                    ref="picker"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="handleConfirm"
                    :startDate="startDate"
                >
        </mt-datetime-picker>
    <div class="bj" v-if="bottom_check">
        <div class="bottom_box" :class="{bottom_check:bottom_check}">
            <div class="ps" @click="ps">
                <div>拍摄</div>
                <div class="text">拍摄照片</div>
            </div>
            <div class="xz" @click="xz">
                <div>从手机相册选择</div>
            </div>
            <div class="xian"></div>
            <div class="qx" @click="bottom_check = !bottom_check">取消</div>
        </div>
    </div>
    <div class="bj" v-if="message">
        <div class="message_box">
            <div class="title">{{message_text}}</div>
            <input type="text" v-model="nickname" maxlength="10" v-if="message_index == 0">
            <input type="number" v-model="username" maxlength="10" v-if="message_index == 1">
            <textarea v-model="introduce" maxlength="100" v-if="message_index == 2"></textarea>
            <div class="btn">
                <div class="left" @click.stop="message=!message">取消</div>
                <div class="right" @click.stop="del">确定</div>
            </div>
        </div>
    </div>
    <load v-if="!editbtn"></load>
    </div>
</template>

<script>
import {getaddress,editmemberinfo,getmemberinfo} from '@/api/api'
import { Picker,Toast } from 'mint-ui';
import load from '@/components/loading'
export default {
  name: 'edit',
  components: {
      load
  },
  data() {
    return {
        birthday:"",  //出生日期
        startDate: new Date('1968-01-01'),
        bottom_check:false,
        param:'',
        picker_dq:false,
        sexstatus:false,
        editbtn:true,
        message:false,
        message_text:'',
        message_index:0,
        dq_id:0,
        dq_data:0,
        introduce:'',
        sex:1,
        username:'',
        nickname:'',
        regionname:'',
        fileimg:'',
        slots: [
        {
          flex: 1,
          values: ['请选择'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['请选择'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  mounted () {
      this.initialize()
      this.param = new FormData()
      this.getdata()
  },
  methods: {
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
    getdata(){
        getaddress(0).then(res=>{
            console.log(res)
            if(res.data.resultCode == 0){
                this.slots[0].values = res.data.data
            }
        })
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.username = user.username
        this.nickname = user.nickname
        this.sex = user.sex
        this.introduce = user.introduce
        this.birthday = user.birthday
        this.regionname = user.regionname
        this.fileimg = user.headimgurl
    },
    edit(){
        this.param.append('username',this.username)
        this.param.append('nickname',this.nickname)
        this.param.append('sex',this.sex)
        this.param.append('introduce',this.introduce)
        this.param.append('birthday',this.birthday)
        this.param.append('region',this.dq_data)
        this.editbtn = false
        editmemberinfo(this.param).then(res=>{
            console.log(res)
            this.editbtn = true
            Toast(res.data.message)
            if(res.data.resultCode == 0){
                getmemberinfo(165).then(res =>{
                    if(res.data.resultCode == 0){
                        Toast(res.data.message)
                        sessionStorage.setItem('user',JSON.stringify(res.data.data))
                        this.back()
                    }
                })
            }
        }).catch(err=>{
            this.editbtn = true
        })
    },
     onValuesChange(picker, values) {
         this.regionname = values[1]?values[1].name:JSON.parse(sessionStorage.getItem('user')).regionname
         this.dq_data = values[1]?values[1].id:''
        if(this.dq_id != values[0].id){
            this.dq_id = values[0].id
             getaddress(values[0].id).then(res=>{
                if(res.data.resultCode == 0){
                    this.slots[2].values = res.data.data
                }
            })
        }
    },
    iptbox(index){
        this.message = true
        this.message_index = index
        if(index == 0){
            this.message_text = '请输入用户名字'
        }else if(index == 1){
            this.message_text = '请输入用户账户'
        }else if(index == 2){
            this.message_text = '请输入简介'
        }
    },
    back(){
      window.history.go(-1)
    },
    handleConfirm (data) {
        this.birthday = this.gettime(data)
    },
    gettime(data){
        let d = new Date(data);  
        let youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        return youWant;
    },
    ps(){
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
        window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        fileEntry.file(function (file) {
            console.log(file)
            console.log(file.size)
            if(file.size<1048576){
                self.zhuan(file.localURL)
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
    xz(){
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
        self.fileimg = imageData
        self.bottom_check = false
        window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        fileEntry.file(function (file) {
            console.log(file)
            console.log(file.size)
            if(file.size<1048576){
                self.zhuan(file.localURL)
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
    zhuan(url){
        let self = this
        window.resolveLocalFileSystemURL(url, (fileEntry) => {
            fileEntry.file(function (file) {
                console.log(file)
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
    line-height: 36px;
    .userimg {
        padding-bottom: 83px;
        border-bottom: 1px solid #211a1a;
        img {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            margin: 0px auto;
            margin-bottom: 20px;
            display: block;
            background-color: #fff;
        }
        .img_edit {
            font-size: 28px;
            text-align: center;
            color: #999;
        }
    }
    .userinfo {
        padding-bottom: 43px;
        border-bottom: 1px solid #211a1a;
        .info_li {
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            color: #999;
            padding: 20px;
            div {
                flex: 1;
                text-align: right;
                padding: 0px 20px;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
            }
            em {
                font-style: normal;
            }
        }
    }
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
.bj .btn {
    font-size: 32px;
    display: flex;
    line-height: 56px;
    border-bottom: 1px solid #0094ff;
}
.bj .btn div {
    flex: 1;
    text-align: center;
    color: #0094ff;
}
.bj .btn div:first-child {
    border-right: 1px solid #0094ff;
}

.message_box {
    width: 80%;
    background-color: rgba(197, 180, 180, 0.99);
    border-radius: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.message_box .title {
    font-size: 32px;
    line-height: 46px;
    padding-top: 10px;
    font-weight: 700;
    margin-bottom: 10px;
}
.message_box .text {
    font-size: 26px;
    line-height: 36px;
    margin-bottom: 20px;
}
.message_box .btn {
    font-size: 28px;
    line-height: 56px;
    display: flex;
}
.message_box .btn div {
    flex: 1;
    border-top: 1px solid #666;
}
.message_box .btn div:first-child {
    border-right: 1px solid #666;
}
.message_box input{
    background-color: rgba(255, 255, 255, 0.6) !important;
    font-size: 28px;
    line-height: 46px;
    width: 80%;
    text-align: center;
    margin: 20px auto;
}
.message_box textarea {
    background-color: rgba(255, 255, 255, 0.6) !important;
    font-size: 26px;
    line-height: 36px;
    width: 80%;
    margin: 20px auto;
}
</style>