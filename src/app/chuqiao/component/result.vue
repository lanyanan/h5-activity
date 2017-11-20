<template>
    <section class="result">
        <div class="resultTitle">
            <div class="deadWin auto">
                <img src="../assets/result-win.png" alt="" v-if="result.isWin"/>
                <img src="../assets/result-dead.png" alt="" v-if="!result.isWin"/>
            </div>
            <p class="title auto">{{result.resultTitle.split('|')[0]}}</p>
            <p class="liveLevel" v-show="!result.isWin">第<span>{{result.resultTitle.split('|')[1]}}</span>集</p>
        </div>
        <div class="resultTxt auto">
            <p>{{result.resultTxt}}</p>
            <p v-if="!result.isWin">剧情结束</p>
        </div>
        <div class="btn">
            <template v-if="!result.isWin && appOpen">
                <div @click="onceMore">再来一次</div>
                <div @click="share">邀请朋友</div>
            </template>
            <template v-if="result.isWin && appOpen">
                <div @click="onceMore">开启他人人生</div>
                <div @click="share">炫耀一下</div>
            </template>
            <template v-if="!result.isWin && !appOpen">
                <div @click="onceMore">再来一次</div>
                <div @click="download">更多玩法</div>
            </template>
            <template v-if="result.isWin && !appOpen">
                <div @click="onceMore">开启他人人生</div>
                <div @click="download">更多玩法</div>
            </template>
        </div>
        <div class="bd" @click="toOtherPage">
            <p>截图到牙牙关注APP—<span>社区楚乔传【穿越一下】</span></p>
            <p>晒图，赢主演签名照和同款大礼哦！</p>
        </div>
        <div class="right-share" v-show="rightShareShow" @click="rightShareShow = false;"><img src="../assets/right-share.png" alt="" /></div>
    </section>
</template>

<script>

    'use strict';

    import common from '../../../common/common.js';
    import client from '../../../common/client.interactive.js';
    import route from '../route/route.js';



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
        created () {
            // 判断是否从首页进入
            if(!sessionStorage.guide){
                route.replace('guide');
                return
            }

            let deadResult = sessionStorage.deadResult;
            let winResult = sessionStorage.winResult;
            let lastAnswer = sessionStorage.lastAnswer ;
            let resultArr = JSON.parse(deadResult || winResult);
            this.result = {
                resultTitle: resultArr[0],
                resultTxt: resultArr[1],
                achieve: resultArr[2],
                isWin: !!winResult,
                lastAnswer: lastAnswer == '0' ? true : false
            }
            this.appOpen = appOpen;


            let shareTitle = '';
            let liveLevel = resultArr[0].split('|')[1];
            let achieve = resultArr[2];
            // console.log(achieve, liveLevel)
            if(winResult){
                shareTitle = '剧透，我在楚乔传顺利活到大结局，' + achieve;
            }else{
                if(this.result.lastAnswer){
                    shareTitle = '剧透，我在楚乔传顺利活到了第'+ liveLevel +'集，' + achieve;
                }else{
                    shareTitle = '剧透，我在楚乔传只活到了第'+ liveLevel +'集';
                }
                
                
            }

            // 分享数据
            this.shareData = {
                type:1,
                title: shareTitle,
                detail: '不服来战！',
                url: location.href.replace('result', 'guide') + '?v='+(+new Date()),
                img: 'http://images.9zhitx.com/c7f5f9b9-24d6-4c03-86a4-77ff833fffc7.png',
            }



            
        },
        data (){
            return {
                appOpen: true,
                shareData: {},
                result: {},
                rightShareShow: false
            }
        },
        methods: {
            onceMore (){
                //再玩一次
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_onceMore', 'click', '点击再玩的次数']);

                route.replace('/role');
            },
            share (){
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_share', 'click', '点击分享的次数']);

                if(appOpen){
                    // app内分享
                    client.clientShareOut(this.shareData); 
                }else{
                    //显示分享引导图
                    this.rightShareShow = true;
                }
            },
            toOtherPage (){
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_botoomClick', 'click', '点击底部图片的次数']);
                
                if(appOpen){

                    
                }else{
                    //跳转下载
                     window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_download', 'click', '点击下载的次数']);
                    common.yayaDwonLoadUrl();
                }
            },
            download (){
                //跳转下载
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_download', 'click', '点击下载的次数']);

                common.yayaDwonLoadUrl();
            }
        }
    };


    export default component;

</script>

<style>
    .auto{margin-left: auto;margin-right: auto;}
    .result{background: url('../assets/result-bg.jpg') no-repeat center top;background-size: 100%;overflow: hidden;}
    .result .resultTitle{margin: 2.142857rem auto;width:24.642857rem;height:14.0rem;background: url('../assets/result-border.png') no-repeat;background-size: 100%;overflow: hidden;color:#fff;text-align: center;}
    .result .resultTitle .deadWin{width:14.785714rem;height:3.571429rem;text-align:center;margin: 1.642857rem auto 1.214286rem auto;}
    .result .resultTitle .deadWin>img{width:100%;height:auto;}
    .result .resultTitle .title{width:15.785714rem;font-size: 1.142857rem;line-height: 1.8rem;margin-bottom: 0.6rem;}
    .result .resultTitle .liveLevel{font-size: 1.714286rem;}
    .result .resultTitle .liveLevel>span{color:#e5b116;}
    .result .resultTxt{width:86%;font-size: 1.142857rem;color:#e5b116;line-height: 1.714286rem;text-align: center;}
    .result .resultTxt>p:last-child{margin-top: 1.142857rem;}

    .result .btn, .result .bd{position: absolute;left:0;width:100%;}
    .result .btn{bottom:6.142857rem;padding: 0 1.928571rem;}
    .result .btn>div{width:10.714286rem;height:3.928571rem;line-height:3.928571rem;text-align:center;background:url('../assets/result-btn.png') no-repeat center center;background-size: 100% 100%;color:#000;font-size: 1.285714rem;}
    .result .btn>div:first-child{float: left;}
    .result .btn>div:last-child{float: right;}

    .result .bd{width:100%;height:5.0rem;bottom:0;text-align: center;background: rgba(0,0,0,0.2);color:#999;font-size: 1.0rem;}
    .result .bd>p:first-child{margin: 0.714286rem 0;}
    .result .bd>p>span{color:#e5b116;}
    .result .right-share{position: absolute;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,0.5);}
    .result .right-share>img{position: absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);}
    
</style>