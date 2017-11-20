<template>
  <div class="wrap" id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  'use strict';
  import router from '../route/route.js';
  import common from '../../../common/common.js';
  import '../../../common/common.css';
  import '../plane.css';
  import client from '../../../common/client.interactive.js';

  export default {
    created (){
      //设置app按钮分享
      let shareData = {
          type:1,
          title: '易烊千玺十七岁生日应援大作战',
          detail: '牙牙关注携手金呗，邀请千纸鹤们给易烊千玺17岁生日应援助力！',
          url: location.href.split('#')[0],
          img: 'http://images.9zhitx.com/f40d5a82-e6b2-4df7-8b66-815225214719.png',
          nativeShareBtn: 1
      }
      client.clientShareOut(shareData);
    },
    data (){
        return {

        }
    },
    methods: {

    },
    router
  }

</script>

<style>
  html,body{height:100%;}
  .wrap{min-height: 100%;position: relative;}
  .wrap section{min-height:100%;}
</style>
