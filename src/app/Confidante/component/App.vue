<template>
  <div class="wrap" id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  'use strict';
  import router from '../route/route.js';
  import client from '../../../common/client.interactive.js';
  import Qinui from '../../../common/qiniu.js';

  export default {
    created (){
      //设置app按钮分享
        let shareData = {
            type:1,
            title: '真闺蜜OR塑料姐妹花鉴定所',
            detail: '能在图中找到闺蜜XXX吗？快来挑战一下吧！',
            url: location.href + '?v=' + new Date().getTime(),
            img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
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
  html,body{height:100%}
  .wrap{height:100%;position: relative;}
  .wrap>section{min-height:100%;position: relative;}

   
</style>
