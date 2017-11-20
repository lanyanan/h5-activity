<template>
    <section>
        <img class="home-bg-img" src="../assets/homebg.png" alt="">
        <Btn class="reset" :title="btnTitle" :backBtn="backBtn" :callback="goToUpLoadImg"></Btn>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import Btn from './Btn.vue';
    import client from '../../../common/client.interactive.js';

    const component = { 
        components:{
            'Btn':Btn,
           
        },
        created (){
            window._hmt && window._hmt.push(['_trackEvent', 'home', 'click', '闺蜜首页打开统计次数']);
            let shareData = {
                type:1,
                title: '真闺蜜OR塑料姐妹花鉴定所',
                detail: '你和闺蜜的友谊，到底有多深？赶紧来测测吧！',
                url: location.href + '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);    
        },
        data (){
            return {
                btnTitle:"开始鉴定",
                backBtn:false
            }
        },
        methods: {
            goToUpLoadImg (){
                window._hmt && window._hmt.push(['_trackEvent', 'home', 'click', '闺蜜首页按钮点击统计次数'])   
                this.$router.push("upload"+ '?v=' + new Date().getTime())
            }
        }
    };

     export default component;

</script>

<style>   
    .home-bg-img {
        width: 100%;
    }
    .reset {
        position: absolute;
        left: 0;
        bottom: 2.85rem;
    }
</style>