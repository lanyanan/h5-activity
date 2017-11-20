<template>
    <section class="swiper">
        <div class="swiper-container" id="container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in items">
                    <img :src="item.backgroundImage" alt="" />
                    <span class="comment" v-for="commentItem in item.comment" :class="{'animation': commentItem.animation}" :style="{'opacity': commentItem.opacity, display: commentItem.txt==0 ? 'none' : 'block', borderRadius: commentItem.txt.length > 50 ? '1.5rem' : '5.714286rem'}">{{commentItem.txt}}</span>
                </div>

            </div>
        </div>
        <div class="down-arrow"></div>
    </section>
</template>

<script>

'use strict';

import router from '../route/route.js';
import common from '../../../common/common.js';
import client from '../../../common/client.interactive.js';
import request from '../../../common/request.js';
import swiper from 'swiper';
import  '../../../../node_modules/swiper/dist/css/swiper.min.css';




let activeId = common.getUrlParam('id');
const component = { 
    updated (){


        // 初始化定时器


        let onSlideChangeStart = (swiper) => {


        };

        let onSlideChangeEnd = (swiper) => {
            let realIndex=  swiper.realIndex;
            console.log(realIndex)

            // 隔2秒滚动出现评论
            let c_action = (index) => {
                this.items[realIndex].comment[index].animation = true;
                this.items[realIndex].comment[index].opacity = 1;
            }
            
            clearTimeout(this.timer0);
            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
 
            let commentLength = this.items[realIndex].comment.length;
            this.timer0 = setTimeout(() => {
                c_action(0);
            }, 500);
            if(commentLength == 2){
                this.timer1 = setTimeout(() => {
                    c_action(1);
                }, 1000);            
            }
            if(commentLength == 3){
                this.timer1 = setTimeout(() => {
                    c_action(1);
                }, 1000);            
                this.timer2 = setTimeout(() => {
                    c_action(2);
                }, 1500);
            }

        };

        let onTouchEnd = (swiper, event) => {
            // 最后一张图片的评论显示完成跳转
            let dl = swiper.touches.currentX - swiper.touches.startX;
            let dM = swiper.touches.currentY - swiper.touches.startY;
            let df = swiper.touches.diff;
            console.log(dl, dM)

            if(swiper.isEnd){
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    router.replace('/guide');
                    return
                }
                    
                if(df < 0){
                    router.replace('/result');
                }else{
                    return false
                }
            }
        };

        var mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            allowSwipeToPrev : false,
            onTouchEnd: onTouchEnd,
            onSlideChangeStart: onSlideChangeStart,
            onSlideChangeEnd: onSlideChangeEnd
        });


    },
    created (){
        // 判断是否从首页进入
        if(!sessionStorage.guide){
            router.replace('guide');
        }

        let that = this;
        request.doGet('/router?method=jz.h5.interact.hot.content.scene', {id: activeId}).then(function(res){
            //判断活动是否结束
            if(!res.success){
                common.promptMsg('活动已结束','center');
                return
            }
            // 存储数据
            let resObj = res.obj;
            sessionStorage.resObj_scene = JSON.stringify(resObj);

            // 定义数据
            
            let scene = resObj.scene;
            for(let x in scene){
                let contentArray = scene[x].content.split('|');
                let arr = [];
                for(let x in contentArray){
                    let obj = {txt: contentArray[x], animation: false, opacity: 0};
                    arr.push(obj);
                }
                scene[x].comment = arr;
            }
            console.log(scene)
            that.items = scene;
            //初始化评论定时器
            let c_action = (index) => {
                that.items[0].comment[index].animation = true;
                that.items[0].comment[index].opacity = 1;
            }
            let commentLength = that.items[0].comment.length;
            that.timer0 = setTimeout(() => {
                c_action(0);
            }, 500);
            if(commentLength == 2){
                that.timer1 = setTimeout(() => {
                    c_action(1);
                }, 1000);
            }
            if(commentLength == 3){
                that.timer1 = setTimeout(() => {
                    c_action(1);
                }, 1000);
                that.timer2 = setTimeout(() => {
                    c_action(2);
                }, 1500);
            }


        });
    },
    data (){
        let that = this;
        return {
            items:[],
            timer0: null,
            timer1: null,
            timer2: null
        }
    },
    methods: {
        

            
    }
};


export default component;

</script>

<style>
    .comment-body{display:none;}
    .swiper-container{height:100%;}
    .swiper-slide{text-align: center;height:100%;}
    .swiper-slide>img{width:100%;height:auto;}
    .swiper-slide>span{position: absolute;width:17.142857rem;padding:0.714286rem;background: rgba(0,0,0,0.5);color:#fff;font-size: 0.928571rem;text-align: left;border-radius: 5.714286rem;word-wrap:break-word;word-break:break-all;}
    .swiper-slide>span:nth-of-type(1){top:103px;left:25px;}
    .swiper-slide>span:nth-of-type(2){bottom:45%;right:25px;}
    .swiper-slide>span:nth-of-type(3){bottom:100px;left:25px;}
    .swiper-slide>span.animation:nth-of-type(1){-webkit-animation: comment_0_animate 1.5s linear;}
    .swiper-slide>span.animation:nth-of-type(2){-webkit-animation: comment_1_animate 1.5s linear;}
    .swiper-slide>span.animation:nth-of-type(3){-webkit-animation: comment_2_animate 1.5s linear;}
    .down-arrow{width:42px;height:30px;background: url(../assets/arrow.png) no-repeat center top;position: fixed;bottom:50px;left:50%;margin-left:-21px;z-index: 10;-webkit-animation: down-arrow 1s linear infinite;background-size: contain;} 
    @-webkit-keyframes down-arrow {
        0%{opacity:.25;bottom: 15px;}
        0.01%{opacity:.25;bottom: 20px;}
        0.02%{opacity:1;bottom: 18px;}
        60.01%{opacity:.25;bottom: 20px;}
        100%{opacity:.25;bottom: 15px;}
    }
    @-webkit-keyframes comment_0_animate {
        0%{opacity:.25;left: 100%;top:103px;}

        100%{opacity:1;left: 20px;top:103px;}
    }
    @-webkit-keyframes comment_1_animate {
        0%{opacity:.25;right: 100%;bottom:45%;}

        100%{opacity:1;right: 20px;bottom:45%;}
    }
    @-webkit-keyframes comment_2_animate {
        0%{opacity:.25;left: 100%;bottom:100px;}

        100%{opacity:1;left: 25px;bottom:100px;}
    }


</style>