<template>
    <section class="upload" @touchStart="stop">
        <CardHead></CardHead>
        <div class="upload-space"></div>
        <section class="upload-center" >
            <div v-if="!imgShow" class="upload-center-btn"  @click="show"></div>
            <div v-if="imgShow" class="upload-center-img" @click="show">
                <img id="ImgData" v-bind:src="dataSrc" />
                <Slider :progress="progress"></Slider>
            </div>
            <div class="upload-center-line">
                <span class="upload-center-line-space"></span>
                <span class="upload-center-line-txt">点击添加你的图片</span>
                <span class="upload-center-line-space"></span>
            </div>
            <div v-if="androidTips"  class="upload-center-tips-android">
                <span>亲，只能上传一张照片哦！若上传两张照片，则以第一张照片为主哦!</span>
            </div>
        </section> 
        <Btn class="upload-confirm" :title="confirmTitle" :backBtn="backBtn" :callback="showfoot"></Btn>
        <Btn class="upload-reset" :title="btnTitle" :backBtn="backBtn" :callback="uploadImng"></Btn>
        <section v-bind:class="footClass">
            <div class="foot-toast-bottom">
                <div class="foot-toast-iphone">从手机上选择</div>
                <div class="foot-toast-cancle" @click="cancle">取消</div>
                <div id="qiniu_container" class="foot-toast-input">
                    <input id="pickfiles" class="upfile" accept="image/png, image/jpeg, image/gif, image/jpg" type="file" @change="uploadfile"/>
                </div>
            </div>
        </section>
        <section class = "loading" v-if="showLoading">
            <div class = "loading-tips">
                <div class = "loading-img"></div>
                <span>图片正在载入中</span>
                <span>请稍后...</span>
            </div> 
        </section> 
    </section>
</template>

