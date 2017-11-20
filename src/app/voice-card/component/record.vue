<template>
    <div>
        <section class="record">
            <div class="title">= 一个不负责任的文案 =</div>
            <div class="descr">{{sceneTxt}}</div>
            <div class="bolang"><img :src="voice_bg" alt="" /></div>
            <div class="timer-bd">
                <div class="timer timer0" 
                    v-show="timerShow0"
                    :class="{
                        'progress0': !!progress0[0],
                        'progress1': !!progress0[1],
                        'progress2': !!progress0[2],
                        'progress3': !!progress0[3],
                        'progress4': !!progress0[4],
                        'progress5': !!progress0[5],
                        'progress6': !!progress0[6],
                        'progress7': !!progress0[7],
                        'progress8': !!progress0[8],
                        'progress9': !!progress0[9],
                        'progress10': !!progress0[10],
                    }">
                    00:00:{{showSecond0}}
                </div>
                <div class="timer timer1"
                    v-show="timerShow1" 
                    :class="{
                        'progress0': !!progress1[0],
                        'progress1': !!progress1[1],
                        'progress2': !!progress1[2],
                        'progress3': !!progress1[3],
                        'progress4': !!progress1[4],
                        'progress5': !!progress1[5],
                        'progress6': !!progress1[6],
                        'progress7': !!progress1[7],
                        'progress8': !!progress1[8],
                        'progress9': !!progress1[9],
                        'progress10': !!progress1[10],
                    }">
                    00:00:{{showSecond1}}
                </div>
            </div>
            <div class="tip">— 请录一段不少于3秒的录音 —</div>
            <div class="btn" @click="recordBegin" v-show="record_begin_btnShow">点击开始录音</div>
            <div class="btn" @click="recordFinish" v-show="record_finish_btnShow">结束录音</div>
            <div class="btn" @click="creatResult" v-show="creat_result_btnShow">生成声鉴卡</div>
            <div class="creat-bg" v-show="creatBgShow">
                <div class="creat">
                    <img src="../assets/creat-loading.gif" alt="" />
                    <p>正在分析中，稍等几秒嘛！</p>
                </div>
            </div>
        </section>
        <section class="result" :class="{'woman': !currentUser.userSex, 'man': !!currentUser.userSex}">
                <div class="bd" id="shortCut" >
                    <div class="head" :class="{
                        'head0': resultObj.headImg == 0,
                        'head1': resultObj.headImg == 1,
                        'head2': resultObj.headImg == 2,
                        'head3': resultObj.headImg == 3,
                        'head4': resultObj.headImg == 4,
                        'head5': resultObj.headImg == 5,
                        }">
                    </div>
                    <div class="name">= {{currentUser.userName}} =</div>
                    <div class="detail">
                        <ul>
                            <li><span class="title">主音色：</span><span class="txt">{{resultObj.mainVoice}}({{resultObj.probability}}%)</span></li>
                            <li><span class="title">你适合：</span><span class="txt">{{resultObj.roleName}}</span></li>
                            <li class="content" v-html="resultObj.content"></li>
                            <li><span class="title">声音CP：</span><span class="txt">{{resultObj.voiceCp}}</span></li>
                            <li class="clearfix">
                                <p class="fl"><span class="title">撩人值：</span><span class="txt">{{resultObj.lureValue}}</span></p>
                                <p class="fr"><span class="title">市场值：</span><span class="txt">{{resultObj.marketValue}}</span></p>
                            </li>
                        </ul>
                    </div>
                    <div class="line"></div>
                    <div class="logo">
                        <div class="fl">
                            <img src="../assets/yaya-logo.png" alt="" />
                            <p>到牙牙关注社区</p>
                            <p>使用新功能录音K歌、交友</p>
                        </div>
                        <div class="fr">
                            <img src="../assets/ewm.jpg" alt="" />
                        </div>
                    </div>
                </div>
        </section>
    </div>
</template>

