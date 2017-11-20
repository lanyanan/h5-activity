<template>
    <section class = "result">
        <div class = "result-txt">
            <p>万圣节，你最想装扮成TA</p>
        </div>
        <div class = "result-img">
            <div class="result-img-container1">
                <div class="result-img-slide">
                    <img v-bind:src="dataSrc">
                </div>
            </div>
        </div>
        <Btn class="result-btn" :callback="goToResult"></Btn>
        <Btn class="result-btn-reset" :callback="goToBack"></Btn>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
    import Btn from './Btn.vue';
    import {Config} from './Config.js';

    let _Config = new Config()

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
            'Btn':Btn,
        },
        mounted (){
            let _this = this;
            window._hmt && window._hmt.push(['_trackEvent', 'result', 'click', '万圣节选择结果页面打开统计次数']);
        },
        created (){
            if(sessionStorage.getItem("shareOption") != "true"&&!appOpen) {
                this.$router.push("home")
            } 
            let shareData = {
                type:1,
                title: '万圣节，猜猜我最想装扮成谁？',
                detail: '好基友请接招！猜猜哪个装扮才是我的心头好',
                url: location.href.replace('result', 'share')+ '&v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171023/24a351b4-507c-409b-915d-c4f773e11a4f6960.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);
        },
        data (){
            return {
                dataSrc:_Config.getConfig(this.getQueryString("activeIndex")).imgurl||"",
            }
        },
        methods: {
            goToResult (){
                sessionStorage.setItem("shareOption", "true");
                window._hmt && window._hmt.push(['_trackEvent', 'result', 'click', '基友接招分享按钮点击统计次数']);
                if(appOpen){
                    let shareData = {
                        type:1,
                        title: '万圣节，猜猜我最想装扮成谁？',
                        detail: '好基友请接招！猜猜哪个装扮才是我的心头好',
                        url: location.href.replace('result', 'share')+ '&v=' + new Date().getTime(),
                        img: 'http://images.9zhitx.com/post/20171023/24a351b4-507c-409b-915d-c4f773e11a4f6960.png',
                        platform: 0,
                        nativeShareBtn: 0
                    }
                    client.clientShareOut(shareData);
                }else{
                    sessionStorage.setItem("click", "true");
                    this.$router.push('share?activeIndex='+this.getQueryString('activeIndex')+'&v=' + new Date().getTime()) 
                }
            },
            goToBack (){
                sessionStorage.setItem("shareOption", "true");
                window._hmt && window._hmt.push(['_trackEvent', 'result', 'click', '重新选择按钮点击统计次数']);
                this.$router.back();
            },
            getQueryString(name){
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let parmas = window.location.hash;
                let lsit = parmas.split("?");
                let nameStr = lsit[1];
                let r = nameStr.match(reg);
                //console.log(window.location.hash)
                if(r!=null)return  unescape(r[2]); return null;
            }
        }
    };

     export default component;

</script>

<style>
    html,body {
        height: 100%;
    }   
    .result {
        width: 100%;
        min-height: 100%;
        background: url('../assets/page2_bg.png') no-repeat left top;
        background-size: 100% auto;
        overflow: auto;
    }
    .result-img {
        width: 100%;
        height: 23.6rem;
        margin-top: 4.2rem;
    }
    .result-txt {
        width: 100%;
        height: 7.25rem;
        padding: 1.28rem;
    }
    .result-txt p {
        padding: 1.5rem ;
        color: #21140e;
        font-size: 18px;
        line-height: 3.6rem;
        white-space: 1px;
        font-weight: 900;
        text-align: center;
    }
    .result-img-container1 {
        margin: 0 auto;
        height: 21.42rem;
        width: 13.57rem;
        overflow:hidden;
    }
    .result-img-container1 .result-img-slide{
        background: #fff;
        border-radius: 10px;
    }
    .result-btn .btn {
        background: url('../assets/btn3.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .result-btn-reset {
        margin-top:1rem;
        margin-bottom:1rem;
    }
    .result-btn-reset .btn {
        background: url('../assets/btn4.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .cover-space {
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
    }
</style>