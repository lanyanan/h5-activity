<template>
  <div class="wrap">
    <router-view></router-view>
  </div>
</template>

<script>
    'use strict';
    import router from '../route/route.js';
    import client from '../../../common/client.interactive.js';

    export default {
        created() {
            //设置app按钮分享
            let shareData = {
                type:1,
                title: 'Happy Halloween你想装扮成谁',
                detail: '万圣节装扮大猜想！选出你最想装扮的角色，看看你的基友能否猜出来吧！',
                url: location.href + '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171023/24a351b4-507c-409b-915d-c4f773e11a4f6960.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);
        },
        data() {
            return {}
        },
        methods: {

        },
        router
    }

</script>

<style>
  .wrap{
    width:100%;
    height:100%
  }
</style>
