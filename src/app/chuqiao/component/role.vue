<template>
    <section class="role">
        <div class="title"></div>
        <div class="bd" @click="goToAnswer">
            <ul>
                <li data-role="0"><img src="../assets/role-bg1.png" alt="" /></li>
                <li data-role="1"><img src="../assets/role-bg2.png" alt="" /></li>
                <li data-role="2"><img src="../assets/role-bg3.png" alt="" /></li>
            </ul>
        </div>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import common from '../../../common/common.js';
    import client from '../../../common/client.interactive.js';

    const component = { 
        created (){
            // 判断是否从首页进入
            if(!sessionStorage.guide){
                route.replace('guide');
                return
            }
            setTimeout(() => {
                // 切换音乐
                let bgmSrc = 'http://video.9zhitx.com/b5669d42-be9f-4c06-9faa-5937536425d5.mp3';
                let isPaused = $('#musicId')[0].paused;
                if($('#musicId').attr('src') != bgmSrc){
                    $('#musicId').removeAttr('src').attr('src', bgmSrc);
                    if(isPaused){
                        $('#musicId')[0].pause();
                    }
                }
            });
            
        },
        methods: {
            goToAnswer (e){
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_goToAnswer', 'click', '点击进入答题页的次数']);
                
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    return
                }
                let role = e.target.parentNode.dataset.role;
                console.log(role)
                route.replace({
                    path: 'answer', 
                    query: {
                        role: role
                    }
                });

            }
        }
    };

     export default component;

</script>

<style>
    .role{background: #080606;overflow: hidden;}
    .role .title{width:24.642857rem;height:3rem;background: url('../assets/role-title.png') no-repeat;background-size: 100%;margin: 1.428571rem auto 1.071429rem auto;}
    .role .bd>ul>li{width:25.285714rem;height:12.071429rem;overflow: hidden;margin-bottom: 0.142857rem;text-align: center;margin-left: auto;margin-right: auto;}
    .role .bd>ul>li>img{width:100%;}
</style>