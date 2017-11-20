<template>
    <section class = "result-bg">
        <div class = "result-container">
            <p class = "result-name">
                {{yourName + " & " + herName}}
            </p>
            <div class = "result-span">
                <span>{{title}}</span>
            </div>
            <p class = "result-details">{{details}}</p>
        </div>
        <div class = "result-btn">
            <span @click = "goToBack" class = "result-btn-left"></span>
        </div>
    </section>
</template>

<script>

    'use strict';

    import client from '../../../common/client.interactive.js';
    import {Config} from './Config.js';
   
    const _config = new Config();

    const component = { 
        data() {
            return {
                yourName: "你的名字",
                herName: "TA的名字",
                title: "",
                details: "",
            }
        },
        created (){
            window._hmt && window._hmt.push(['_trackEvent', 'qixi-view', 'click', 'app分享的结果页面统计次数'])
            let config = _config.getConfig(this.$route.query.indexNum);
            this.yourName = decodeURI(this.$route.query.youName);
            this.herName = decodeURI(this.$route.query.herName);
            this.title = config.title;
            this.details = config.details;
        },
        methods: {
            goToBack() {
                window._hmt && window._hmt.push(['_trackEvent', 'qixi-back-view', 'click', '测测我的命运按钮的点击次数'])
                this.$router.push("view");
            }
        }
    };

     export default component;

</script>

<style scoped>
    .result-bg {
        position: relative;
        max-width: 45.7rem;
        width: 100%;
        min-height:46rem;
        height: 100%;
        background: url('../assets/bg2.jpg') no-repeat left top;
        background-size: 100% 100%;
        margin:0 auto;
    }
    .result-container {
        position: absolute;
        left: 0;
        top: 18.28rem;
        width: 100%;
        height: 20rem;
    }
    .result-name {
        width: 100%;
        height: 3rem;
        font-size: 21px;
        font-weight: 900;
        color: #fff;
        line-height: 3rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
    }
    .result-span {
        width: 80%;
        height: 3rem;
        line-height: 3rem;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: #fdecd7;
        margin: 0 auto;
        background: url('../assets/line.png') no-repeat center center;
        background-size: 19.4rem 0.67rem;
    }
    .result-details {
        width: 80%;
        margin:0 auto;
        font-size: 16px;
        line-height: 2rem;
        text-align: center;
        color: #fdecd7;
        letter-spacing: 2px;
    }
    @media (max-width: 319px){
        .result-span {
             background-size: 22.4rem 0.67rem;
        }
        .result-details {
            letter-spacing: 1px;
        }
    }
    @media (min-width: 320px) and (max-width: 352px){
        .result-span {
             background-size: 22.4rem 0.67rem;
        }
        .result-details {
            letter-spacing: 1px;
        }
    }
    .result-btn {
        position: absolute;
        left: 0;
        bottom: 3.21rem;
        width: 100%;
        height: 3.71rem;
    }
    .result-btn span {
        display: block;
        
    }
    .result-btn .result-btn-left {
        width: 11.42rem;
        height: 3.51rem;
        margin: 0 auto;
        background: url('../assets/shareMe.png') no-repeat left top;
        background-size: 100% 100%;
    }
    
</style>