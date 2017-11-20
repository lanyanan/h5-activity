<template>
    <section class="guide">
        <div class="head">
            <img src="../assets/index-headbg.png" alt="" />
            <div class="countDownTime">
                <template v-if="interactStatus == 0">
                    倒计时：
                    {{countDownTime.days}}天{{countDownTime.hours}}：{{countDownTime.minutes}}：{{countDownTime.seconds}}
                </template>
                <template v-if="interactStatus == 1">
                    {{countDownTime.days}}天{{countDownTime.hours}}：{{countDownTime.minutes}}：{{countDownTime.seconds}}
                    后截止
                </template>
                <template v-if="interactStatus == 2">
                    活动已结束
                </template> 
            </div>
        </div>
        <div class="progress">
            <div class="bd">
                <div class="line">
                    <div class="bd" :style="{width: `${progress.percent}%`}">
                        <div class="icon">
                            <img :src="star.portrait" alt="" />
                        </div>
                    </div>
                </div>
                <div class="tip">
                    <ul>
                        <li>
                            <div class="num" ><div v-html="progress.playCount"></div></div>
                            <div class="txt">参与次数</div>
                        </li>
                        <li>
                            <div class="num" ><div v-html="progress.resultCount"></div></div>
                            <div class="txt">接机数</div>
                        </li>
                        <li>
                            <div class="num" ><div v-html="progress.targetCount"></div></div>
                            <div class="txt">目标接机数</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rule">
            <img src="../assets/index-rule.png" alt="" />
        </div>
        <div class="btn" v-if="interactStatus != 0">
            <div class="btn2 timeOver" v-if="interactStatus == 2"></div>
            <div class="btn0 beginPlay" @click="beginPlay" v-if="interactStatus == 1 && play"></div>
            <div class="btn3 tomorrow" v-if="interactStatus == 1 && !play && !isLastDay"></div>
            <div class="btn1 playOver" v-if="interactStatus == 1 && !play && isLastDay" ></div>
        </div>

    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
    import common from '../../../common/common.js';
    import request from '../../../common/request.js';

    let ipAddr = '192.168.1.56';
    let id = common.getUrlParam('id');

    const component = { 
        created (){
            // 获取活动信息

            request.doGet('/router?method=jz.h5.interact.pickup.index', {id, ipAddr}).then((res = {}) => {
                let pickup = res.pickup || {};
                console.log(pickup)
                sessionStorage.pickup = JSON.stringify(pickup);

                //页面标题
                document.title = pickup.title || '活动';

                //倒计时
                let currentTime = new Date().getTime(),
                    startTime = pickup.startTime,
                    endTime = pickup.endTime;

                if(currentTime < startTime){
                    this.interactStatus = 0; //未开始
                    this.downTime(startTime);
                }else if(currentTime >= endTime){
                    this.interactStatus = 2; //已结束
                }else{
                    this.interactStatus = 1; //进行中
                    this.downTime(endTime);
                }
                //是否最后一天
                if(this.interactStatus == 1){
                    if(new Date(endTime).format('yyyy-MM-dd') === new Date(currentTime).format('yyyy-MM-dd')){
                        this.isLastDay = true;
                    }
                }
                //活动进度
                this.progress = {
                    playCount: this.numToSpan(pickup.playCount),
                    resultCount: this.numToSpan(pickup.resultCount),
                    targetCount: this.numToSpan(pickup.targetCount),
                    percent: ''
                }
                let floorNum = Math.floor(pickup.resultCount*100 / pickup.targetCount) + 12;
                this.progress.percent = floorNum > 100 ? 100 : floorNum;

                //明星
                this.star = {
                    starId: pickup.starId,
                    realName: pickup.realName,
                    portrait: pickup.portrait
                }
                
                this.play = pickup.play;//是否可玩
                this.titleImageUrl = pickup.titleImageUrl || '';
                this.descImageUrl = pickup.descImageUrl || '';
                this.startTime = pickup.startTime || '';
                this.endTime = pickup.endTime || '';

            });

            
        },
        data (){
            return {
                interactStatus: '',
                startTime: '',
                endTime: '',
                countDownTime: {},
                isLastDay: false,
                play: '',
                progress: {},
                star: {},
                titleImageUrl: '',
                descImageUrl: '',
            }
        },
        methods: {
            beginPlay (){
                request.doGet('/router?method=jz.h5.interact.pickup.play', {id, ipAddr}).then((res = {}) => { //消耗游戏机会
                    if(res.success){
                        sessionStorage.guide = '1';
                        route.push('plane');
                    }
                });
            },
            downTime (time){
                let leftTime = new Date(time).getTime() - new Date().getTime(); //计算剩余的毫秒数 
                let days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
                let hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
                let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
                let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
                this.countDownTime = {
                    days: days >= 10 ? days : `0${days}`,
                    hours: hours >= 10 ? hours : `0${hours}`,
                    minutes: minutes >= 10 ? minutes : `0${minutes}`,
                    seconds: seconds >= 10 ? seconds : `0${seconds}`
                }
                setTimeout(() => {
                    //倒计时
                    let currentTime = new Date().getTime(),
                        startTime = this.startTime,
                        endTime = this.endTime;

                    if(currentTime < startTime){
                        this.interactStatus = 0; //未开始
                        this.downTime(startTime);
                    }else if(currentTime >= endTime){
                        this.interactStatus = 2; //已结束
                    }else{
                        this.interactStatus = 1; //进行中
                        this.downTime(endTime);
                    }
                    //是否最后一天
                    if(this.interactStatus == 1){
                        if(new Date(endTime).format('yyyy-MM-dd') === new Date(currentTime).format('yyyy-MM-dd')){
                            this.isLastDay = true;
                        }
                    }
                    
                }, 1000);

            },
            numToSpan (number){
                let numStr = number.toString();
                let numStrArr = numStr.split('');
                let spanStrArr = [];
                for(let x in numStrArr){
                    spanStrArr.push(`<span class="num-${numStrArr[x]}"></span>`);
                }
                return spanStrArr.join('');
            }
        }
    };

     export default component;

