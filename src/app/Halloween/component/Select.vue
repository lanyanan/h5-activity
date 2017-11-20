<template>
    <section class = "select">
        <div class = "select-txt">
            <p>以下角色你最想装扮成谁？选择后，分享给好基友！看看TA能否猜出来吧！</p>
        </div>
        <div class = "select-img">
            <div class="swiper-container1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="../assets/1_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/2_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/3_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/4_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/5_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/6_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/7_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/8_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/9_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/10_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/11_pic@2x.png">
                    </div>
                    <div class="swiper-slide">
                        <img src="../assets/12_pic@2x.png">
                    </div>
                </div>
                <div class="swiper-button-prev" @click="swiperPre"></div>
                <div class="swiper-button-next" @click="swiperNext"></div>
            </div>
        </div>
        <Btn class="select-btn" :callback="goToResult"></Btn>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import Btn from './Btn.vue';

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
            window._hmt && window._hmt.push(['_trackEvent', 'select', 'click', '万圣节选择装扮页面打开统计次数']);
            window.mySwiper1 = new Swiper ('.swiper-container1', {
                direction: 'horizontal',
                loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                
              })        
        },
        created (){
            if(sessionStorage.getItem("shareOption") != "true"&&!appOpen) {
                this.$router.push("home")
            }     
        },
        data (){
            return {
                
            }
        },
        methods: {
            goToResult (e){
                e.preventDefault();
                e.stopPropagation();
                window._hmt && window._hmt.push(['_trackEvent', 'select', 'click', '万圣节选择页面按钮点击统计次数']);
                sessionStorage.setItem("shareOption", "true");
                window.location.href = window.location.href.replace("select","result")+"?activeIndex="+ window.mySwiper1.activeIndex
            },
            backBtn (){

            },
            swiperPre (){
                window.mySwiper1.slidePrev();
            },
            swiperNext (){
                window.mySwiper1.slideNext();
            }
        }
    };

     export default component;

</script>

<style>
    html,body {
        height: 100%;
    }   
    .select {
        width: 100%;
        min-height: 100%;
        background: url('../assets/page2_bg.png') no-repeat left top;
        background-size: 100% auto;
        overflow: auto;
    }
    .select-img {
        width: 100%;
        height: 23.6rem;
        margin-top: 4.2rem;
    }
    .select-txt {
        width: 100%;
        height: 7.25rem;
        padding: 1.28rem;
    }
    .select-txt p {
        padding: 1.5rem ;
        color: #21140e;
        font-size: 14px;
        line-height: 1.8rem;
        white-space: 1px;
        font-weight: 900;
    }
    .select-btn {
        margin-bottom: 2rem;
    }
    .select-btn .btn {
        background: url('../assets/btn2.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .swiper-container1 {
        margin: 0 auto;
        height: 21.42rem;
        width: 13.57rem;
        overflow:hidden;
    }
    .swiper-container1 .swiper-slide{
        background: #fff;
        border-radius: 10px;
    }
    .swiper-button-next{
        width: 50px;
        height: 50px;
        background-image:url("../assets/right_btn.png");
        background-size: 50px 50px;
        z-index: 100
    }
    .swiper-button-prev{
        width: 50px;
        height: 50px;
        background-image:url("../assets/left_btn.png");
        background-size: 50px 50px;
        z-index: 100
    }
</style>