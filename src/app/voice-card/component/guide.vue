<template>
    <section class="guide">
        <div class="title">你知道自己的声音具有什么特质吗？是磁性慵懒、清澈温婉还是干净治愈？活了这么久，是时候了解一下自己的声音了~</div>
        <div class="name">
            <input type="text" placeholder="来一个freestyle的名字" v-model="userName"/>
        </div>
        <div class="sex" @click="sexChecked">
            <div class="man" :class="{'checked': manChecked}">我是爷们</div>
            <div class="woman" :class="{'checked': womanChecked}">我是妹纸</div>
        </div>
        <div class="btn" @click="goToRecord">开始鉴定</div>
        <div class="logo"><img src="../assets/yaya-logo.png" alt="" /></div>
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
                userName: '',
                manChecked:false,
                womanChecked:true,
            }
        },
        methods: {
            sexChecked (e){
                let targetClass = e.target.className;
                if(targetClass.indexOf('woman') != -1){
                    this.womanChecked = true;
                    this.manChecked = false;  
                }else{
                    this.manChecked = true;
                    this.womanChecked = false;
                }

            },
            goToRecord (){
                // 校验姓名
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
                // 本地存储当前用户
                let currentUser = {
                    userName: userName,
                    userSex: this.womanChecked ? 0 : 1
                };
                localStorage.currentUser = JSON.stringify(currentUser);

                //埋点
                window._hmt && window._hmt.push(['_trackEvent', 'voiceCard_goToRecord', 'click', '点击开始鉴定的次数']);
                
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    return
                }
                sessionStorage.guide = '1';
                route.push('record');
                
            }
        }
    };

     export default component;

</script>

<style lang="less" scope>

    .guide{
        background:url('../assets/guide-record-bg.png') no-repeat center top;
        background-size: 100% 100%;
        padding: 0 3.071429rem;
        >div{margin-left: auto;margin-right: auto;}
        .title{padding-top: 3.214286rem;padding-bottom: 4.642857rem;font-size: 1.142857rem;color: #767E8A;letter-spacing: 0;line-height: 2.0rem;}
        .name{width:18.571429rem;border: 2px solid #F66F6F;border-radius: 7.142857rem;color:#bbb;background: #FFF1F1;text-align: center;}
        .name>input{width:16.428571rem;height:3.714286rem;line-height: 3.714286rem;text-align: center;font-size: 1.285714rem;}
        ::-webkit-input-placeholder { color:#bbb;font-size: 1.285714rem;}
        .sex{width:18.571429rem;height:2.857143rem;overflow: hidden;margin-top: 2.142857rem;margin-bottom: 8.071429rem;}
        .sex>div{width:8.571429rem;height:2.857143rem;line-height: 2.857143rem;font-size: 1.142857rem;color:#767E8A;background: #FFF1F1;background-position: 0.857143rem center;background-repeat: no-repeat;background-size: 1.428571rem;text-indent:2.4rem;border-radius: 7.142857rem;box-sizing: border-box;border: 2px solid #FFF;}
        .sex>div.checked{border-color: #F66F6F;}
        .sex .man{float: left;background-image: url('../assets/man-icon.png');}
        .sex .woman{float: right;background-image: url('../assets/woman-icon.png');}
        .btn{width:18.571429rem;height:3.571429rem;line-height: 3.571429rem;background: #F66F6F;box-shadow: 0 4px 10px 0 #FEA6A6;border-radius: 100px;color:#fff;font-size: 1.428571rem;position: relative;text-align: center;}
        .btn:before{content: '';position: absolute;width:2.642857rem;height:4px;background:url('../assets/btn-em.png') no-repeat;background-size: 100%;left:2.142857rem;top:3px;}
        .logo{text-align: center;padding-top: 3.571429rem;padding-bottom: 2.142857rem;}
        .logo>img{display:inline-block;width:7.142857rem;}
    }
</style>