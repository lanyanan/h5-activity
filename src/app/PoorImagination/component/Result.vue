<template>
    <section id="result" class="result">
        <div class="result-top">
            <p class="result-top-title">{{data[key].title}}</p>
            <p class="result-top-points">{{"- "+getQueryString('points')+"分 -"}}</p>
            <p class="result-top-txt">{{data[key].txt}}</p>
        </div>
        <div class="result-bottom">
            <img src="../libs/city.png" alt="">
            <div v-if="!show" class="btn-list">
                <div @touchstart="goToBack" class="btn-reset">
                    <span></span>
                </div>
                <div @touchstart="goToResult" class="btn-share">
                    <span></span>
                </div>
            </div>
            <div v-if="show" class="btn-list">
                <div @touchstart="goToBack" class="btn-me">
                    <span></span>
                </div>
            </div>
        </div>
        <img v-if="bgshow" class="bg" @touchstart="cancle" src="../libs/sharelider.png"/>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import Data from '../data/Result.js';
    import client from '../../../common/client.interactive.js';

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
        created (){
                
        },
        mounted (){
            window._hmt && window._hmt.push(['_trackEvent', 'result', 'openPage', '限制想象力结果页打开统计次数']);
            if (sessionStorage.getItem("shareOption")!="true"){
                if(this.getQueryString("mark")==0){
                    this.show = true;
                }else{
                    this.$router.push("home");
                }
            }else{
            };
            if(this.getQueryString('mark') == 0){
                location.href=location.href.replace("mark=0","mark=1");
            }
            
        },
        data (){
            return {
                data:Data,
                key:this.getQueryString("pointKey"),
                show:false,
                bgshow:false

            }
        },
        methods: {
            cancle (){
                if(this.bgshow){
                    this.bgshow = false;
                }else {
                    this.bgshow = true;
                }
            },
            goToBack (){
                this.$router.push("home");
                window._hmt && window._hmt.push(['_trackEvent', 'result', 'backHomeBnt', '限制想象力结果页返回按钮打开统计次数']);
            },
            goToResult (){
                window._hmt && window._hmt.push(['_trackEvent', 'result', 'shareResult', '限制想象力结果页分享按钮打开统计次数']);
                let shareData = {
                    type:1,
                    title: '2017贫穷限制了你多少想象力考卷',
                    detail: '是时候展示真正的财力了',
                    url: location.href+ "&v=" + new Date().getTime() + "&mark=0",
                    img: 'http://images.9zhitx.com/post/20171109/8d0a957d-27a0-4eb9-b2e4-edff688c5c2b4201.png',
                    platform: 0,
                    nativeShareBtn: 0
                }
                if(appOpen){
                    client.clientShareOut(shareData);
                }else{
                    this.cancle();
                }
            },
            getQueryString(name){
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let parmas = window.location.hash;
                let lsit = parmas.split("?");
                let nameStr = lsit[1];
                let r = nameStr.match(reg);
                if(r!=null)return  unescape(r[2]); return null;
            }
        }
    };

     export default component;

</script>

<style>   
    .result {
        width: 100%;
        height: 100%;
        background: url('../libs/resultbg.png') no-repeat left top;
        background-size: 100% 100%;
        opacity: 1;
        background-color: #fdc80a;
        font-family: 'hoverTreeFont';
    }
    .result-top {
        width: 100%;
        height: auto;
        text-align: center;
        padding-top: 2.14rem;
        padding-left: 2.14rem;
        padding-right: 2.14rem;
    }
    .result-top-title {
        font-size: 27px;
    }
    .result-top-points{
        padding-top: 1.1rem;
        padding-bottom: 1.5rem;
        font-size: 24px;
        color: #f33939;
    }
    .result-top-txt {
        font-size: 21px;
        color: #000000;
    }
    .result-hidden {
        opacity: 0;
        transition: opacity 2s;
        -webkit-transition: opacity 2s; /* Safari */
    }
    .result-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 8rem;
    }
    .result-bottom img {
        display: block;
        position: absolute;
        left: 0;
        top: -15.8rem;
        width: 100%;
    }
    .btn-list {
        position: absolute;
        left: 0;
        bottom: 2.85rem;
        width: 100%;
        height: 3.6rem;
        
    }
    .btn-reset {
        width: 50%;
        height: 3.6rem;
        float: left;
        text-align: center;
    }
    .btn-reset span {
        padding: 0rem 5.35rem 3.6rem;
        background: url('../libs/reset.png') no-repeat left top;
        background-size: 10.71rem 3.6rem;
    }
    .btn-share {
        width: 50%;
        height: 3.6rem;
        float: left;
        text-align: center;
    }
    .btn-share span {
        padding: 0rem 5.35rem 3.6rem;
        background: url('../libs/share.png') no-repeat left top;
        background-size: 10.71rem 3.6rem;
    }
    .btn-me {
        width: 100%;
        height: 3.57rem;
        text-align: center;
    }
    .btn-me span {
        padding: 0rem 7.14rem 3.6rem;
        background: url('../libs/me.png') no-repeat left top;
        background-size: 14.28rem 3.6rem;
    }
    .bg {
        position:absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.5);
        z-index:10
    }
</style>