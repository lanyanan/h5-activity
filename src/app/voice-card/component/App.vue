<template>
  <div class="wrap" id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  'use strict';
  import router from '../route/route.js';
  import common from '../../../common/common.js';
  import client from '../../../common/client.interactive.js';

  export default {
    created (){
      //设置app按钮分享
      let shareData = {
          type:1,
          title: '鉴音卡——你真的了解你的声音吗？',
          detail: '你了解你的声音吗？快来生成专属你的声鉴卡吧！',
          url: location.href,
          img: 'http://images.9zhitx.com/f189c306-3b9d-4240-8479-08b1bbb8f987.png',
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
