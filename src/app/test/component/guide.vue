<template>
    <section class="guide" :style="{backgroundImage: indexImage}">
        <div class="btn" v-on:click="goToAnswer" :style="{backgroundImage: buttonImage}"></div>
        <div class="rules" v-show="hasRule" @click="showRule">活动规则</div>
        <div class="ruledetail" v-if="hasRule" v-show="showRuleDetail">
            <div class="bd">
                <p>活动规则</p>
                <div class="txt">
                    <p v-for="item in ruleDetail.split('|')">{{item}}</p>
                </div>
                <i @click="closeRuleDetail"></i>
            </div>
        </div>
    </section>
</template>

<script>

    'use strict';
    import route from '../route/route.js';
    import common from '../../../common/common.js';
    import client from '../../../common/client.interactive.js';
    import request from '../../../common/request.js';

    let activeId = common.getUrlParam('id');
    const component = { 
        created: function(){
            let that = this;
            request.doGet('/router?method=jz.h5.interact.hot.index', {id: activeId}).then(function(res){
                let resObj = res.obj;
                // console.log(resObj)
                that.indexImage = 'url('+ resObj.indexImage + ')';
                that.status = resObj.status;
                that.buttonImage = 'url('+ resObj.buttonImage + ')';
                that.hasRule = !!resObj.ruleDetail;
                that.ruleDetail = resObj.ruleDetail;
            });
        },
        data: function(){
            return {
                indexImage: '',
                status: 1,
                buttonImage: '',
                ruleDetail: '',
                hasRule: true,
                showRuleDetail: false
            }
        },
        methods: {
            goToAnswer (){
                window._hmt && window._hmt.push(['_trackEvent', 'tpl_goToAnswer', 'click', '点击首页进入的次数']);
                //判断是否断网
                if(client.clientIsNetwork() == '0'){
                    common.promptMsg('网络已断开','center');
                    return
                }
                
                if(this.status == 1){
                    sessionStorage.guide = '1';
                    route.push('answer');
                }
                
            },
            showRule (){
                this.showRuleDetail = true;
            },
            closeRuleDetail (){
                this.showRuleDetail = false;
            }
        }
    };

     export default component;

</script>

<style>
    .guide{background:url('') no-repeat center top;background-size: 100% 100%;}
    .guide .btn{width:15.0rem;height:3.428571rem;border-radius:3.428571rem;line-height: 3.428571rem;color:#232a2f;font-size: 1.285714rem;text-align: center;background:url('') no-repeat;-webkit-background-size:100%;position: absolute;bottom:4.285714rem;left:50%;margin-left:-7.5rem;}
    .guide .rules{line-height: 2.857143rem;text-align: center;font-size: 1.142857rem;color:#f4c92e;position: absolute;bottom:1.428571rem;left:50%;-webkit-transform: translateX(-50%);text-decoration: underline;}
    .guide .ruledetail{position: fixed;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,0.5);}
    .guide .ruledetail .bd{position: absolute;width:20.0rem;height:23.571429rem;top:50%;left:50%;margin: -11.785714rem 0 0 -10.0rem;background:url('../assets/rule-bg.png') no-repeat;background-size: 100%;text-align: center;}
    .guide .ruledetail .bd>p:first-child{line-height: 6.428571rem;font-size: 1.285714rem;color:#000;margin-bottom: 0.785714rem;}
    .guide .ruledetail .bd .txt{height: 11.428571rem;line-height: 1.928571rem;font-size: 1.142857rem;color:#333;overflow: scroll;text-align: left;padding: 0 0.8rem;}
    .guide .ruledetail .bd>i{position: absolute;bottom:0;left:50%;width:2.571429rem;height:2.571429rem;margin-left: -1.285714rem;border-radius: 50%;}
</style>