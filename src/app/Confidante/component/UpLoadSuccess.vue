<template>
    <section class="uploadsuc">
        <section class="uploadsuc-center">
            <div class="uploadsuc-center-img">
                <img v-bind:src="imgUrl" />
                <span class="uploadsuc-center-img-cover"></span>
            </div>
            <div class="uploadsuc-center-line">
                <span class="uploadsuc-center-line-space"></span>
                <span class="uploadsuc-center-line-txt">生成的模糊照片效果图</span>
                <span class="uploadsuc-center-line-space"></span>
            </div>
        </section> 
       
        <Btn class="confirm" :title="confirmTitle" :backBtn="false" :callback="goToResult"></Btn>
        
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import CardHead from './CardHead.vue';
    import Btn from './Btn.vue';
    import client from '../../../common/client.interactive.js';

    const component = { 
        components:{
            'CardHead':CardHead,
            'Btn':Btn,

        },
        created (){
            this.imgUrl = this.getQueryString('imgurl');
            window._hmt && window._hmt.push(['_trackEvent', 'uploadsuc', 'click', '闺蜜模糊图片页面打开统计次数']);
            let shareData = {
                type:1,
                title: '真闺蜜OR塑料姐妹花鉴定所',
                detail: '你和闺蜜的友谊，到底有多深？赶紧来测测吧！',
                url: location.href.replace('uploadsuc', 'home') + '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);
        },
        data (){
            return {
                footToast:true,
                dataSrc:"../assets/1.jpg",
                imgShow:false,
                btnTitle:"上传图片",
                resetTitle:"重新上传",
                confirmTitle:"确定",
                backBtn:"true",
                imgUrl:''

            }
        },
        mounted (){
        },
        methods: {
            goToResult (){
                window._hmt && window._hmt.push(['_trackEvent', 'uploadsuc', 'click', '闺蜜模糊图片页面确定按钮统计次数']) 
                this.$router.push("share?imgurl="+this.imgUrl)
            },
            goToBack (){
                window._hmt && window._hmt.push(['_trackEvent', 'uploadsuc', 'click', '闺蜜模糊图片页面重新上传按钮统计次数']) 
                this.$router.back();
            },
            cancle (e){
                this.footToast = false;
            },
            show (e){
                e.stopPropagation();
                e.preventDefault();
                this.footToast = true;
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
    .uploadsuc {
        width: 100%;
        height: 100%;
        background:#fe7998;
        position:relative;
    }
    .uploadsuc-center {
        width: 100%;
        position: absolute;
        left: 0;
        top:4.5rem;
    }
    .uploadsuc-center-img {
        width: 14.31rem;
        height: 14.31rem;
        margin: 0 auto;
        position: relative;
        border:3px solid #fff;
    }
    .uploadsuc-center-img span {

    }
    .uploadsuc-center-img img {
        width: 100%;
        height: 100%;
        -webkit-filter: blur(3px); /* Chrome, Opera */
        -moz-filter: blur(3px);
        -ms-filter: blur(3px);    
        filter: blur(3px);
        z-index: -1;
    }
    .uploadsuc-center-line {
        width: 100%;
        height: 2rem;
        margin-top: 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
    }
    .uploadsuc-center-line-space {
        flex:1;
        height: 1px;
        background: #fff;
        margin: 1.1rem;
    }
    .uploadsuc-center-line-txt {
        color:#fff;
        font-size: 12px;
    }
    .foot-toast {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .foot-toast-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #ccb1b7;
        z-index: 10;
    }
    .foot-toast-iphone{
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
        margin-bottom: 0.45rem;
    }
    .foot-toast-cancle {
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
    }
    .foot-toast-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 3.57rem;
    }
    .foot-toast-input input {
        width: 100%;
        height: 3.57rem;
        opacity: 0;
    }
    .reset {
        position: absolute;
        left: 0;
        bottom: 2.85rem;
    }
    .confirm {
        position: absolute;
        left: 0;
        bottom: 8.85rem;
    }
</style>