<script>

    'use strict';
    import ajax from '../../../common/ajax.js';
    import common from '../../../common/common.js';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
    import CardHead from './CardHead.vue';
    import Btn from './Btn.vue';
    import Slider from './Slider.vue';

        // 能力检测是否客户端打开
    let appOpen = false;
    setTimeout(() => {
        try{
            window.object.isNetwork();
            appOpen = true;
        }catch(e){
            appOpen = false
        }
    },1000);


    const component = { 
        components:{
            'CardHead':CardHead,
            'Btn':Btn,
            'Slider':Slider,
        },
        created (){
            window._hmt && window._hmt.push(['_trackEvent', 'home', 'click', '闺蜜图片上传页面打开统计次数']);
            let shareData = {
                type:1,
                title: '真闺蜜OR塑料姐妹花鉴定所',
                detail: '你和闺蜜的友谊，到底有多深？赶紧来测测吧！',
                url: location.href.replace('upload', 'home') + '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);     
        },
        data (){
            return {
                footToast:false,
                dataSrc:"",
                imgShow:false,
                btnTitle:"上传照片",
                backBtn:"true",
                footClass:"foot-toast-hidden",
                progress:0,
                confirmTitle:"重新选择",
                androidTips:false,
                showLoading:false
            }
        },
        mounted (){
            let _this = this;
            let uploaderDefaults = {};

            function fileUploadSuccess(data){
                var data = JSON.parse(data);
                //console.log(data)
                _this.footClass = "foot-toast-hidden";
                _this.dataSrc = data.img[0].url;
                _this.imgShow = true;
                _this.backBtn = false;

            }
            window.fileUploadSuccess = fileUploadSuccess;

            function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
                if(!file || !/image\//.test(file.type)) return; //确保文件是图片
                if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
                    var fr = new mOxie.FileReader();
                    fr.onload = function(){
                        callback(fr.result);
                        fr.destroy();
                        fr = null;
                    }
                    fr.readAsDataURL(file.getSource());
                }else{
                    var preloader = new mOxie.Image();
                    preloader.onload = function() {
                        //console.log(preloader)
                        preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
                        var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                        callback && callback(imgsrc); //callback传入的参数为预览图片的url
                        preloader.destroy();
                        preloader = null;
                    };
                    preloader.load( file.getSource() );
                }   
            }
            function uploadImg(){
                window.uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4', // 上传模式，依次退化
                    browse_button: 'pickfiles', // 上传选择的点选按钮，必需
                    container: 'qiniu_container',
                    max_file_size: '1000mb',
                    flash_swf_url: './Moxie.swf',
                    dragdrop: true,
                    chunk_size: '4mb',
                    multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
                    uptoken_func: function(file) {
                        var name = file.name;
                        var extname = name.substring(name.lastIndexOf('.') + 1);

                        var token = '';
                        $.ajax({
                            type: "post",
                            url: ajax.drawUrl("/router?method=jz.common.upload.token.public"),
                            beforeSend: ajax.beforeAjax,
                            dataType: "json",
                            async:false,
                            data:{ type: 4, extname: extname},
                            success: function(data){
                                uploaderDefaults.key = data.list[0].key;
                                uploaderDefaults.url = data.url;
                                token = data.list[0].token;
                            }
                        });
                        return token;
                    },
                    domain:'http://images.9zhitx.com/',
                    get_new_uptoken: true,
                    auto_start: true,
                    log_level: 5,
                    init: {
                        'FilesAdded': function(up, files) {  // 文件添加进队列后，处理相关的事情
                            _this.footClass = "foot-toast-hidden";
                            _this.backBtn = false; 
                            _this.showLoading = true;
                            //_this.showLoading = true;  
                            previewImage(files[0],function(imgsrc){
                                //console.log(88)
                                //_this.uploadfile(imgsrc);
                            })
                        },
                        'BeforeUpload': function(up, file) { // 每个文件上传前，处理相关的事情
                            
                        },
                        'UploadProgress': function(up, file) { // 每个文件上传时，处理相关的事情
                            _this.progress = file.percent;
                            //console.log(file.percent)
                        },
                        'UploadComplete': function() { //队列文件处理完毕后，处理相关的事情
                            
                        },
                        'FileUploaded': function(up, file, info) { // 每个文件上传成功后，处理相关的事情 ,其中info是文件上传成功后，服务端返回的json
                            //console.log(info);
                            let imgurl = uploaderDefaults.url+JSON.parse(info).key;
                            //console.log(uploaderDefaults.url+JSON.parse(info).key);
                            //_this.$router.push("uploadsuc?imgurl="+imgurl)
                            _this.uploadfile(imgurl);
                            _this.showLoading = false;
                        },
                        'Error': function(up, err, errTip) { //上传出错时，处理相关的事情
                            //_this.showLoading = false;   
                        },
                        'Key': function(up, file) {
                            return uploaderDefaults.key;
                        }
                    }
                }); 
            }
            if (client.clientPlatform() == 'yayaApp' && common.detectPlatform() == 'android') { // Android 存在上传图片交互的情况
                _this.androidTips = true;
                $('#pickfiles').on('click', function(){
                    client.clientFileUpload({count: 2, limit: true, id: 'pickfiles'});
                });
            } else {
                uploadImg();
            };
            
                        
        },
        
        methods: {
            goToResult (){
                
            },
            stop (e){
                e.preventDefault()
                e.stopPropagation()
            },
            cancle (e){
                this.footClass = "foot-toast-hidden";
                $(".upload").css({
                    overflow:"scroll"
                })
            },
            show (e){
                this.footClass = "foot-toast";
                $(".upload").css({
                    overflow:"hidden"
                })
            },
            showfoot (e){
                if(this.imgShow){
                    $(".upload").css({
                        overflow:"hidden"
                    })
                    this.footClass = "foot-toast";
                }   
            },
            uploadfile (src){
                this.dataSrc = src+"?imageView2/1/w/200/h/200/q/50";
                this.imgShow = true;
                this.footClass = "foot-toast-hidden";
                this.backBtn = false;          
            },
            upfile (){
                let _this = this;
                if(!(_this.backBtn)){
                    let data = {};
                    data.src = _this.dataSrc; 
                    client.clientFileUpload(data)
                }
            },
            uploadImng (){
                let _this = this;
                window._hmt && window._hmt.push(['_trackEvent', 'home', 'click', '闺蜜图片上传页面上传按钮打开统计次数']) 
                
                if (!_this.backBtn && client.clientPlatform() == 'yayaApp' && common.detectPlatform() == 'android') { // Android 存在上传图片交互的情况
                    _this.$router.push("uploadsuc?imgurl=" + _this.dataSrc)
                } else {
                    if(_this.backBtn){
                    }else{
                        _this.$router.push("uploadsuc?imgurl=" + _this.dataSrc)
                    }
                    //window.uploader.start();
                };
            }

        }
    };

     export default component;

