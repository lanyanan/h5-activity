<template>
    <section class="plane">
        <div class="main active">
            <div class="downtime">{{activeCountTime}}s</div>
            <div class="pickNum">{{activePickNum}}</div>
            <div class="active-plane">
                <img src="../assets/plane.png" class="plane" :style="{left: `${takePlaneLeft}%`}">
                <img src="../assets/fans.png" class="fans" :style="{left: `${takeTrayLeft}px`}" @touchstart="takeTrayTouch">
                <ul class="star-drop">
                    <li class="animate" :type="item.type" :id="item.id" v-for="item in starList" :style="{left: `${item.left}%`}" v-if="item.show">
                        <img :src="item.portrait">
                    </li>
                </ul>
            </div>
        </div>
        <div class="dialog-game-result" v-if="dialogResultShow">
            <div class="rt">
                <div class="t">本轮接机数</div>
                <div class="num">{{activePickNum}}</div>
                <div class="title">恭喜你获得买金吧提供的大奖</div>
                <div class="r">
                    <a href="javascript:;" class="start-game-button" @click="goToMerchantUrl">领奖</a>
                    <div class="btn">
                        <a href="javascript:;" class="back" @click="backTo">返回</a>
                        <a href="javascript:;" class="rank" @click="onceMore" v-if="!interactIsOver && playCount > 0">再来一次</a>
                        <a href="javascript:;" class="rank disabled" v-if="!interactIsOver && playCount == 0 && !isLastDay">明天再玩</a>
                        <a href="javascript:;" class="rank disabled" v-if="!interactIsOver && playCount == 0 && isLastDay" >次数已用完</a>
                        <a href="javascript:;" class="rank disabled" v-if="interactIsOver">活动已结束</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog-ready" v-if="activeReadyShow">
            <img v-if="activeReadyNum == 3" class="ready-down" src="../assets/countdown-3.png">
            <img v-if="activeReadyNum == 2" class="ready-down" src="../assets/countdown-2.png">
            <img v-if="activeReadyNum == 1" class="ready-down" src="../assets/countdown-1.png">
            <img v-if="activeReadyNum == 0" class="ready-down" src="../assets/countdown-0.png">
            <img src="../assets/tip.png" class="tip">
        </div>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route';
    import common from '../../../common/common';
    import client from '../../../common/client.interactive';
    import request from '../../../common/request';

    let ipAddr = '192.168.1.56';
    let id = common.getUrlParam('id');

    const component = { 
        created (){
            // 判断是否从首页进入
            if(!sessionStorage.guide){
                route.replace('guide');
                return
            }

            //页面后退
            route.beforeEach((to, from, next) => {
                console.log(to)
                let that = this;
                if(from.path == '/plane'){
                    if(this.activeCountTime > 0){
                        $.ConfirmBox.defaults = {
                            confirm (){
                                that.activeCountTime = -1;
                                next();
                            },
                            cancle (){} 
                        };
                        $.ConfirmBox({
                            msg: '游戏进行中，离开当前页面，将失去本次机会'
                        });
                    }else{
                        next();
                    }
                    
                }else{
                    next();
                }

              
            });

            //获取存储数据
            this.pickupData = JSON.parse(sessionStorage.pickup || {});
            this.activeCountTime = this.pickupData.gameTime;
            this.dropTime = this.pickupData.intervalTime;
            console.log(this.pickupData)

            //生成头像随机数组
            this.portraitArrFn();
            console.log(this.portraitArr)

            // 准备游戏倒计时
            this.activeReadyDown();
            



        },
        updated (){
            if(this.activeCountTime > 0){
                this.pickup();
            }
           
        },
        // watch:{
        //     $route(){
        //       alert("改变");
        //     }
        // },
        data (){
            return {
                pickupData: {},
                activeReadyShow: true,
                activeReadyNum: 3,
                activeCountTime: '', //游戏时长
                dropTime: '', //头像掉落的时间间隔
                portraitArr: [], //头像随机池
                portraitArrIndex: 0, //头像随机池索引值
                activePickNum: 0,
                takePlaneLeft: 35,
                takeTrayLeft: '',
                starList: [],
                dialogResultShow: false,
                interactIsOver: false,
                isLastDay: false,
                playCount: ''
            }
        },
        methods: {
            portraitArrFn (){ //生成头像随机数组
                let starPortrait = this.pickupData.portrait || '';
                let merchantLogo = this.pickupData.merchantLogo || '';
                let portraitArr = [];
                let portraitArrLen = parseInt(this.activeCountTime*1000 / this.dropTime);
                for(let x = 0; x < portraitArrLen; x++){
                    let obj = {
                        type: 0, //0明星头像, 1商家头像
                        portrait: starPortrait
                    }
                    portraitArr.push(obj);
                }
                for(let x = 0; x < 5; x++){
                    let index = common.getRandomIntInclusive(0, portraitArrLen-1);
                    portraitArr[index].type = 1;
                    portraitArr[index].portrait = merchantLogo;
                }
                this.portraitArr = portraitArr;
            },
            activeReadyDown (){
                setTimeout(() => {
                    if(this.activeReadyNum == 0){
                        this.activeReadyShow = false;
                        this.downtime();
                        this.takePlaneMove();
                    }
                    this.activeReadyNum --;
                    this.activeReadyDown();
                }, 1000);
            },
            downtime (){
                if(this.activeCountTime == -1) return;
                setTimeout(() => {
                    this.activeCountTime --;
                    if(this.activeCountTime > 0){
                        this.downtime(); 
                    }
                    else if(this.activeCountTime == 0){

                        //上报分数
                        let queryData = {
                            id: id,
                            ipAddr: ipAddr,
                            score: this.activePickNum,
                        };
                        request.doGet('/router?method=jz.h5.interact.pickup.result', queryData).then((res = {}) => {
                            //同时获取当天剩余次数
                            this.playCount = res.playCount;
                            //活动是否结束
                            let currentTime = new Date().getTime(),
                                endTime = this.pickupData.endTime;
                            if(currentTime >= endTime){
                                this.interactIsOver = true;
                            }
                            //是否最后一天
                            if(new Date(endTime).format('yyyy-MM-dd') === new Date(currentTime).format('yyyy-MM-dd')){
                                this.isLastDay = true;
                            }
                            //游戏结束弹窗出现
                            setTimeout(() => {
                                this.dialogResultShow = true;
                            }, 1000);
                            
                        });
                        
                    }
                }, 1000);
            },
            takePlaneMove (){
                setTimeout(() => {
                    let percent = common.getRandomIntInclusive(0, 70);
                    this.takePlaneLeft = percent;
                    setTimeout(() => {
                        let starObj = {
                            type: this.portraitArr[this.portraitArrIndex].type,
                            portrait: this.portraitArr[this.portraitArrIndex].portrait,
                            left: this.takePlaneLeft + 6,
                            id: new Date().getTime(),
                            show: true
                        };
                        this.starList.push(starObj);
                        this.portraitArrIndex ++;
                    }, 300);
                    
                    if(this.activeCountTime > 0){
                        this.takePlaneMove();
                    }

                }, this.dropTime);
            },
            pickup (){

                let liArr = $('.active .star-drop li');
                liArr.each((index, ele) => {
                    // let liLeft = parseInt($(ele).css('left'));
                    let liLeft = ele.offsetLeft;
                    // let liBottom = parseInt($(ele).css('bottom'));
                    let liBottom = parseInt($(document).height()) - ele.offsetTop;
                    // let liWidth = parseInt($(ele).css('width'));
                    let liWidth = 57;
                    
                    let fansWidth = parseInt($('.fans').eq(0).width());
                    let fansHeight = parseInt($('.fans').eq(0).height()); 
                    let takeTrayLeft = this.takeTrayLeft;
                    //alert(liBottom, liLeft, liWidth);
                    //alert(fansWidth, fansHeight, takeTrayLeft);
                    //alert(liBottom, fansHeight, takeTrayLeft, liLeft, liWidth, fansWidth)
                    //接到明星
                    if(liBottom > 0 && liBottom <= fansHeight && takeTrayLeft <= (liLeft + liWidth) && takeTrayLeft >= (liLeft - fansWidth)){
                        //计分
                        //alert('ddd')

                        if($(ele).attr('type') == 1){
                            this.activePickNum += 2;
                        }else{
                            this.activePickNum ++;
                        }
                        //移除
                        for(let x in this.starList){
                            if(this.starList[x].id == $(ele).attr('id')){
                                this.starList[x].show = false;
                            }
                        }
                    }
                });
            },
            takeTrayTouch (e){
                e.preventDefault();
                document.querySelector('.fans').addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    let fansWidth = parseInt($('.fans').width());
                    let left = e.touches[0].clientX - fansWidth/2;
                    let maxLeft = parseInt($(document).width()) - fansWidth;
                    if(left > 0 && left < maxLeft){
                        this.takeTrayLeft = left;
                    }
                });
            },
            goToMerchantUrl (){
                location.replace(this.pickupData.merchantUrl);
            },
            backTo (){
                route.replace('guide');
            },
            onceMore (){
                request.doGet('/router?method=jz.h5.interact.pickup.play', {id, ipAddr}).then((res = {}) => { //消耗游戏机会
                    // if(res.success){
                        this.dialogResultShow = false;
                        this.activePickNum = 0;
                        this.activeReadyShow = true;
                        this.activeReadyNum = 3;
                        this.activeCountTime = this.pickupData.gameTime;
                        this.portraitArrIndex = 0;
                        this.portraitArrFn();
                        this.activeReadyDown();
                        
                        
                    // }
                });
                
            }
        }
    };

     export default component;

