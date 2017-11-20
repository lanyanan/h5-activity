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
        <div v-if="btnShow" class = "result-btns">
            <span @click = "goToShare" class = "result-btn-left"></span>
            <span @click = "goToBack"  class = "result-btn-right"></span>
        </div>
        <div v-else class = "result-btns-one">
            <span @click = "goBack" class = "result-btn-left-one"></span>
        </div>
        <section @click = "hiddenTips" class = "share" v-if="showTips">
            <div class = "share-tips">     
            </div> 
        </section>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
    import {Config} from './Config.js';
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
   
    const _config = new Config();

    const component = { 
        data() {
            return {
                yourName: "你的名字",
                herName: "TA的名字",
                title: "",
                details: "",
                showTips: false,
                btnShow: true
            }
        },
        created (){
            window._hmt && window._hmt.push(['_trackEvent', 'qixi-result', 'click', '七夕结果页面统计次数']);
            let config = _config.getConfig(this.$route.query.indexNum);
            this.yourName = decodeURI(this.$route.query.youName);
            this.herName = decodeURI(this.$route.query.herName);
            this.title = config.title;
            this.details = config.details;
            let data = {
                type: 1,
                title: "很准的小测试：查查你与TA的缘分",
                detail: "七夕来了，你和TA真的有缘吗？",
                url: location.href.replace('result', 'view') + '&v='+(+new Date()),
                img: "http://images.9zhitx.com/0c4afb65-ea94-42e3-9d47-6e4545eeec61.png",
                platform: 0,
                nativeShareBtn: 1
            }
            if(appOpen) {
                client.clientShareOut(data)
            }
            if(sessionStorage.getItem("home") == "1") {
                this.btnShow = true;
            } else {
                this.btnShow = false;
            }
        },
        methods: {
            goBack() {
                window._hmt && window._hmt.push(['_trackEvent', 'qixi-gotoview', 'click', '测测我的命运的点击次数']);
                this.$router.push("view")
            },
            goToBack() {
                window._hmt && window._hmt.push(['_trackEvent', 'qixi-gotoview', 'click', '不服命运的点击次数']);
                this.$router.back();
            },
            goToShare() {
                window._hmt && window._hmt.push(['_trackEvent', 'qixi-gotoshare', 'click', '预言成真的点击次数'])
                let data = {
                    type: 1,
                    title: "很准的小测试：查查你与TA的缘分",
                    detail: "七夕来了，你和TA真的有缘吗？",
                    url: location.href.replace('result', 'share') + '&v='+(+new Date()),
                    img: "http://images.9zhitx.com/0c4afb65-ea94-42e3-9d47-6e4545eeec61.png",
                    platform: 0,
                }
                if(appOpen) {
                    client.clientShareOut(data)
                }else {
                    this.showTips = true;
                }
            },
            hiddenTips() {
                this.showTips = false;
            }
        }
    };

     export default component;

</script>

<style >
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
    .result-btns {
        position: absolute;
        left: 50%;
        bottom: 3.21rem;
        width: 90%;
        height: 3.71rem;
        margin-left: -45%;
    }
    .result-btns span {
        display: block;
        
    }
    .result-btns .result-btn-left {
        float: left;
        width: 10.42rem;
        height: 3.71rem;
        margin-left: 0.71rem;
        background: url('../assets/btn-right.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .result-btns .result-btn-right {
        float: right;
        width: 10.42rem;
        height: 3.71rem;
        background: url('../assets/btn-left.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .share {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
    .share-tips {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url('../assets/share.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .result-btns-one {
        position: absolute;
        left: 0;
        bottom: 3.21rem;
        width: 100%;
        height: 3.71rem;
    }
    .result-btns-one span {
        display: block;
        
    }
    .result-btns-one .result-btn-left-one {
        width: 11.42rem;
        height: 3.51rem;
        margin: 0 auto;
        background: url('../assets/shareMe.png') no-repeat left top;
        background-size: 100% 100%;
    }
    
</style>