</script>

<style>
    body{
        width: 100%;
        height: 100%;
        position:relative;
        overflow:hidden
    }   
    .upload {
        position:absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background: #fe7998;
        overflow: scroll;
    }
    .upload-space {
        width: 100%;
        height: 16.5rem;
    }
    .upload-center {
        width: 100%;
        position: absolute;
        left: 0;
        top:13.5rem;
    }
    .upload-center-btn {
        width: 10.71rem;
        height: 10.71rem;
        border: 1px solid #fff;
        margin: 0 auto;
        background: url('../assets/add.png') no-repeat center center;
        background-size: 2.857rem 2.857rem;
    }
    .upload-center-img {
        width: 10.71rem;
        height: 10.71rem;
        margin: 0 auto;
        position: relative;
    }
    .upload-center-img img {
        width: 10.71rem;
        height: 10.71rem;
    }
    .upload-center-line {
        width: 100%;
        height: 2rem;
        margin-top: 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
    }
    .upload-center-line-space {
        flex:1;
        height: 1px;
        background: #fff;
        margin: 1.1rem;
    }
    .upload-center-tips-android {
        color: #fff;
        font-size:12px;
        margin:0.5rem 1.1rem;
        text-align:center;
    }
    .upload-center-line-txt {
        color:#fff;
        font-size: 12px;
    }
    .foot-toast {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index:1;
    }
    .foot-toast-hidden {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index:-10;
    }
    .foot-toast-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #ccb1b7;
        z-index: 10;
    }
    .foot-toast-iphone{
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
        margin-bottom: 0.45rem;
    }
    .foot-toast-camera {
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
        border-bottom: 1px solid #ccc;
    }
    .foot-toast-cancle {
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
    }
    .foot-toast-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 3.57rem;
    }
    .foot-toast-input input {
        width: 100%;
        height: 3.57rem;
        opacity: 0;
    }
    .reset {
        position: absolute;
        left: 0;
        bottom: 2.85rem;
    }
    .btn-component {
        width:100%;
        height: 3.78rem;
    }
    .btn-component-back {
        width:100%;
        height: 3.78rem;
        opacity: 0.5;
    }
    .btn {
        margin:0 auto;
        width:15.7rem;
        height: 3.78rem;
        max-width: 220px;
        background: url('../assets/btn.png') no-repeat left top;
        background-size: 100% 100%;
        text-align: center;
        line-height: 3.3rem;
        font-size: 20px;
        color:#fff;
    }
    .upload-reset {
        margin:2rem 0;
    }
    .upload-confirm {
        margin:5rem 0 0;
    }
    .loading {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%; 
    }
    .loading-tips {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 15rem;
        height: 15rem;
        margin-left: -7.5rem;
        margin-top: -7.5rem;
        border-radius: 10px;
        background: #fff;
    }
    .loading-tips span {
        display: block;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        font-size: 14px;
        color: red;
        text-align: center;
    }
    .loading-img {
        display: block;
        width: 8.42rem;
        height: 8.42rem;
        margin: 1rem auto 0;
        background: url('../assets/looading.gif') no-repeat center center;
        background-size: 50% 50%;
    }


</style>