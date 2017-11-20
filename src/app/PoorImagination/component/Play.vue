<template>
    <section class="play-out">
        <section id="play" :style="{left:playPageLeft}" class="play">
            <div class="play-top">
                <div class="play-top-item" v-for="it in list">
                    <TitleTxt  :ite="JSON.stringify(it)" v-if="it.componentMark==1"></TitleTxt>
                    <Radio :ite="JSON.stringify(it)" :callback="addSelect" v-if="it.componentMark==2" ></Radio>
                    <Card :ite="JSON.stringify(it)" :callback="addSelect" v-if="it.componentMark==3" ></Card>
                    <Checkbox :ite="JSON.stringify(it)" :submit = "computePoints" :callback="addSelect" v-if="it.componentMark==4"></Checkbox>
                </div>
            </div>
            <div class="play-wall">
                <div class="play-wall-one">
                    <div class="play-wall-left"></div>
                    <div class="play-wall-left-t"></div>
                    <div class="play-wall-center"></div>
                    <div class="play-wall-right-t"></div>
                    <div class="play-wall-right"></div>
                </div>
                <div class="play-wall-two">
                    <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-one">
                    <div class="play-wall-left"></div>
                    <div class="play-wall-left-t"></div>
                    <div class="play-wall-center"></div>
                    <div class="play-wall-right-t"></div>
                    <div class="play-wall-right"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-one">
                    <div class="play-wall-left"></div>
                    <div class="play-wall-left-t"></div>
                    <div class="play-wall-center"></div>
                    <div class="play-wall-right-t"></div>
                    <div class="play-wall-right"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
                <div class="play-wall-two">
                   <div class="play-wall-top">
                        <div :class="moneyClass"></div>
                    </div>
                    <div class="play-wall-bottom"></div>
                </div>
            </div>
            <img v-bind:class="playRun" src="../libs/runs.gif" alt="">
        </section>
        <div @touchstart="tipscancle" v-if="tipsKey==0" class="tips-area">
            <img class="tips" src="../libs/tips.png" alt="">
        </div>
        <div v-if="confirmTips" @touchstart="stopDefault" class="confirm-area">
            <div class="confirm-area-center">
                <p>你还有题目未答完，确认提交吗？</p>
                <div class="confirm-area-center-btn">
                    <div class="confirm-area-center-btn-left"><span @touchstart="cancleConfirm">取消</span></div>
                    <div class="confirm-area-center-btn-right"><span @touchstart="confirmPoint">提前交卷</span></div>
                </div>
            </div>
        </div> 
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import TitleTxt from './TitleTxt.vue';
    import Radio from './Radio.vue';
    import Card from './Card.vue';
    import Checkbox from './Checkbox.vue';
    import Data from '../data/index.js';

    const component = { 
        components:{
            'TitleTxt':TitleTxt,
            'Radio':Radio,
            'Card':Card,
            'Checkbox':Checkbox
        },
        created (){
                
        },
        mounted (){
            window._hmt && window._hmt.push(['_trackEvent', 'play', 'playPage', '限制想象力玩游戏页面打开统计次数']);
            if (sessionStorage.getItem("shareOption")!="true"){
                this.$router.push("home")
            };
            let dom = document.getElementById("play");
            let FontSize = document.getElementsByTagName("html");
            this.htmlFontSize = window.getComputedStyle(FontSize[0]).fontSize;
            this.addEvent(dom);         
        },
        data (){
            return {
                show:true,
                pageX: 0,
                pageY: 0,
                moveY: 0,
                ds: 0,
                playPageLeft:0,
                playPageStartLeft:0,
                htmlFontSize:0,
                playRun:'play-run',
                moneyClass:'',
                screenKey:1,
                list:Data,
                selectDataArr:[],
                tipsKey:-1,
                confirmTips:false,
                confirmResult:false
            }
        },
        methods: {
            stopDefault(e){
                e.preventDefault();
                e.stopPropagation();
            },
            goToplay (){
                
            },
            confirmPoint (){
                this.confirmResult = true;
                this.computePoints();
            },
            cancleConfirm (e){
                e.preventDefault();
                e.stopPropagation();
                this.confirmTips = false
            },
            tipscancle (e){
                e.preventDefault();
                e.stopPropagation();
                this.tipsKey++;
            },
            addSelect (item,isadd){
                this.tipsKey++;
                if(isadd){
                    this.selectDataArr.push(item);
                }else{
                    for (var i = 0; i<= this.selectDataArr.length; i++) {
                        if(this.selectDataArr[i].pointId == item.pointId){
                            this.selectDataArr.splice(i,1);
                            return;
                        }
                    }
                }
            },
            computePoints (){
                let pointKey = 0;
                let points = 0;
                let checkArr = [];
                let checkOne = [];
                let checkTwo = [];
                let checkThree = [];
                for(var i = 0; i < this.selectDataArr.length; i++){
                    if(this.selectDataArr[i].pointId<22){
                        points = points + this.selectDataArr[i].points
                        checkArr.push(this.selectDataArr[i].points)
                    }
                    else if(22<=this.selectDataArr[i].pointId&&this.selectDataArr[i].pointId<=25){
                        checkOne.push(this.selectDataArr[i].points)
                    }
                    else if(26<=this.selectDataArr[i].pointId&&this.selectDataArr[i].pointId<=29){
                        checkTwo.push(this.selectDataArr[i].points)
                    }
                    else if(30<=this.selectDataArr[i].pointId&&this.selectDataArr[i].pointId<=33){
                        checkThree.push(this.selectDataArr[i].points)
                    }
                }

                points = points + this.getPoints(checkOne) + this.getPoints(checkTwo) + this.getPoints(checkThree);
                if(18<=points&&points<=26){
                    pointKey = 0
                }
                else if(27<=points&&points<=38){
                    pointKey = 1
                }
                else if(39<=points&&points<=50){
                    pointKey = 2
                }
                else if(51<=points&&points<=58){
                    pointKey = 3
                }
                else if(59<=points){
                    pointKey = 4
                }
                if(checkArr.length < 6 || checkOne.length < 1 || checkTwo.length < 1 || checkThree.length < 1){
                    this.confirmTips = true;
                }else{
                    this.$router.push("result?pointKey="+pointKey+"&points="+points)
                }
                if(this.confirmResult){this.$router.push("result?pointKey="+pointKey+"&points="+points)}
                
            },
            getPoints(arr){
                if(arr.length == 4){
                    return 8;
                }else if(arr.length == 0){
                    return 0;
                }else{
                    return arr.sort(this.sortNumber)[arr.length-1];
                }
            },
            sortNumber(a,b){
                return a - b
            },
            addEvent(dom){
                //滑动距离
                let _this = this;
               dom.addEventListener("touchstart",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    let touch = e.touches[0];
                    _this.pageX = touch.pageX;
                    _this.pageY = touch.pageY;
                    _this.playPageStartLeft = parseInt(dom.style.left);
                    
                    
                });
                dom.addEventListener("touchmove",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    let touch = e.touches[0];
                    _this.moveX = touch.pageX;
                    _this.moveY = touch.pageY;
                    _this.ds = (touch.pageX - _this.pageX);
                    if((parseInt(_this.playPageStartLeft) + parseInt(_this.ds))<0&&-(parseInt(_this.playPageStartLeft) + parseInt(_this.ds))<=(screen.width*11)){
                        _this.playPageLeft = (parseInt(_this.playPageStartLeft) + parseInt(_this.ds)) + "px";
                        if(0<(-parseInt(_this.playPageLeft))&& (-parseInt(_this.playPageLeft))<= (11.54*parseInt(_this.htmlFontSize))){
                            _this.playRun = 'play-run';
                            _this.moneyClass = '';
                        }
                        else if((11.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<=(screen.width + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun = 'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top'
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*2 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*2 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*2 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*2 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*3 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*3 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*3 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*3 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*4 - 9.72*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*3 - 9.72*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*4 + 11.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*4 + 11.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*5 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*5 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*5 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*5 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*6 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*6 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*6 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*6 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*7 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*7 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*7 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*7 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*8 - 9.72*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*8 - 9.72*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*8 + 11.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*8 + 11.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*9 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*9 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*9 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*9 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*10 + 0*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*10 + 0*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*10 + 2.54*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                        else if((screen.width*10 + 2.54*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*11 - 2*parseInt(_this.htmlFontSize))){
                            _this.playRun =  'play-run-bottom';
                            _this.moneyClass = '';
                        }
                        else if((screen.width*11 - 2*parseInt(_this.htmlFontSize))<-parseInt(_this.playPageLeft)&& (-parseInt(_this.playPageLeft))<= (screen.width*11)){
                            _this.playRun =  'play-run-top';
                            _this.moneyClass = 'money';
                        }
                    }
                   
                })
                dom.addEventListener("touchend",function(){
                    // _this.ds = (_this.moveX - _this.pageX);
                    // if((parseInt(_this.playPageStartLeft) + parseInt(_this.ds))<0&&-(parseInt(_this.playPageStartLeft) + parseInt(_this.ds))<=(screen.width*9)){
                    //     _this.playPageLeft = (parseInt(_this.playPageStartLeft) + parseInt(_this.ds)) + "px";
                    //     _this.playPageStartLeft = (parseInt(_this.playPageStartLeft) + parseInt(_this.ds))/parseInt(_this.htmlFontSize);
                    // }

                    // console.log(_this.playPageLeft);
                })



            }
        }
    };

     export default component;

</script>

<style>
    @keyframes toTop
    {
        0% {bottom:5.61rem;}
        50% {bottom:7.21rem;}
        100% {bottom:5.61rem;}
    }

    @-moz-keyframes toTop /* Firefox */
    {
        0% {bottom:5.61rem;}
        50% {bottom:7.21rem;}
        100% {bottom:5.61rem;}
    }

    @-webkit-keyframes toTop /* Safari 和 Chrome */
    {
        0% {bottom:5.61rem;}
        50% {bottom:7.21rem;}
        100% {bottom:5.61rem;}
    }

    @-o-keyframes toTop /* Opera */
    {
        0% {bottom:5.61rem;}
        50% {bottom:7.21rem;}
        100% {bottom:5.61rem;}
    }
    @keyframes moneyToTop
    {
        0% {top:-1rem;opacity: 0.8}
        50% {top:-5rem;opacity: 1}
        100% {top:-3rem;opacity: 0}
    }

    @-moz-keyframes moneyToTop /* Firefox */
    {
          0% {top:-1rem;opacity: 0.8}
        50% {top:-5rem;opacity: 1}
        100% {top:-3rem;opacity: 0}
    }

    @-webkit-keyframes moneyToTop /* Safari 和 Chrome */
    {
          0% {top:-1rem;opacity: 0.8}
        50% {top:-5rem;opacity: 1}
        100% {top:-3rem;opacity: 0}
    }

    @-o-keyframes moneyToTop /* Opera */
    {
          0% {top:-1rem;opacity: 0.8}
        50% {top:-5rem;opacity: 1}
        100% {top:-3rem;opacity: 0}
    }
    .play-out {
        width: 100%;
        height: 100%;
        background: url('../libs/bg.png') repeat left;
        background-size: 100% 100%;
        opacity: 1;
        background-color: #fdc80a;  
    }  
    .play {
        position: absolute;
        left:0;
        top:0;
        width: 1200%;
        height: 100%;
    }
    .play-top {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: -webkit-flex; /* Safari */
        display: flex;
        z-index: 9;
    }
    .play-top-item {
        float: left;
        -webkit-flex-grow:1;
        -webkit-flex-shrink:1;
        -webkit-flex-basis:0%;
        height:100%;
    }
    .play-run {
        position: fixed;
        left: 12rem;
        bottom: 14.27rem;
        width: 2rem;
        height: 3rem;
    }
    .play-run-bottom {
        position: fixed;
        left: 12rem;
        bottom: 5.61rem;
        width: 2rem;
        height: 3rem;
    }
    .play-run-top {
        position: fixed;
        left: 12rem;
        bottom: 5.61rem;
        width: 2rem;
        height: 3rem;
        animation: toTop 0.5s 1;
        -webkit-animation: toTop 0.5s 1;
    }
    .money {
        width: 1.78rem;
        height: 2.14rem;
        position: absolute;
        left: 2.34rem;
        top:-2.14rem;
        opacity: 0;
        background:url('../libs/money.png') no-repeat left top;
        background-size: 1.78rem 2.14rem;
        animation: moneyToTop 0.5s 0.5s 1;
        -webkit-animation: moneyToTop 0.5s 0.5s 1;
    }
    .play-wall {
        width: 100%;
        height: 10.7rem;
        position: absolute;
        left: 0;
        bottom: 3.57rem;
        display: flex;
        z-index:0;
    }
    .play-wall img{
        position: absolute;
        left:12rem;
        top: -4rem;
        width: 3rem;
        height: 4rem;
    }
    .play-wall-one {
        width: 10%;
        height: 10.7rem;
        float: left;
        position: relative;
    }
    .play-wall-two {
        width: 10%;
        height: 10.7rem;
        float: left;
        position: relative;
    }
    .play-wall-left {
        width: 4.28rem;
        height: 2.14rem;
        position: absolute;
        left:0;
        bottom: 0;
        background: url('../libs/wall.png') repeat left top;
        background-size: 2.14rem 2.14rem;
    }
    .play-wall-left-t {
        width: 2.14rem;
        height: 10.7rem;
        position: absolute;
        left:4.28rem;
        bottom: 0;
        background: url('../libs/wall.png') repeat left top;
        background-size: 2.14rem 2.14rem;
    }
    .play-wall-center {
        width: 14.98rem;
        height: 2.14rem;
        position: absolute;
        left:6.42rem;
        top: 0;
        background: url('../libs/wall.png') repeat left top;
        background-size: 2.14rem 2.14rem;
    }
    .play-wall-right-t {
        width: 2.14rem;
        height: 10.7rem;
        position: absolute;
        left:21.4rem;
        top: 0;
        background: url('../libs/wall.png') repeat left top;
        background-size: 2.14rem 2.14rem;
    }
    .play-wall-right {
        width: 4.28rem;
        height: 2.14rem;
        position: absolute;
        left:23.54rem;
        bottom: 0;
        background: url('../libs/wall.png') repeat left top;
        background-size: 2.14rem 2.14rem;
    }
    .play-wall-top {
        width: 6.42rem;
        height: 2.14rem;
        position: absolute;
        left:10.3rem;
        top: 2.14rem;
        background: url('../libs/wen.png') no-repeat left top;
        background-size: 6.42rem 2.14rem;
    }
    .play-wall-bottom {
        width: 100%;
        height: 2.14rem;
        position: absolute;
        left:0;
        bottom: 0;
        background: url('../libs/wall.png') repeat left top;
        background-size: 2.14rem 2.14rem;
    }
    
    .tips-area {
        width: 100%;
        height: 100%;
        position:fixed;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
    .tips {
       width: 80%;
       height: auto;
       margin:10rem auto 0;
    }
    .confirm-area {
        width: 100%;
        height: 100%;
        position:fixed;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
    .confirm-area-center {
        margin:0 auto;
        width: 22rem;
        max-width: 500px;
        height: 10rem;
        margin-top: 12rem;
        border-radius: 10px;
        background: #fff;
    }
    .confirm-area-center p{
        font-family: "hoverTreeFont";
        line-height: 2rem;
        width: 100%;
        text-align: center;
        padding-top: 2rem;
        margin-bottom: 1rem;
        font-size: 16px;
    }
    .confirm-area-center-btn{
        width: 100%;
        height: 2rem;
        margin-top: 2rem;
    }
    .confirm-area-center-btn div{
        width: 50%;
        height: 2rem;
        float: left;
        text-align: center;
    }
    .confirm-area-center-btn div span{
        display: inline-block;
        width:8rem;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        background: #000;
        border-radius: 5px;
        color: #fdc80a;
        font-family: "hoverTreeFont";
    }
</style>