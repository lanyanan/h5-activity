<template>
    <section class = "share">
        <div class = "share-txt">
            <p>             万圣节</br>
   猜猜WO最想装扮成谁？</p>
        </div>
        <div class = "share-img">
            <div class="swiper-container2">
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
        <img v-if="liderShow" class="laderPage" src="../assets/sharelider.png" />
        <Btn class="share-btn" :callback="goToResult"></Btn>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
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
            this.liderShow = sessionStorage.getItem("click") == "true"? true : false;
            window._hmt && window._hmt.push(['_trackEvent', 'share', 'click', '万圣节分享出去基友猜测页面打开统计次数']);
            window.mySwiper2 = new Swiper ('.swiper-container2', {
                direction: 'horizontal',
                loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',    
              })        
        },
        created (){
                  
        },
        data (){
            return {
                liderShow: false
            }
        },
        methods: {
            goToResult (){
                sessionStorage.setItem("shareOption", "true");
                window._hmt && window._hmt.push(['_trackEvent', 'share', 'click', '基友猜测确定按钮点击统计次数']);
                console.log(this.getQueryString("activeIndex"))
                if(window.mySwiper2.activeIndex == this.getQueryString("activeIndex")){
                    this.$router.push("right")
                }else{
                    this.$router.push("err")
                }  
            },
            backBtn (){

            },
            swiperPre (){
                window.mySwiper2.slidePrev();
            },
            swiperNext (){
                window.mySwiper2.slideNext();
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
    .share {
        width: 100%;
        height: 100%;
        background: url('../assets/page2_bg.png') no-repeat left top;
        background-size: 100% auto;
        position: relative
    }
    .share-img {
        width: 100%;
        height: 23.6rem;
        margin-top: 4.2rem;
    }
    .share-txt {
        width: 100%;
        height: 7.25rem;
        padding: 1.28rem;
    }
    .share-txt p {
        padding: 1.5rem ;
        color: #21140e;
        font-size: 18px;
        line-height: 1.8rem;
        white-space: 1px;
        font-weight: 900;
        text-align: center;
    }
    .share-btn .btn {
        background: url('../assets/btn2.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .swiper-container2 {
        margin: 0 auto;
        height: 21.42rem;
        width: 13.57rem;
        overflow:hidden;
    }
    .swiper-container2 .swiper-slide{
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
    .laderPage {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url('../assets/page1_bg.png') no-repeat left top;
        background-size: 100% 100%;
        z-index:1000000000
    }
</style>