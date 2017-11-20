<template>
    <section class="guide">
        <div class="title"></div>
        <div class="txt">
            <p>那个战火纷飞的年代，大批平民在战乱中沦为奴隶</p>
            <p>命如草芥。一个特立独行的女奴楚乔，演绎了一个</p>
            <p>关于爱情，关于信仰，关于家国的热血故事•••</p>  
        </div>
        <div class="btn" v-on:click="goToRole">立即进入</div> 
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
    import common from '../../../common/common.js';

    const component = { 
        created (){
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
            goToRole (){
                window._hmt && window._hmt.push(['_trackEvent', 'chuqiao_goToRole', 'click', '点击选择角色进入的次数']);
                
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    return
                }
                sessionStorage.guide = '1';
                route.push('role');
                
            }
        },
        mounted (){

            
            $('.txt>p').eq(0).slideDown(1000);

            let timer1 = setTimeout(() => {
                $('.txt>p').eq(1).slideDown(1000);
            }, 1000);

            let timer2 = setTimeout(() => {
                $('.txt>p').eq(2).slideDown(1000);
            }, 2000);


        }
    };

     export default component;

</script>

<style>
    .guide{background:url('../assets/guide-bg.png') no-repeat center top;background-size: 100%;overflow: hidden;}
    .guide .title{width: 23.678571rem;height: 9.464286rem;background: url('../assets/guide-title.png') no-repeat;background-size: 100% 100%;margin: 11.928571rem auto 2.142857rem auto;}
    .guide .txt{padding: 0 0.785714rem;font-size: 1.0rem;color: #c79818;line-height: 1.714286rem;text-align: center;}
    .guide .txt>p{display: none;}
    .guide .btn{width:14.285714rem;height:3.928571rem;background:url('../assets/guide-btn.png') no-repeat;background-size:100% 100%;position: absolute;bottom:1.857143rem;left:50%;margin-left:-7.142857rem;font-size: 1.285714rem;color:#000;line-height: 3.928571rem;text-align: center;}
    
</style>