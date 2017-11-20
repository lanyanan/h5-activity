<template>
  <div class="wrap" id="app">
    <router-view></router-view>
    <div class="bgm" :class="bgmAnimation ? 'animation' : ''" @click="toggleMusic">
        <audio id= "musicId" ref= "music" :src="bgmSrc" autoPlay loop></audio>
    </div>
  </div>
</template>

<script>

  'use strict';
  import router from '../route/route.js';

  export default {
    data (){
        return {
            bgmAnimation: true,
            bgmSrc: 'http://video.9zhitx.com/b5669d42-be9f-4c06-9faa-5937536425d5.mp3'
        }
    },
    methods: {
      toggleMusic (e){
        window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_toggleMusic', 'click', '切换音乐的次数']);
        let audio = this.$refs.music;
        if(audio.paused){
          audio.play();
          this.bgmAnimation = true;
        }else{
          audio.pause();
          this.bgmAnimation = false;
        } 
      }
    },
    router
  }

</script>

<style>
  html,body{height:100%;}
  .wrap{height:100%;position: relative;}
  .wrap>section{min-height:100%;position: relative;}

    /*背景音乐*/
  .wrap .bgm{position: absolute;top: 0.857143rem;right:0.857143rem;width:2.142857rem;height:2.142857rem;background:url('../assets/bgm.png') no-repeat;background-size: 100%;}
  .wrap .bgm.animation{animation: bgm-animation 2s infinite linear;-webkit-animation: bgm-animation 2s infinite linear;}
  @-webkit-keyframes bgm-animation {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes bgm-animation {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
  }
</style>
