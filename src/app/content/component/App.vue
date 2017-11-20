<template>
  <div class="wrap" id="app">
    <router-view></router-view>
    <div class="bgm" :class="backgroundMusic.animation ? 'animation' : ''" v-if="backgroundMusic.hasMusic" @click="toggleMusic">
        <audio id="musicId" ref= "music" :src="backgroundMusic.src" autoPlay="autoPlay" loop="loop"></audio>
    </div>
  </div>
</template>

<script>

  'use strict';
  import common from '../../../common/common.js';
  import request from '../../../common/request.js';
  import router from '../route/route.js';
  import client from '../../../common/client.interactive.js';
  
  let activeId = common.getUrlParam('id');

  export default {

    data () {
      return {
        appbgc: '',//背景色
        backgroundMusic: {}//背景音乐
      }
    },
    methods:{
      toggleMusic (e){
        let audio = this.$refs.music;
        if(audio.paused){
          audio.play();
          this.backgroundMusic.animation = true;
        }else{
          audio.pause();
          this.backgroundMusic.animation = false;
        } 
      }
    },
    created (){
      let that = this;
      request.doGet('/router?method=jz.h5.interact.hot.index', {id: activeId}).then(function(res){
        let resObj = res.obj;
        //活动页面标题
        document.title = resObj.title;
        that.appbgc = resObj.backgroundColor || '#fff';
        that.backgroundMusic = {
          hasMusic: !!resObj.backgroundMusicUrl,
          src: resObj.backgroundMusicUrl,
          animation: true

        };
        //设置app按钮分享
        let shareData = {
            type:1,
            title: resObj.shareTitle,
            detail: resObj.shareContent,
            url: location.href + '?v='+(+new Date()),
            img: resObj.shareImage,
            nativeShareBtn: 1
        }
        client.clientShareOut(shareData);

      });
    },
    mounted (){

    },
    router

  }

  // 安卓客户端调用方法(自动播放音乐)
  window.loadOnce = function(){
    setTimeout(function(){
      document.getElementById('musicId').play();
    }, 1000)
  }
  // ios微信浏览器自动播放
  setTimeout(function(){
    wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function() {
        document.getElementById('musicId').play();
    });
  });

</script>

<style>
  html,body{height:100%;}
  .wrap{height:100%;position: relative;}
  .wrap .bgm{position: absolute;top: 0.714286rem;right:0.714286rem;width:2.142857rem;height:2.142857rem;background:url('../assets/bgm.png') no-repeat;background-size: 100%;z-index: 99;}
  .wrap .bgm.animation{animation: bgm-animation 2s infinite linear;-webkit-animation: bgm-animation 2s infinite linear;}
  @-webkit-keyframes bgm-animation {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes bgm-animation {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
  }
  .wrap>section{position: absolute;top:0;left:0;right:0;bottom:0;}
</style>
