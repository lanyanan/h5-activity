<template>
    <section class = "home">
        <div class = "home-top"></div>
        <div class = "home-txt">
            <Btn class="home-btn" :callback="goToResult"></Btn>
            <p>万圣节到啦！你是否准备好去迎接万圣Party了呢？万圣糖果、南瓜灯、假面舞会，通通都到碗里来！
如果参加万圣大趴，你会以哪种装扮出现呢？万圣节装扮大猜想！选出你最想装扮的角色，看看你的基友能否猜出来！</p>
        </div>
        
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
        created (){
            if(sessionStorage.getItem("shareOption") != "true"&&!appOpen) {
                this.$router.push("home")
            } 
        },
        mounted (){
            window._hmt && window._hmt.push(['_trackEvent', 'home', 'click', '万圣节首页打开统计次数']);
        },
        data (){
            return {
                
            }
        },
        methods: {
            goToResult (){
                window._hmt && window._hmt.push(['_trackEvent', 'home', 'click', '万圣节首页按钮点击统计次数']);
                sessionStorage.setItem("shareOption", "true");
                this.$router.push("select")
            },
            backBtn (){

            }
        }
    };

     export default component;

</script>

<style>
    html,body {
        height: 100%;
    }   
    .home {
        width: 100%;
        height: 100%;
        background: url('../assets/page1_bg.png') no-repeat left top;
        background-size: 100% 100%;
        position: relative;
    }
    .home-top {
        width: 100%;
        height: 20rem;
        background: url('../assets/logo_pic.png') no-repeat center bottom;
        background-size: 17.85rem 17.85rem;
    }
    .home-txt {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 15.71rem;
        padding: 1.25rem;
        background: url('../assets/2_bg_pic.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .home-txt p {
        padding: 0.5rem 1.5rem;
        color: #21140e;
        font-size: 1.14rem;
        line-height: 1.5rem;
        font-weight: 900;
    }
    .home-btn {
        margin-top: 1rem;
        position: absolute;
        bottom: 0.7rem;
        left:0;
    }
    .home-btn .btn {
        background: url('../assets/btn1.png') no-repeat left top;
        background-size: 100% 100%;
    }
</style>