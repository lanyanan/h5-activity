<template>
    <section class="result">
        <div class="dog">
            <div class="headImg">
                <img :src="dog.headImg" alt="" />
            </div>
            <div class="name">{{dog.name}}</div>
            <div class="desc">{{dog.desc}}</div>
        </div>
        <div class="btn">
            <div class="onceMore" @click="onceMore"></div>
            <div class="share" @click="share"></div>
        </div>
        <div class="yaya" @click="yayaClick">@<span>牙牙关注</span>出品</div>
        <div class="right-share" v-show="rightShareShow" @click="rightShareShow = false;"><img src="../assets/right-share.png" alt="" /></div>
    </section>
</template>

<script>

    'use strict';

    import common from '../../../common/common';
    import client from '../../../common/client.interactive';
    import route from '../route/route';
    import data from '../data';



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

            //获取userName的索引值
            let userName = localStorage.userName,
                nameRecord = JSON.parse(localStorage.nameRecord),
                index;
            if(nameRecord[userName] == ''){
                // 随机筛选一条数据并保存索引值
                index = Math.floor(Math.random()*12);
                nameRecord[userName] = index;
                localStorage.nameRecord = JSON.stringify(nameRecord);
            }else{
                index = nameRecord[userName];
            }
            
            this.dog = data[index];
            this.shareData = {
                type:1,
                title: '测测你属于哪一种单身狗',
                detail: `我是一只${this.dog.desc}`,
                url: location.href.replace('result', 'guide') + '?v='+ new Date().getTime(),
                img: this.dog.headImg
            }
            


            
        },
        data (){
            return {
                appOpen: true,
                shareData: {},
                dog: {},
                rightShareShow: false
            }
        },
        methods: {
            onceMore (){
                //再测一次
                window._hmt && window._hmt.push(['_trackEvent', 'dog_onceMore', 'click', '点击再玩的次数']);
                route.go(-1);

                
            },
            share (){
                window._hmt && window._hmt.push(['_trackEvent', 'dog_share', 'click', '点击分享的次数']);

                if(appOpen){
                    // app内分享
                    client.clientShareOut(this.shareData); 
                }else{
                    //显示分享引导图
                    this.rightShareShow = true;
                }
            },
            yayaClick (){
                

                if(appOpen){
                    // app内分享
                    
                }else{
                    //跳转下载
                    window._hmt && window._hmt.push(['_trackEvent', 'dog_download', 'click', '点击牙牙关注跳下载的次数']);
                    common.yayaDwonLoadUrl();

                }
                
            }
        }
    };


    export default component;

</script>

<style>
    .result{background: url('../assets/section-bg.png') no-repeat center top;background-size: 100% 100%;overflow: hidden;}
    .result .dog{padding-top: 4.5rem;color:#fff;text-align: center;}
    .result .headImg{width:17.857143rem;height:17.857143rem;border-radius: 50%;margin: 0 auto;}
    .result .headImg>img{width:100%;}
    .result .name{font-size: 1.928571rem;margin: 1.5rem 0;}
    .result .desc{font-size: 1.285714rem;line-height: 2.142857rem;padding:0 1.785714rem;}
    .result .btn{padding:3.714286rem 1.785714rem 6rem;}
    .result .btn>div{width:9.428571rem;height:3.571429rem;background:url('../assets/onceMore-btn.png') no-repeat;background-size: 100%;float: left;}
    .result .btn>div.share{background-image: url('../assets/share-btn.png');float:right;}
    .result .right-share{position: absolute;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,0.5);}
    .result .right-share>img{position: absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);}
    .result .yaya{color:#3a4d79;text-align: center;padding-bottom: 2rem;}
    .result .yaya>span{text-decoration: underline;}
</style>