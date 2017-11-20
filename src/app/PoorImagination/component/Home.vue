<template>
    <section id="home" class="home">
        <img class="home-title" src="../libs/home-title.png" alt="">
        <img class="home-txt" src="../libs/home-txt.png" alt="">
        <div class="home-bottom-div">
            <img class="home-bottom" src="../libs/home-bottom.png" alt="">
            <img class="home-arrow" src="../libs/home-arrow.png" alt="">
            <img class="home-run" src="../libs/runs.gif" alt="">
            <div class="home-slide">
                <img src="../libs/point.png" alt="">
            </div>
        </div>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';

    const component = { 
        created (){
                
        },
        mounted (){
            let dom = document.getElementById("home")
            this.addTouchStartEvent(dom);
            window._hmt && window._hmt.push(['_trackEvent', 'home', '', '限制想象力首页打开统计次数']);
        },
        data (){
            return {
                pageY: 0,
                pageX: 0,
                moveX: 0,
                pageY: 0
            }
        },
        methods: {
            goToResult (){
                
            },
            //添加触摸事件监听
            addTouchStartEvent(dom){
                let _this = this;
                let mark = -1;
                dom.addEventListener("touchstart",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    let touch = e.touches[0];
                    _this.pageX = touch.pageX;
                    _this.pageY = touch.pageY;
                });
                dom.addEventListener("touchmove",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    let touch = e.touches[0];
                    _this.moveX = touch.pageX;
                    _this.moveY = touch.pageY;
                    if((_this.pageX-touch.pageX)>50){
                        _this.moveLeft();
                        return;
                    }
                    
                })
            },
            //处理向左滑动事件
            moveLeft(){
                let _this = this;
                //添加渐隐类名
                let dom = document.getElementById("home");
                dom.className = "home home-hidden"
                setTimeout(()=>{
                    //路由跳转
                    sessionStorage.setItem("shareOption", "true");
                    _this.$router.push("play")
                },500)
            }
        }
    };

     export default component;

</script>

<style>   
    .home {
        width: 100%;
        height: 100%;
        background: url('../libs/homebg.png') no-repeat left top;
        background-size: 100% 100%;
        background-color: #fdc90e;
        opacity: 1;
    }
    .home-hidden {
        opacity: 0;
        transition: opacity 2s;
        -webkit-transition: opacity 2s; /* Safari */
    }
    .home-title {
        padding-top: 2rem;
        padding-left: 1.8rem;
        padding-right: 0.5rem;
        height: auto;
        margin-bottom: 1.8rem;
    }
    .home-txt {
        padding-left: 1.8rem;
        padding-right: 2rem;
    }
    .home-bottom-div {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: auto;
    }
    .home-bottom {
        position: absolute;
        left: 0;
        bottom: 2.1rem;
        width: 100%;
        max-width: 640px;
        height: auto;
    }
    .home-arrow {
        width: 6rem;
        height: 1.2rem;
        position: absolute;
        right: 1rem;
        bottom: 1.2rem;
    }
    .home-slide {
        width: 8.57rem;
        height: 2.85rem;
        position: absolute;
        left: 9rem;
        bottom: 13rem;
        border: 2px solid #000;
        border-radius: 2.8rem;
    }
    @keyframes slide
    {
        0% {right:0;}
        100% {right:60%;}
    }
    @-webkit-keyframes slide /* Safari 和 Chrome */
    {
        0% {right:0;}
        100% {right:60%;}
    }
    .home-slide img {
        position: absolute;
        right:0;
        top: 1.2rem;
        width: 3rem;
        height: 4rem;
        animation: slide 1s infinite;
        -webkit-animation: slide 1s infinite;
    }
    .home-run {
        width: 2.32rem;
        height: 2.92rem;
        position: absolute;
        left: 12rem;
        bottom: 5.6rem;
    }
</style>