</script>

<style lang="less" scope>
    section{position: absolute;top:0;width:100%;}
    .main{position: absolute;left: 0;right: 0;top: 0;bottom: 0;overflow: hidden;}
    .downtime, .list, .pickNum{box-sizing: content-box;}
    .ready-down{width: auto;height:auto;}
    .active .downtime{font-size: 1.571429rem;color:#000;}
    .active .pickNum{position: absolute;top: 18px;border: 3px solid rgba(209,49,49,1);background: rgba(255,96,96,1);border-radius: 6px;right: 15px;width: 66px;height: 38px;display: -webkit-box;-webkit-box-pack: center;-webkit-box-align: center;z-index: 12;font-size: 1.571429rem;color:#fff;}
    .active .active-plane .plane{
        top: 5.285714rem;
        left: 10rem;
        -webkit-transition: all .3s;
    }
    @-webkit-keyframes star-animate {
        0%{top: 8.5rem;}
        20%{top: 28%;}
        40%{top: 46%;}
        60%{top: 64%;}
        80%{top: 82%;}
        100%{top: 100%;}
    }
    .active .star-drop li{top: -100%;}
    .active .star-drop li.animate{-webkit-animation: star-animate 1s linear;}
    .active .star-drop li>img{display: inline-block;}
    .active .fans{width: 92px;height: 110px;}
    .dialog-game-result{text-align: center;}
    .dialog-game-result .btn{background: none;}
    .dialog-game-result .btn a{display: block;}
    .dialog-game-result .btn .disabled{
        background-image: url(../assets/dialog-disabled-button.png);
    }
    .dialog-game-result .num{font-size: 2.857143rem;color:#000;margin-top: 3.214286rem;font-weight: bold;}
    .dialog-game-result .title{font-size: 1.071429rem;color:#000;margin-bottom: 4.0rem;}
</style>