<template>
    <section class="findconfidante">
    	<section class="find-card-component">
	        <div class="find-card-component-bg">
	            <p>看看你是真姐妹还是塑料姐妹花？</p>          
	            <span>你能在以下图中找到WO吗？</span>          
	        </div>
	    </section>
        <section class="findconfidante-center">
            <div class="findconfidante-center-img">
                <div v-for="(item, index) in list" v-bind:data-key="index" v-bind:data-id="item.id" class="share-center-img-covers" @click="showRight">
                    <img  v-bind:src="item.imgurl" />
                    <span v-if="index == showRightIndex" class="share-center-img-covers-right"></span>
                </div>
            </div>
        </section> 
        <Btn class="resets" :title="resetTitle" :backBtn="false" :callback="goToResult"></Btn>
        <img v-if="liderShow"  class="laderPage" src="../assets/sharelider.png" />
    </section>
</template>

<script>

    'use strict';
    import client from '../../../common/client.interactive.js';
    import common from '../../../common/common.js';
    import CardHead from './CardHead.vue';
    import Btn from './Btn.vue';
    import {Config} from './Config.js';

    let ConfigDate  = new Config();


    const component = { 
        components:{
            'CardHead':CardHead,
            'Btn':Btn
        },
        created (){

        	let shareData = {
                type:1,
                title: '考验友情的时刻到了！',
                detail: '真姐妹OR塑料姐妹花，你能在以下图中找到WO吗？',
                url: location.href + '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);

			window._hmt && window._hmt.push(['_trackEvent', 'find', 'click', '寻找闺蜜页面统计次数']) 

			this.liderShow = sessionStorage.getItem("click") == "true"? true : false;

            let number = Math.random();
            let indexs = parseInt(Math.floor(number * 7));
            let imgurldata = {
                id:100,
                imgurl:this.getQueryString('imgurl')
            };
            let dataList = [];

            function xunhuan(){
            	let data = ConfigDate.getConfig();
                let k = -1;
                for(var j = 0; j < dataList.length;j++){
                	if(dataList[j].id == data.id){
						k=1;	
                	}
                }
                if(k!=1){
                	dataList.push(data)
                }else{
                	xunhuan()
                }
            }
            for (var i = 0; i < 8 ; i++){
                if(indexs == i){
                    dataList.push(imgurldata)
                    xunhuan()
                }else{
                	xunhuan()
                }
            };
            //console.log(dataList)
            this.list = dataList; 
        },
        data (){
            return {
                footToast:true,
                dataSrc:"",
                imgShow:false,
                btnTitle:"上传图片",
                resetTitle:"此人就是我的闺蜜",
                confirmTitle:"确定",
                backBtn:"true",
                list:[],
                showRightIndex:-1,
                showRightId:-1,
                clickNum:0,
                liderShow:false

            }
        },
        methods: {
            goToResult (){
            	window._hmt && window._hmt.push(['_trackEvent', 'find', 'click', '寻找闺蜜页面按钮统计次数']) 
            	let _this = this;
                if(_this.showRightId < 0) {
                	common.promptMsg("你还没有选择闺蜜","center")
                }else if(_this.showRightId == 100) {
                	_this.clickNum++
					_this.$router.push("result?clickNum=" + _this.clickNum)
                }else {
                	_this.clickNum++
					if(_this.clickNum == 1){
						common.promptMsg("哪尼！这人不素我","center")
					}else if(_this.clickNum == 2){
						common.promptMsg("苍天啊！你是假闺蜜吧！！！","center")
					}else if(_this.clickNum == 3){
						_this.$router.push("result?clickNum=" + 4)
					}
                }
            },
            cancle (e){
                this.footToast = false;
            },
            show (e){
                e.stopPropagation();
                e.preventDefault();
                this.footToast = true;
            },
            showRight(e){
				//console.log(e.target.parentNode.getAttribute("data-key"))
				this.showRightIndex = e.target.parentNode.getAttribute("data-key");
				this.showRightId = e.target.parentNode.getAttribute("data-id");

            },
            getQueryString(name){
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let parmas = unescape(window.location.hash);
                //console.log(unescape(parmas))
                let lsit = parmas.split("?");
                let nameStr = lsit[1];
                //console.log(unescape(nameStr))
                let r = nameStr.match(reg);
                //console.log(unescape(r[2]))
                //console.log(window.location.hash)
                if(r!=null)return  unescape(r[2]); return null;
            }

        }
    };

     export default component;

</script>

<style>   
    .findconfidante {
        width: 100%;
        height: auto;
        background: #fe7998;
        overflow: scroll;
    }
    .findconfidante-space {
    	width: 100%;
    	height: 55rem;
    }
    .findconfidante-center {
        padding: 0.45rem;
        background: #fff;
        margin: 1.42rem 1.25rem 1.07rem 1.25rem;
        border-radius: 5px;

    }
    .findconfidante-txt {
        position: absolute;
        left: 0;
        top: 27rem;
        padding: 1.5rem 1.3rem;
        font-size: 16px;
        color: #fff;
        text-align: center;
        letter-spacing: 1px;
    }
    .findconfidante-center-img {
        width: 100%;
        height: 25rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap:  wrap;
    }
    .findconfidante-center-img img{
        width: 100%;
        height: 100%;
        -webkit-filter: blur(5px); /* Chrome, Opera */
        -moz-filter: blur(5px);
        -ms-filter: blur(5px);    
        filter: blur(5px);
    }
    .uploadsuc-center-img {
        width: 14.31rem;
        height: 14.31rem;
        margin: 0 auto;
    }
    .uploadsuc-center-img img {
        width: 14.31rem;
        height: 14.31rem;
    }
    .uploadsuc-center-line {
        width: 100%;
        height: 2rem;
        margin-top: 1.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
    }
    .uploadsuc-center-line-space {
        flex:1;
        height: 1px;
        background: #fff;
        margin: 1.1rem;
    }
    .uploadsuc-center-line-txt {
        color:#fff;
        font-size: 12px;
    }
    .foot-toast {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .foot-toast-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #ccb1b7;
        z-index: 10;
    }
    .foot-toast-iphone{
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
        margin-bottom: 0.45rem;
    }
    .foot-toast-cancle {
        width: 100%;
        height: 3.57rem;
        background: #fff;
        text-align: center;
        line-height: 3.57rem;
    }
    .foot-toast-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 3.57rem;
    }
    .foot-toast-input input {
        width: 100%;
        height: 3.57rem;
        opacity: 0;
    }
    .resets {
        margin:2.85rem 0;
    }
    .confirm {
        position: absolute;
        left: 0;
        bottom: 8.85rem;
    }
    .share-center-img-covers {
        width: 7.14rem;
        height: 7.14rem;
        overflow: hidden;
        border-radius: 5px;
        padding: 1px;
        position: relative;
    }
    .share-center-img-covers-right {
    	position: absolute;
    	left:0;
    	top:0;
    	display: block;
    	width: 100%;
    	height: 100%;
    	background: url('../assets/right.png') no-repeat center center;
    	background-size: 1.92rem 1.42rem;
    }
    .laderPage {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fe7998;
    }
    .find-card-component {
        width:100%;
    }
    .find-card-component-bg {
        margin:1.1rem;
        height: 8.5rem;
        padding: 0 1.43rem;
        background: url('../assets/white230.png') no-repeat left top;
        background-size: 100% 100%;
        font-size: 16px;
        color:#f83866;
        display:flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        letter-spacing: 1px;
        flex-direction: column;
    }
    .find-card-component-bg p{
		font-size: 18px;
		color: #333333;
    }
    .find-card-component-bg span{
		font-size: 16px;
		color: #666666;
    }
</style>