<script>

    'use strict';
    import route from '../route/route';
    import common from '../../../common/common';
    import client from '../../../common/client.interactive';
    import data from '../data';
    import ajax from '../../../common/ajax';
    import '../../../common/html2canvas';

    $('html').on('scroll', function(e){
        e.preventDefault();
    });
    const component = { 
        created (){
            // 判断是否从首页进入
            if(!sessionStorage.guide){
                route.replace('guide');
                return
            }
            // 随机选取文案
            let index = Math.floor(Math.random()*8);
            this.sceneTxt = data.scene[index].txt;

            //本地储存当前文案编号
            localStorage.currentScene = data.scene[index].num;
            
        },
        data (){
            return {
                sceneTxt: '',
                voice_bg:'http://images.9zhitx.com/467bfe09-dde9-41c3-9bea-8977f5de7773.png',
                timerShow0: true,
                timerShow1: false,
                timerSecond: 0,
                showSecond0: '00',
                showSecond1: '00',
                record_begin_btnShow: true,
                record_finish_btnShow: false,
                creat_result_btnShow: false,
                progress0:[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                progress1:[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                creatBgShow: false,
                currentUser: {},
                resultObj: {}
            }
        },
        methods: {
            recordBegin (){
                //切换声音波浪
                this.voice_bg = 'http://images.9zhitx.com/e67bf4b2-841b-4782-a95a-8b7b594558c5.gif';
                // 计时十秒钟
                this.count();
                //切换按钮
                this.record_begin_btnShow = false;
                this.record_finish_btnShow = true;
            },
            count (){
                let timer = setTimeout(() => {
                    this.timerSecond ++;
                    // timer0显示
                    if(this.timerSecond < 10){
                        this.showSecond0 = `0${this.timerSecond}`;
                    }else{
                        this.showSecond0 = this.timerSecond;
                    }
                    for(let x in this.progress0){
                        this.progress0[x] = 0;
                    }
                    this.progress0[this.timerSecond] = 1;

                    //递归循环
                    if(this.timerSecond < 10){
                        this.count();
                    }
                    //10s自动结束录音
                    if(this.timerSecond == 10){
                        this.recordFinish();
                    }
                    

                }, 1000); 


            },
            recordFinish (){
                // 获取当前秒数
                let timerSecond = this.timerSecond;
                if(timerSecond < 3){
                    common.promptMsg('录音太短了', 'center');
                    return
                }
                //切换声音波浪
                this.voice_bg = 'http://images.9zhitx.com/467bfe09-dde9-41c3-9bea-8977f5de7773.png';
                
                //设为终止值，结束循环
                this.timerSecond = 11;

                // 切换到timer1显示
                this.timerShow0 = false;
                this.timerShow1 = true;

                if(timerSecond < 10){
                    this.showSecond1 = `0${timerSecond}`;
                }else{
                    this.showSecond1 = timerSecond;
                }
                for(let x in this.progress1){
                    this.progress1[x] = 0;
                }
                this.progress1[timerSecond] = 1;

                //切换按钮
                this.record_finish_btnShow = false;
                this.creat_result_btnShow = true;

            },
            creatResult (e){
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_goToResult', 'click', '点击开始鉴定的次数']);
                
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    return
                }

                //生成鉴定
                this.creatBgShow = true;

                // 获取当前用户和文案
                let currentUser = JSON.parse(localStorage.currentUser);
                let currentScene = localStorage.currentScene;
                //获取本地用户记录数据
                let userRecord = localStorage.userRecord ? JSON.parse(localStorage.userRecord) : [];

                //当前用户是否存在
                let userIsExisted = false;
                let currentUserRecordIndex;
                for(let x in userRecord){
                    if(userRecord[x].userName == currentUser.userName && userRecord[x].userSex == currentUser.userSex ){
                        userIsExisted = true;
                        currentUserRecordIndex = x;//存在记录索引
                        console.log('user is existed');
                    }
                }


                let resultObj = {};
                // 概率选取主音乐结果
                let voiceResult = chooseMainVoice(currentUser.userSex);
                if(!userIsExisted){// 用户不存在
                    // 组装记录结果
                    resultObj = {
                            mainVoice: voiceResult.mainVoice,
                            probability: Math.floor(Math.random()*(88-50+1)+50),
                            roleName: voiceResult.relevance.roleName,
                            content: voiceResult.relevance.content,
                            voiceCp: voiceResult.relevance.voiceCp,
                            lureValue: Math.floor(Math.random()*(88-65+1)+65)/10,
                            marketValue: Math.floor(Math.random()*(87-45+1)+45)/10,
                            headImg: voiceResult.headImg
                    }
                    let item = {
                        userName: currentUser.userName,
                        userSex: currentUser.userSex,
                        result: {}
                    }
                    item.result[currentScene] = resultObj;
                    // 存储用户记录
                    userRecord.push(item);

                }else{
                    // 获取当前用户记录
                    let currentUserRecord = userRecord[currentUserRecordIndex];
                    //当前文案记录是否存在
                    let currentUserResult = currentUserRecord.result;
                    if(Object.keys(currentUserResult).indexOf(currentScene) != -1){
                        //展示存在的文案记录结果
                        resultObj = currentUserResult[currentScene];
                    }else{
                        // 组装记录结果
                        resultObj = {
                            mainVoice: voiceResult.mainVoice,
                            probability: Math.floor(Math.random()*(88-50+1)+50),
                            roleName: voiceResult.relevance.roleName,
                            content: voiceResult.relevance.content,
                            voiceCp: voiceResult.relevance.voiceCp,
                            lureValue: Math.floor(Math.random()*(88-65+1)+65)/10,
                            marketValue: Math.floor(Math.random()*(87-45+1)+45)/10,
                            headImg: voiceResult.headImg
                        }
                        // 添加用户文案记录
                        currentUserResult[currentScene] = resultObj;
                    }

                }

                // 更新本地用户数据
                localStorage.userRecord = JSON.stringify(userRecord);
                console.log(userRecord)
                // 初始化数据
                this.currentUser = currentUser;
                this.resultObj = resultObj;

                // 概率选取主音乐结果
                function chooseMainVoice (userSex){
                    let randomNum = Math.floor(Math.random()*100);
                    if(userSex == 0){
                        if(randomNum < 5){
                            return data.voiceWoman[0] //可爱萝莉音 5%
                        }
                        else if(randomNum < 10){
                            return data.voiceWoman[1] //呆萌少萝音 10%
                        }
                        else if(randomNum < 25){
                            return data.voiceWoman[2] //绵软少女音 25%
                        }
                        else if(randomNum < 45){
                            return data.voiceWoman[3] //温暖少御音 45%
                        }
                        else if(randomNum < 10){
                            return data.voiceWoman[4] //温柔御姐音 10%
                        }
                        else if(randomNum < 5){
                            return data.voiceWoman[5] //成熟御妈音 5%
                        }else{
                            return data.voiceWoman[Math.floor(Math.random()*6)]
                        }
                    }else{
                        if(randomNum < 5){
                            return data.voiceMan[0] //呆萌正太音 5%
                        }
                        else if(randomNum < 10){
                            return data.voiceMan[1] //诱惑青受音 10%
                        }
                        else if(randomNum < 5){
                            return data.voiceMan[2] //温润公子音 5%
                        }
                        else if(randomNum < 10){
                            return data.voiceMan[3] //暖男青年音 10%
                        }
                        else if(randomNum < 55){
                            return data.voiceMan[4] //宠溺青叔音 55%
                        }
                        else if(randomNum < 15){
                            return data.voiceMan[5] //磁性大叔音 15%
                        }else{
                            return data.voiceMan[Math.floor(Math.random()*6)]
                        }
                    }

                }
                // 展示结果
                this.resultShow = true;
                // 获取结果参数
                let currentMainVoice = this.resultObj.mainVoice;
                let currentRoleName = this.resultObj.roleName;
                //截屏
                //获取像素密度
                function getPixelRatio (context){
                    var backingStore = context.backingStorePixelRatio ||
                            context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;
                    return (window.devicePixelRatio || 1) / backingStore;
                }
                var shareContent = document.getElementById('shortCut');// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
                var width = shareContent.clientWidth;  // 获取(原生）dom 宽度
                var height = shareContent.clientHeight; // 获取(原生）dom 高
                var offsetTop = shareContent.offsetTop;  //元素距离顶部的偏移量
                console.log(offsetTop)
                console.log(width, height)
                var canvas = document.createElement('canvas');  //创建canvas 对象
                var context = canvas.getContext('2d');
                var scaleBy = getPixelRatio(context);//获取像素密度的方法 (也可以采用自定义缩放比例)
                canvas.width = width * scaleBy;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
                canvas.height = (height + offsetTop) * scaleBy;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
                context.scale(scaleBy, scaleBy);
                html2canvas(document.querySelector("#shortCut"), {
                    allowTaint: true,//允许加载跨域的图片
                    tainttest:true, //检测每张图片都已经加载完成
                    scale:scaleBy, // 添加的scale 参数
                    canvas:canvas, //自定义 canvas
                    // width:width, //dom 原始宽度
                    // height:height, //dom 原始高度
                    onrendered: function(canvas) {
                        let baseURI = canvas.toDataURL('image/png');
                    
                        // 上传base64
                        var pData = {
                            fileType:'png',
                            content:baseURI.split(',')[1]
                        };
                        $.ajax({
                            type: "post",
                            url: ajax.drawUrl("/router?method=jz.common.upload.base64"),
                            beforeSend: function(x,j){
                                ajax.beforeAjax(x,j, ["fileType", "content"])
                            },
                            dataType: "json",
                            data:pData,
                            success: function(data){
                                console.log(data.url)
                                setTimeout(() => {
                                    this.creatBgShow = false;
                                    route.replace({
                                        path: 'result', 
                                        query: {
                                            resultCardUrl: data.url,
                                            currentUserSex: currentUser.userSex,
                                            currentUserName: currentUser.userName,
                                            currentMainVoice: currentMainVoice,
                                            currentRoleName: currentRoleName
                                        }
                                    });

                                }, 2000);
                            }
                        });
                        

                    }
                });



            }
        }
    };

     export default component;

</script>

<style lang="less" scope>
    section{position: absolute;top:0;width:100%;}
    .record{background:url('../assets/guide-record-bg.png') no-repeat center top;background-size: 100% 100%;padding: 0 1.071429rem;padding-bottom: 3.214286rem;z-index: 99;}
    .record>div{margin-left: auto;margin-right: auto;}
    .record{
        .title{font-size: 1.142857rem;color: #99ACC8;line-height: 1.142857rem;padding-top: 2.785714rem;padding-bottom: 1.142857rem;text-align: center;}
        .descr{width:21.428571rem;height:6.142857rem;padding:0.714286rem;box-sizing: border-box;background: #FFF1F1;border-radius: 0.357143rem;font-size: 1.0rem;color: #767E8A;line-height: 1.571429rem;}
        .bolang{padding-top: 1.714286rem;box-sizing: content-box;}
        .bolang>img{width:100%;}
        .timer-bd{padding-top: 1.785714rem;padding-bottom: 4.5rem;}
        .timer-bd{
            .timer{width:10.714286rem;height:10.714286rem;font-size: 1.714286rem;color: #F66F6F;line-height: 10.714286rem;text-align: center;margin: 0 auto;font-weight:bold;background-size: 100%;}
            .timer.progress0{background-image: url('../assets/timer-bg/progress0.png')}
            .timer.progress1{background-image: url('../assets/timer-bg/progress1.png')}
            .timer.progress2{background-image: url('../assets/timer-bg/progress2.png')}
            .timer.progress3{background-image: url('../assets/timer-bg/progress3.png')}
            .timer.progress4{background-image: url('../assets/timer-bg/progress4.png')}
            .timer.progress5{background-image: url('../assets/timer-bg/progress5.png')}
            .timer.progress6{background-image: url('../assets/timer-bg/progress6.png')}
            .timer.progress7{background-image: url('../assets/timer-bg/progress7.png')}
            .timer.progress8{background-image: url('../assets/timer-bg/progress8.png')}
            .timer.progress9{background-image: url('../assets/timer-bg/progress9.png')}
            .timer.progress10{background-image: url('../assets/timer-bg/progress10.png')}
        }
        .tip{font-size: 1.0rem;color: #99ACC8;line-height: 1.142857rem;text-align: center;margin-bottom: 0.857143rem;}
        .btn{width:18.571429rem;height:3.571429rem;line-height: 3.571429rem;background: #F66F6F;box-shadow: 0 4px 10px 0 #FEA6A6;border-radius: 100px;color:#fff;font-size: 1.285714rem;position: relative;text-align: center;}
        .btn:before{content: '';position: absolute;width:2.642857rem;height:4px;background:url('../assets/btn-em.png') no-repeat;background-size: 100%;left:2.142857rem;top:3px;}
        .creat-bg{position: fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.5);}
        .creat{width:14.285714rem;height:12.857143rem;background: #fff;border-radius: 0.714286rem;position: absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);text-align: center;padding-top:30px;}
        .creat>img{display: inline-block;width:48px;}
        .creat>p{width:7.857143rem;height:3.428571rem;color: #F66F6F;font-size: 1.142857rem;line-height: 1.714286rem;margin: 1.714286rem auto;}

    }
    
    .fl{float: left;}
    .fr{float: right;}
    .auto{margin-left: auto;margin-right: auto;}
    .result{background: no-repeat center top;background-size: 100%;}
    .result.woman{
        background-color: #FFB9B9;
        .bd{background-image: url('../assets/woman-card-bg.png');background-color: #FFB9B9;}
        .btn>div{background: #F66F6F;box-shadow: 0 4px 10px 0 #FEA6A6;}
        .detail .txt{color: #F66F6F;}
    }
    .result.man{
        background-color: #B9D6FF;
        .bd{background-image: url('../assets/man-card-bg.png');background-color: #B9D6FF;}
        .btn>div{background: #6294EB;box-shadow: 0 4px 10px 0 #6294EB;}
        .detail .txt{color: #6194EB;} 
    }
     
    .result>div{margin-left: auto;margin-right: auto;}
    .result{
        .bd{background-size: 100% 100%;padding-top: 2.285714rem;padding-left: 2.0rem;padding-right: 2.0rem;padding-bottom: 4.214286rem;}
        .bd{
            .head{width:10.428571rem;height:10.428571rem;overflow: hidden;margin: 0 auto;background-size: 100%;}
            .head.head0{background-image: url('../assets/qingnian-gongzi-qingshu.png');}
            .head.head1{background-image: url('../assets/zhengtai-qingshou.png');}
            .head.head2{background-image: url('../assets/dashu.png');}
            .head.head3{background-image: url('../assets/luoli-shaolu-shaonv.png');}
            .head.head4{background-image: url('../assets/shaoyu-yujie.png');}
            .head.head5{background-image: url('../assets/yuma.png');}
            .name{font-size: 1.285714rem;color: #767E8A;line-height: 1.285714rem;margin-bottom: 1.785714rem;text-align: center;margin-top: 0.857143rem;}
            .detail>ul>li{font-size: 1.142857rem;line-height: 16px;margin-bottom: 1.071429rem;}
            .detail .title{color: #333942;}
            .detail .content{color: #F66F6F;padding: 0.714286rem;font-size: 1.0rem;color: #767E8A;line-height: 1.571429rem;background: #FFF1F1;border-radius: 0.357143rem;word-wrap: break-word;overflow: hidden;}
            .line{height:1px;background: #FFEDED;margin-top: 1.428571rem;margin-bottom: 2.071429rem;}
            .logo{overflow: hidden;}
            .logo .fl{font-size: 1.0rem;color: #767E8A;line-height: 1.428571rem;}
            .logo .fl>img{height:1.714286rem;width:auto;margin-bottom: 0.857143rem;}
            .logo .fr>img{height:5.714286rem;width:auto;}
        }

    }
</style>