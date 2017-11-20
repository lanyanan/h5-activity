<template>
    <section class="share">
        <section class="share-center">
            <div class="share-center-img">
                <div v-for="item in list" class="share-center-img-covers">
                    <img  v-bind:src="item.imgurl" />
                </div> 
            </div>
        </section> 
        <p class="share-txt">把照片分享给你的闺蜜吧!看看TA们能否第一时间找到你</p>
        <Btn class="reset" :title="resetTitle" :backBtn="false" :callback="goToResult"></Btn>
        
    </section>
</template>

<script>

    'use strict';
    import client from '../../../common/client.interactive.js';
    import route from '../route/route.js';
    import CardHead from './CardHead.vue';
    import Btn from './Btn.vue';
    import {Config} from './Config.js';

    let ConfigDate  = new Config();

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
            'CardHead':CardHead,
            'Btn':Btn
        },
        created (){

            let shareData = {
                type:1,
                title: '考验友情的时刻到了！',
                detail: '真姐妹OR塑料姐妹花，你能在以下图中找到WO吗？',
                url: location.href.replace('share', 'find')+ '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);

            window._hmt && window._hmt.push(['_trackEvent', 'share', 'click', '闺蜜分享闺蜜页面打开统计次数']) 
            let number = Math.random();
            let indexs = parseInt(Math.floor(number * 7));
            let imgurldata = {
                id:1,
                imgurl:this.getQueryString('imgurl')
            };
            let dataList = [];
            function xunhuan(){
                let data = ConfigDate.getConfig();
                let k = -1;
                for(var j = 0; j < dataList.length;j++){
                    if(dataList[j].id == data.id){
                        k=1;    
                    }
                }
                if(k!=1){
                    dataList.push(data)
                }else{
                    xunhuan()
                }
            }
            for (var i = 0; i < 8 ; i++){
                if(indexs == i){
                    dataList.push(imgurldata)
                    xunhuan()
                }else{
                    xunhuan()
                }
            };
            console.log(dataList)
            this.list = dataList;
        },
        data (){
            return {
                footToast:true,
                dataSrc:"",
                imgShow:false,
                btnTitle:"上传图片",
                resetTitle:"分享闺蜜",
                confirmTitle:"确定",
                backBtn:"true",
                list:[{},{},{},{},{},{},{},{},{}],
                liderShow:false

            }
        },
        methods: {
            goToResult (){
                console.log(appOpen)
                if(appOpen){
                    console.log(1)
                    let shareData = {
                        type:1,
                        title: '考验友情的时刻到了！',
                        detail: '真姐妹OR塑料姐妹花，你能在以下图中找到WO吗？',
                        url: location.href.replace('share', 'find')+ '?v=' + new Date().getTime(),
                        img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                        platform: 0,
                        nativeShareBtn: 0
                    }
                    client.clientShareOut(shareData);
                }else{
                    sessionStorage.setItem("click", "true");
                    this.$router.push('find?imgurl='+this.getQueryString('imgurl')+'&v=' + new Date().getTime()) 
                } 
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
    .share {
        width: 100%;
        height: 100%;
        background: #fe7998;
        position: relative;
    }
    .share-center {
        position: absolute;
        left: 0;
        top: 0;
        padding: 0.45rem;
        background: #fff;
        margin: 1.42rem 1.25rem 1.07rem 1.25rem;
        border-radius: 5px;

    }
    .share-txt {
        position: absolute;
        left: 0;
        top: 27rem;
        padding: 1.5rem 1.3rem;
        font-size: 16px;
        color: #fff;
        text-align: center;
        letter-spacing: 1px;
    }
    .share-center-img {
        width: 100%;
        height: 25rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap:  wrap;
    }
    .share-center-img img{
        width: 100%;
        height: 100%;
        -webkit-filter: blur(5px); /* Chrome, Opera */
        -moz-filter: blur(5px);
        -ms-filter: blur(5px);    
        filter: blur(5px);
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
    .share-center-img-covers {
        width: 7.14rem;
        height: 7.14rem;
        overflow: hidden;
        border-radius: 5px;
        padding: 1px;
    }

</style>