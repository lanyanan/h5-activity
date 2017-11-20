<template>
    <section class="result" :style="{backgroundImage: backgroundImage, backgroundColor: backgroundColor}">
        <div class="hd">
           <div class="result-list">
               <ul>
                   <li v-for="item in items">
                       <div class="li-hd">
                            <div class="ld">
                                <div class="optTitle">
                                    <span>{{item.leftPercent}}</span>
                                    <span class="one-line">{{item.answer == 0 ? '（已选）' : ''}}{{item.leftButtonName}}</span>
                                </div>
                                <div class="percent">
                                    <div class="bd" :style="{width: item.leftPercent}"></div>
                                </div>
                            </div>
                            <div class="cd">
                                <img :src="item.optionImage" alt="" />
                            </div>
                            <div class="rd">
                                <div class="optTitle">
                                    <span class="one-line">{{item.rightButtonName}}{{item.answer == 1 ? '（已选）' : ''}}</span>
                                    <span>{{item.rightPercent}}</span>
                                </div>
                                <div class="percent">
                                    <div class="bd" :style="{width: item.rightPercent}"></div>
                                </div>
                            </div>
                       </div>
                       <div class="li-bd">
                           <div class="title one-line">{{item.title}}</div>
                       </div>
                   </li>
               </ul>
           </div>
        </div>
        <div class="bd" @click="toOtherPage">
            <img :src="bottomImage" alt="结果页底图" />
        </div>

    </section>
</template>

<script>

    'use strict';

    import common from '../../../common/common.js';
    import client from '../../../common/client.interactive.js';
    import request from '../../../common/request.js';
    import route from '../route/route.js';

    let activeId = common.getUrlParam('id');

    // 能力检测是否客户端打开
    let appOpen = false;
    setTimeout(function(){
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
        
            let answerArr = JSON.parse(this.$route.query.answerArr);
            console.log(answerArr)
            let that = this;
            let resObj = JSON.parse(sessionStorage.resObj_scene);
            let scene = resObj.scene;
            let result = resObj.result;

            // 背景图和背景色
            that.backgroundImage = `url(${result.backgroundImage})`;
            that.backgroundColor = result.backgroundColor;

            //投票结果和百分比
            for(let x in scene){
                scene[x].answer = answerArr[x];
                let leftPercent = common.getRandomIntInclusive(20, 80);
                let rightPercent = 100 - leftPercent;
                scene[x].leftPercent = `${leftPercent}%`;
                scene[x].rightPercent = `${rightPercent}%`;
            }
            that.items = scene;
            console.log(scene)

            // 底部文案图
            that.bottomImage = appOpen ? result.appBottomImage : result.nonAppBottomImage;
            that.jumpType = result.jumpType;
            that.jumpId = result.jumpId;
            
        },
        data (){
            return {
                backgroundImage: '',
                backgroundColor: '#fff',
                items: [],
                bottomImage: '',
                jumpType: '',
                jumpId: '',

            }
        },
        methods: {
            toOtherPage (){
                window._hmt && window._hmt.push(['_trackEvent', 'tpl_botoomClick', 'click', '点击底部图片的次数']);
                if(appOpen){
                    let toNativeData = (type) => {
                        if(type == '16'){
                            return {
                                type: type, 
                                id: this.jumpId,
                                starId: this.ringStartId,
                                starName: this.ringStartName
                            }
                        }else{
                            return {
                                type: type, 
                                id: this.jumpId 
                            }
                        }
                        
                    };

                    switch(this.jumpType){
                        case 3 : client.clientWebGotoNative(toNativeData('10'))//跳帖子;
                        break
                        case 4 : client.clientWebGotoNative(toNativeData('9'))//跳资讯;
                        break
                        case 5 : client.clientWebGotoNative(toNativeData('16'))//跳明星圈;

                        break
                        case 6 : client.clientWebGotoNative(toNativeData('15'))//跳普通圈;
                        break
                        default : '';
                    }
                    
                }else{
                    //跳转下载
                     window._hmt && window._hmt.push(['_trackEvent', 'tpl_download', 'click', '点击下载的次数']);
                    common.yayaDwonLoadUrl();
                }
            }
        }
    };


    export default component;

</script>

<style lang="less">
    .result{background: url('') no-repeat center top;background-size: 100% 100%;}
    .result .hd{position: absolute;left: 0;right: 0;top: 0;bottom: 5rem;overflow: auto;}
    .result-list>ul>li{overflow: hidden;padding: 0 0.892857rem;border-top: 1px solid #dbd7d9;}
    .result-list>ul>li .optTitle{
        color: #666;
        font-size: 1.0rem;
        overflow: hidden;
        span:first-child{float: left;}
        span:last-child{float: right;}
    }
    .result-list>ul>li .percent{
        background: #eee;
        height: 0.714286rem;
        border-radius: 0.714286rem;
        margin-top: 0.642857rem;
        position: relative;
    }
    .result-list>ul>li .li-hd{display: flex;}
    .result-list>ul>li .li-hd .ld{
        flex: 1;
        padding-top: 2.0rem;
        .percent{
            .bd{background: #ee3939;position: absolute;width: 50%;height: 0.714286rem;border-radius: 0.357143rem;right: 0;top: 0;}
        }
    }
    .result-list>ul>li .li-hd .cd{
        width: 5.714286rem;
        padding: 0.714286rem 0.892857rem;
        img{width: 3.928571rem;height: 3.928571rem;border-radius: 50%;}
    }
    .result-list>ul>li .li-hd .rd{
        flex: 1;
        padding-top: 2.0rem;
        .percent{
            .bd{background: #4ca1eb;position: absolute;width: 50%;height: 0.714286rem;border-radius: 0.357143rem;left: 0;top: 0;}
        }
    }
    .result-list>ul>li .li-bd .title{color: #000;font-size: 1.285714rem;text-align: center;margin-bottom: 0.714286rem;}

    .result{
        > .bd{overflow: hidden;position: absolute;bottom: 0;left: 0;right: 0;height: 5rem;}
    }
    .one-line{display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; overflow:hidden; text-overflow:ellipsis;}
    .optTitle .one-line{max-width: 70%;}

    
</style>