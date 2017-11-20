<template>
    <section class="result" :style="{backgroundImage: backgroundImage, backgroundColor: backgroundColor}">
        <div class="hd">
            <p class="whoLike"><span>{{honorTitle}}</span></p>
            <p class="other">有<span>{{other}}%</span>的人跟你一样</p>
            <div class="peitu"><img :src="hononrImage"  alt="" /></div>
            <p class="txt">{{honorContent}}</p>
        </div>
        <div class="btn">
            <div @click="onceMore" :style="{backgroundImage: onceMoreBtnImage, marginRight: shareBtnShow ? '' : '6.4rem'}" v-if="onceMoreBtnShow"></div>
            <div @click="share" :style="{backgroundImage: shareBtnImage, marginRight: onceMoreBtnShow ? '' : '6.4rem'}" v-if="shareBtnShow"></div>
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
            
            let honorArray = this.$route.query.honorArray.split(',');

            //头衔匹配最多的一个
            let mostHonor = '';
            let honorObj = {};
            for(let x in honorArray){
                honorObj[honorArray[x]] ? honorObj[honorArray[x]] ++ : honorObj[honorArray[x]] = 1;
            }
            let honnorNum = [];
            for(let x in honorObj){
                honnorNum.push(honorObj[x])
            }
            let maxHonorNum = Math.max.apply(null,honnorNum);
            for(let x in honorObj){
                if(honorObj[x] == maxHonorNum){
                    mostHonor = x;
                    break
                }
            }
            console.log(mostHonor);

            let that = this;
            let resObj = JSON.parse(sessionStorage.resObj_scene);
            let result = resObj.result;
            let honor = resObj.honor;
            console.log(honor)

            // 背景图和背景色
            that.backgroundImage = 'url(' + result.backgroundImage + ')';
            that.backgroundColor = result.backgroundColor;
            //分享引导图
            that.shareGuideImage = result.shareGuideImage;

            //匹配头衔
            for(let x in honor){
                if(honor[x].id == mostHonor){
                    that.honorTitle = honor[x].title;
                    that.hononrImage = honor[x].honorImage;
                    that.honorContent = honor[x].content;
                }
            }
            
            // 是否显示按钮
            if(result.onceMoreBtnImage){
                that.onceMoreBtnShow = true;
                that.onceMoreBtnImage = 'url(' + result.onceMoreBtnImage + ')';
            }
            if(result.shareBtnImage){
                that.shareBtnShow = true;
                that.shareBtnImage = 'url(' + result.shareBtnImage + ')';
            }

            //随机概率
            that.other = Math.floor(Math.random()*(60-20+1)+20);
            // 分享数据
            that.shareData = {
                type:1,
                title: result.shareTitle,
                detail: result.shareContent,
                url: location.href.replace('result', 'guide') + '?v='+(+new Date()),
                img: result.shareImage,
            }

            // 底部文案图
            that.bottomImage = appOpen ? result.appBottomImage : result.nonAppBottomImage;
            that.jumpType = result.jumpType;
            that.jumpId = result.jumpId;

            
        },
        data (){
            return {
                backgroundImage: '',
                backgroundColor: '#fff',
                shareGuideImage: '',
                honorTitle: '',
                hononrImage: '',
                honorContent: '',
                onceMoreBtnShow: false,
                shareBtnShow: false,
                onceMoreBtnImage: '',
                shareBtnImage: '',
                shareData: {},
                rightShareShow: false,
                bottomImage: '',
                jumpType: '',
                jumpId: '',
                other: ''
            }
        },
        methods: {
            onceMore (){
                 window._hmt && window._hmt.push(['_trackEvent', 'tpl_onceMore', 'click', '点击再玩一次的次数']);
                 
                route.go(-1);
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
    .result .hd{overflow: hidden;text-align: center;color:#333;padding-top:1rem;}
    .result .whoLike{font-size: 2.142857rem;line-height: 2.714286rem;margin-bottom: 0.5rem;}
    .result .whoLike>span,.result .other>span{color:#ee3939;}
    .result .other{font-size: 1.285714rem;margin-bottom: 0.8rem;}
    .result .peitu{overflow: hidden;padding: 0 2.714286rem;margin-bottom: 0.8rem;height:11.857143rem;}
    .result .peitu>img{height:100%;}
    .result .txt{font-size: 1.142857rem;line-height: 1.928571rem;padding: 0 2.5rem;text-align: left;}
    .result .btn, .result .bd{position: absolute;left:0;width:100%;}
    .result .btn{bottom:7.142857rem;padding: 0 1.928571rem;}
    .result .btn>div{width:10.714286rem;height:3.285714rem;background:url('') no-repeat center center;background-size: 100%;margin-left: auto;margin-right: auto;}
    .result .btn>div:first-child{float: left;}
    .result .btn>div:last-child{float: right;}
    .result .bd{width:100%;height:5.0rem;bottom:0;text-align: center;overflow: hidden;}
    .result .bd>img{width:100%; height:auto;}
    .result .right-share{position: absolute;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,0.5);}
    .result .right-share>img{position: absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);}
    
</style>