<template>
    <section class="result" :class="currentUserSex==0 ? 'woman': 'man'">
        <img :src="resultCardUrl" alt="" />
        <div class="btn">
            <!-- <div class="fl" @click="download">保存图片</div> -->
            <p v-if="!appOpen">长按上方图片可保存到手机</p>
            <div class="auto" v-if="!shareFlag" @click="share">分享好友</div>
            <div class="auto play" v-if="!!shareFlag" @click="play">生成我的声鉴卡</div>
        </div>
        <div class="right-share" v-show="rightShareShow" @click="rightShareShow = false;"><img src="../assets/right-share.png" alt="" /></div>
    </section>
</template>

<script>

    'use strict';

    import common from '../../../common/common';
    import client from '../../../common/client.interactive';
    import ajax from '../../../common/ajax';
    import route from '../route/route';
    import data from '../data';
    import '../../../common/html2canvas';



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
        created () {

            // 判断是否从首页进入
            if(!sessionStorage.guide){
                route.replace('guide');
                return
            }

            // 获取当前用户和鉴定卡地址
            this.currentUserSex = this.$route.query.currentUserSex;
            this.resultCardUrl = this.$route.query.resultCardUrl;
            let currentUserName = this.$route.query.currentUserName;
            let currentMainVoice = this.$route.query.currentMainVoice;
            let currentRoleName = this.$route.query.currentRoleName;
            this.shareData = {
                type:1,
                title: `我拥有${currentMainVoice}，适合给${currentRoleName}配音！`,
                detail: '你了解你的声音吗？快来生成专属你的声鉴卡吧！',
                url: location.href.replace('result', 'guide') + '&v='+(+new Date()),
                img: 'http://images.9zhitx.com/f189c306-3b9d-4240-8479-08b1bbb8f987.png'
            }


            
        },
        data (){
            return {
                appOpen: appOpen,
                shareData: {},
                rightShareShow: false,
                currentUserSex: '',
                resultCardUrl: '',
                shareFlag: ''
            }
        },
        methods: {
            share (){
                window._hmt && window._hmt.push(['_trackEvent', 'voice_share', 'click', '点击分享的次数']);

                if(appOpen){
                    // app内分享
                    client.clientShareOut(this.shareData); 
                }else{
                    //显示分享引导图
                    this.rightShareShow = true;
                }
            },
            play (){
                route.replace('guide');
            }
        }
    };


    export default component;

</script>

<style lang="less">
    .fl{float: left;}
    .fr{float: right;}
    .auto{margin-left: auto;margin-right: auto;}
    .result{background: no-repeat center top;background-size: 100%;}
    .result.woman{
        background-color: #FFB9B9;
        .btn>div{background: #F66F6F;box-shadow: 0 4px 10px 0 #FEA6A6;}
        .detail .txt{color: #F66F6F;}
    }
    .result.man{
        background-color: #B9D6FF;
        .btn>div{background: #6294EB;box-shadow: 0 4px 10px 0 #6294EB;}
        .detail .txt{color: #6194EB;} 
    }
     
    .result>div{margin-left: auto;margin-right: auto;}
    .result{

        .btn{overflow: hidden;padding: 0 1.071429rem;padding-bottom: 2rem;}
        .btn>div{width:10.714286rem;height:3.142857rem;line-height: 3.142857rem;border-radius: 100px;color:#fff;font-size: 1.428571rem;position: relative;text-align: center;}
        .btn>div.play{width:11.714286rem;}
        .btn>div:before{content: '';position: absolute;width:2.642857rem;height:4px;background:url('../assets/btn-em.png') no-repeat;background-size: 100%;left:1.142857rem;top:4px;}
        .btn>p{text-align: center;color:#fff;margin-bottom: 0.5rem;}
        .right-share{position: absolute;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,0.5);}
        .right-share>img{position: fixed;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);}
    }
</style>