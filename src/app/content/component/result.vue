<template>
    <section class="result" :style="{backgroundImage: backgroundImage, backgroundColor: backgroundColor}">
        <div class="hd">
            <p :style="{color: contentColor}">{{resultContent || ''}}</p>
        </div>
        <div class="btn">
            <div @click="download" :style="{backgroundImage: downloadAppBtnImage}" v-if="downloadBtnShow"></div>
            <div @click="share" :style="{backgroundImage: shareBtnImage}" v-if="shareBtnShow"></div>
        </div>
        <div class="bd" @click="toOtherPage">
            <img :src="bottomImage" alt="结果页底图" />
        </div>
        <div class="right-share" v-show="rightShareShow" @click="rightShareShow = false;"><img :src="shareGuideImage" alt="" /></div>
    </section>
</template>

<script>

    'use strict';

    import common from '../../../common/common.js';
    import client from '../../../common/client.interactive.js';
    import request from '../../../common/request.js';
    import route from '../route/route.js';

    let activeId = common.getUrlParam('id');

    // 能力检测是否客户端打开
    let appOpen = false;
    setTimeout(function(){
        try{
            window.object.isNetwork();
            appOpen = true;
        }catch(e){
            appOpen = false
        }
    },1000);
    

    const component = { 
        created () {
            // 判断是否从首页进入
            if(!sessionStorage.guide){
                route.replace('guide');
                return
            }

            let that = this;
            let resObj = JSON.parse(sessionStorage.resObj_scene);
            let result = resObj.result;

            // 背景图和背景色
            that.backgroundImage = 'url(' + result.backgroundImage + ')';
            that.backgroundColor = result.backgroundColor;
            //分享引导图
            that.shareGuideImage = result.shareGuideImage;
            //结果内容颜色
            that.contentColor = result.contentColor;

            //显示内容
            that.resultContent = result.resultContent || '';

            
            // 是否显示按钮
            if(!appOpen && result.downloadAppBtnImage){
                that.downloadBtnShow = true;
                that.downloadAppBtnImage = 'url(' + result.downloadAppBtnImage + ')';
            }
            if(result.shareBtnImage){
                that.shareBtnShow = true;
                that.shareBtnImage = 'url(' + result.shareBtnImage + ')';
            }

            // 底部文案图
            that.bottomImage = appOpen ? result.appBottomImage : result.nonAppBottomImage;
            that.jumpType = result.jumpType;
            that.jumpId = result.jumpId;

            // 分享数据
            that.shareData = {
                type:1,
                title: result.shareTitle,
                detail: result.shareContent,
                url: location.href.replace('result', 'guide') + '?v='+(+new Date()),
                img: result.shareImage,
            }



            
        },
        data (){
            return {
                backgroundImage: '',
                backgroundColor: '#fff',
                resultContent: '',
                contentColor: '',
                downloadBtnShow: false,
                shareBtnShow: false,
                downloadAppBtnImage: '',
                shareBtnImage: '',
                shareGuideImage: '',
                bottomImage: '',
                jumpType: '',
                jumpId: '',
                shareData: {},
                rightShareShow: false
            }
        },
        methods: {
            download (){
                //跳转下载
                window._hmt && window._hmt.push(['_trackEvent', 'tpl_download', 'click', '点击下载的次数']);

                common.yayaDwonLoadUrl();
            },
            share (){
                window._hmt && window._hmt.push(['_trackEvent', 'tpl_share', 'click', '点击分享的次数']);

                if(appOpen){
                    // app内分享
                    client.clientShareOut(this.shareData); 
                }else{
                    //显示分享引导图
                    this.rightShareShow = true;
                }
            },
            toOtherPage (){
                window._hmt && window._hmt.push(['_trackEvent', 'tpl_botoomClick', 'click', '点击底部图片的次数']);
                
                if(appOpen){
                    let toNativeData = (type) => {
                        if(type == '16'){
                            return {
                                type: type, 
                                id: this.jumpId,
                                starId: this.ringStartId,
                                starName: this.ringStartName
                            }
                        }else{
                            return {
                                type: type, 
                                id: this.jumpId 
                            }
                        }
                        
                    };

                    switch(this.jumpType){
                        case 3 : client.clientWebGotoNative(toNativeData('10'))//跳帖子;
                        break
                        case 4 : client.clientWebGotoNative(toNativeData('9'))//跳资讯;
                        break
                        case 5 : client.clientWebGotoNative(toNativeData('16'))//跳明星圈;

                        break
                        case 6 : client.clientWebGotoNative(toNativeData('15'))//跳普通圈;
                        break
                        default : '';
                    }
                    
                }else{
                    //跳转下载
                     window._hmt && window._hmt.push(['_trackEvent', 'tpl_download', 'click', '点击下载的次数']);
                    common.yayaDwonLoadUrl();
                }
            }
        }
    };


    export default component;

</script>

<style>
    .result{background: url('') no-repeat center top;background-size: 100% 100%;}
    .result .hd{padding:0 2.857143rem;padding-top:7.142857rem;overflow: hidden;text-align: left;}
    .result .hd>p{font-size: 1.285714rem;line-height: 1.928571rem;color:#666;}
    .result .btn, .result .bd{position: absolute;left:0;width:100%;}
    .result .btn{bottom:7.142857rem;}
    .result .btn>div{width:23.214286rem;height:3.285714rem;background:url('') no-repeat center center;background-size: 100%;margin-left: auto;margin-right: auto;}
    .result .btn>div:first-child{margin-bottom: 1.428571rem;}
    .result .btn>div:last-child{color:#f4c92e;}
    .result .bd{width:100%;height:5.0rem;bottom:0;text-align: center;overflow: hidden;}
    .result .bd>img{width:100%; height:auto;}
    .result .right-share{position: absolute;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,0.5);}
    .result .right-share>img{position: absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);}
    
</style>