</script>

<style lang="less" scope>
    .head{
        // height: 18.357143rem;
        position: relative;
        .countDownTime{
            width: 12.428571rem;
            height: 1.571429rem;
            line-height: 1.571429rem;
            border-radius: 1.571429rem;
            border: 0.214286rem solid rgba(103,11,24,0.4);
            position: absolute;
            bottom: 1.142857rem;
            right: 2.9rem;
            color: #fff;
            font-size: 0.928571rem;
            text-align: center;
            box-sizing: content-box;
            font-family: arial;
        }
    }
    .progress{
        background: rgba(232,56,63,1);
        padding: 0 0.928571rem;
        >.bd{
            background: #fff;
            position: relative;
            border-radius: 0.357143rem;
            padding: 1.785714rem;
            padding-top: 2.714286rem;
            padding-bottom: 0.5rem;
            .line{
                height: 0.714286rem;
                background: #ffd1cb;
                border-radius: 0.714286rem;
                position: relative;
                .bd{
                    position: absolute;
                    height: 0.714286rem;
                    background-image: linear-gradient(90deg, #de2841 0%, #ff7866 100%), linear-gradient(#e73850, #e73850);
                    background-blend-mode: normal, normal;
                    border-radius: 0.714286rem;
                    left: 0;
                    top: 0;
                    width: 50%;
                    .icon{
                        position: absolute;
                        right: 0;
                        top: -1rem;
                        width: 2.714286rem;
                        height: 2.714286rem;
                        border: 0.107143rem solid #e73850;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                }
            }
            .tip{
                margin-top: 0.714286rem;
                ul{
                    display: flex;
                    li{
                        flex: 1;
                        text-align: center;
                        position: relative;
                        padding-top: 1.857143rem;
                        .num{
                            height: 1.285714rem;
                            margin-bottom: 0.642857rem;
                            >div{display: inline-block;}
                            >div>span{
                                float: left;
                                width: 0.714286rem;
                                height: 1.285714rem;
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                                margin-right: 0.035714rem;
                            }
                            .num-0{background-image: url('../assets/number/0.png');}
                            .num-1{background-image: url('../assets/number/1.png');}
                            .num-2{background-image: url('../assets/number/2.png');}
                            .num-3{background-image: url('../assets/number/3.png');}
                            .num-4{background-image: url('../assets/number/4.png');}
                            .num-5{background-image: url('../assets/number/5.png');}
                            .num-6{background-image: url('../assets/number/6.png');}
                            .num-7{background-image: url('../assets/number/7.png');}
                            .num-8{background-image: url('../assets/number/8.png');}
                            .num-9{background-image: url('../assets/number/9.png');}
                        }
                        .txt{
                            margin-bottom: 1.285714rem;
                            font-size: 1.071429rem;
                            font-weight: bold;
                            color: #000;
                        }
                    }
                }
            }
        }
    }
    .rule{
        position: relative;
        overflow: hidden;
        height: 45.357143rem;
    }
    .btn{
        padding: 1.785714rem 0;
        background: #ef3237;
        >div{
            width: 25.071429rem;
            height: 3.5rem;
            background-size: 100%;
            margin: 0 auto;
        }
        .btn0{background-image: url('../assets/index-btn0.png');}
        .btn1{background-image: url('../assets/index-btn1.png');}
        .btn2{background-image: url('../assets/index-btn2.png');}
        .btn3{background-image: url('../assets/index-btn3.png');}
    }
</style>