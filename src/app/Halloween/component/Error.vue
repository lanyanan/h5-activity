<template>
    <section class = "result">
        <div class = "result-txt">
            <p>OMG！</br>猜错了！我要去你家捣蛋！</p>
        </div>
        <div class = "result-img">
            <div class="result-img-container1">
                <div class="result-img-slide">
                    
                </div>
            </div>
        </div>
        <Btn class="result-btn" :callback="goToBack"></Btn>
        <Btn class="result-btn-reset" :callback="goToResult"></Btn>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
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
            window._hmt && window._hmt.push(['_trackEvent', 'err', 'click', '万圣节猜测错误页面打开统计次数']);       
        },
        created (){
            if(sessionStorage.getItem("shareOption") != "true"&&!appOpen) {
                this.$router.push("home")
            } 
        },
        data (){
            return {
                dataSrc:_Config.getConfig(1).imgurl
            }
        },
        methods: {
            goToResult (){
                sessionStorage.setItem("shareOption", "true");
                window._hmt && window._hmt.push(['_trackEvent', 'error', 'click', '错误页面我也要玩按钮点击统计次数']);
                this.$router.push("home")  
            },
            goToBack (){
                sessionStorage.setItem("shareOption", "true");
                window._hmt && window._hmt.push(['_trackEvent', 'error', 'click', '错误页面我不服再来按钮点击统计次数']);
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
        background: url('../assets/error_bg.png') no-repeat left top;
        background-size: 100% auto;
        overflow: auto
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
        padding: 1.5rem 0rem;
        color: #21140e;
        font-size: 1.28rem;
        line-height: 1.8rem;
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
        background: url('../assets/btn5.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .result-btn-reset {
        margin-top:1rem;
        margin-bottom:1rem
    }
    .result-btn-reset .btn {
        background: url('../assets/btn6.png') no-repeat left top;
        background-size: 100% 100%;
    }
</style>