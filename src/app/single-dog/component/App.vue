<template>
  <div class="wrap" id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  'use strict';
  import router from '../route/route.js';
  import client from '../../../common/client.interactive.js';

  export default {
    created (){
      //设置app按钮分享
        let shareData = {
            type:1,
            title: '测测你属于哪一种单身狗',
            detail: '好心塞 | 据说现在单身狗都分种类了，看看你属于哪一种？',
            url: location.href + '?v=' + new Date().getTime(),
            img: 'http://images.9zhitx.com/eb5f30dc-ceec-4043-b6e0-52e1f46b8212.png',
            nativeShareBtn: 1
        }
        client.clientShareOut(shareData);
    },
    data (){
        return {}
    },
    methods: {
     
    },
    router
  }

</script>

<style>
  html,body{height:100%;}
  .wrap{height:100%;position: relative;}
  .wrap>section{min-height:100%;position: relative;}

   
</style>
