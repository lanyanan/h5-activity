<template>
    <section class = "right">
        <div class = "right-txt">
            <p>如此犀利！</br>果然是我的好基友，万圣节轰趴走起噜！</p>
        </div>
        <div class = "right-img">
            <div class="right-img-container1">
                <div class="right-img-slide">
                    
                </div>
            </div>
        </div>
        <Btn class="right-btn" :callback="goToResult"></Btn>
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
            window._hmt && window._hmt.push(['_trackEvent', 'right', 'click', '万圣节猜测正确页面打开统计次数']);
        },
        created (){
            console.log(88)
            if(sessionStorage.getItem("shareOption") != "true"&&!appOpen) {
                this.$router.push("home")
            } 
        },
        data (){
            return {
                
            }
        },
        methods: {
            goToResult (){
                window._hmt && window._hmt.push(['_trackEvent', 'right', 'click', '猜对页面我也要玩按钮点击统计次数']);
                this.$router.push("home")
                
            },
        }
    };

     export default component;

</script>

<style>
    html,body {
        height: 100%;
    }   
    .right {
        width: 100%;
        height: 100%;
        background: url('../assets/right_bg.png') no-repeat left top;
        background-size: 100% auto;
    }
    .right-img {
        width: 100%;
        height: 23.6rem;
        margin-top: 4.2rem;
    }
    .right-txt {
        width: 100%;
        height: 7.25rem;
        padding: 1.28rem;
    }
    .right-txt p {
        padding: 1.5rem 0;
        color: #21140e;
        font-size: 1.28rem;
        line-height: 1.8rem;
        white-space: 1px;
        font-weight: 900;
        text-align: center;
    }
    .right-img-container1 {
        margin: 0 auto;
        height: 21.42rem;
        width: 13.57rem;
        overflow:hidden;
    }
    .right-img-container1 .right-img-slide{
        background: #fff;
        border-radius: 10px;
    }
    .right-btn .btn {
        background: url('../assets/btn6.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .right-btn-reset {
        margin-top:1rem
    }
    .right-btn-reset .btn {
        background: url('../assets/btn6.png') no-repeat left top;
        background-size: 100% 100%;
    }
</style>