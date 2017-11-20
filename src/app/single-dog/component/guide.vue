<template>
    <section class="guide">
        <img src="../assets/topic.png" class="topic" />
        <div class="bd">
            <div class="ipt">
                <input type="text" placeholder="请输入你的姓名" v-model="userName"/>
            </div>
            <div class="btn" @click="goToResult"></div>
        </div>   
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import client from '../../../common/client.interactive.js';
    import common from '../../../common/common.js';

    const component = { 
        created (){
            
            
            
            
        },
        data (){
            return {
                userName: ''
            }
        },
        methods: {
            goToResult (){
                // 校验
                let userName = this.userName.replace(/\s+/ig,'');
                if(!userName){
                    common.promptMsg('请输入你的姓名查询', 'center');
                    return
                }else{
                    let reg = /^[a-zA-Z\u4e00-\u9fa5]{1,7}$/;
                    if(!reg.test(userName)){
                        common.promptMsg('姓名最多只能输入7个汉字和字母', 'center');
                        return
                    }
                }
                // 本地存储用户输入的姓名
                let nameRecord = localStorage.nameRecord ? JSON.parse(localStorage.nameRecord) : {};
                nameRecord[userName] = nameRecord[userName] || '';
                localStorage.nameRecord = JSON.stringify(nameRecord);
                localStorage.userName = userName;

                window._hmt && window._hmt.push(['_trackEvent', 'dog_goToResult', 'click', '点击查询结果的次数']);
                
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    return
                }
                sessionStorage.guide = '1';
                route.push('result');
                
            }
        }
    };

     export default component;

</script>

<style>
    .guide{background:url('../assets/section-bg.png') no-repeat center top;background-size: 100% 100%;overflow: hidden;}
    .guide .topic{margin-top: 1rem;}
    .guide .bd{width:100%;height:29.785714rem;background: url('../assets/dog.png') no-repeat center center;position: absolute;bottom:0;left:0;background-size: 100% 100%;padding-top: 18rem;}
    .guide .ipt, .guide .btn{margin-left: auto;margin-right: auto;}
    .guide .ipt{width:11.428571rem;height:2.571429rem;border-radius: 2.571429rem;border: 1px solid #1e51c6;text-align: center;}
    .guide .ipt>input{width:7.571429rem;height:2.571429rem;font-size: 1.071429rem;text-align: center;color:#1e51c6;}
    ::-webkit-input-placeholder { color:#1e51c6;}
    .guide .btn{width:12.285714rem;height:3.571429rem;background: url('../assets/guide-btn.png') no-repeat center center;background-size: 100%;padding-top: 2rem;padding-bottom: 6.428571rem;}

    
</style>