<template>
    <section class="vote">
        <div class="vote-list">
            <ul>
                <li class="voteLi" v-for="item in items" :key="item.index" v-show="item.show" :style="{backgroundImage: `url(${item.backgroundImage})`, backgroundColor: item.backgroundColor}">
                    <div class="juzhao"><img :src="item.optionImage"  alt="" /></div>
                    <div class="title">{{item.title}}</div>
                    <div class="content">
                        <p v-for="contentItem in item.content">{{contentItem}}</p>  
                    </div>
                    <div class="bd">
                        <div class="btn" data-answer="0" @click="vote" :style="{backgroundImage: 'url(' + item.leftImage + ')'}"></div>
                        <div class="btn" data-answer="1" @click="vote" :style="{backgroundImage: 'url(' + item.rightImage + ')'}"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="progress" :style="{width:progressW}"></div>
    </section>
</template>

<script>

'use strict';

import router from '../route/route.js';
import common from '../../../common/common.js';
import client from '../../../common/client.interactive.js';
import request from '../../../common/request.js';


let activeId = common.getUrlParam('id');
const component = { 
    created: function(){
        // 判断是否从首页进入
        if(!sessionStorage.guide){
            router.replace('guide');
            return
        }
        
        let that = this;
        request.doGet('/router?method=jz.h5.interact.hot.vote.scene', {id: activeId}).then(function(res){
            //判断活动是否结束
            if(!res.success){
                common.promptMsg('活动已结束','center');
                return
            }
            
            // 存储数据
            let resObj = res.obj;
            sessionStorage.resObj_scene = JSON.stringify(resObj);
            
            // 定义数据
            for(let x in resObj.scene){
                if(x == 0){
                    resObj.scene[x].show = true;
                }else{
                    resObj.scene[x].show = false;
                }
                resObj.scene[x].index = x; 
                let content = resObj.scene[x].content;
                resObj.scene[x].content = content.split('|');
            }
            that.items = resObj.scene;
            that.progressW = 100/that.items.length + '%';

        });
    },
    data (){
        let that = this;
        return {
            items: [],
            checked: {
                '0': false,
                '1': false
            },
            answerArr: [],
            progressW: ''
            
        }
    },
    methods: {
        vote: function(e){
            let answer = e.currentTarget.dataset.answer;
            let checked = this.checked;
            for(let key in checked){
                if(key == answer){
                    checked[key] = true;
                }
            }

            // 选择后切换到下一题
            this.next_question();
        },
        next_question: function(){
            let items = this.items;
            let checked = this.checked;
            for(let x = 0; x < items.length; x++){
                if(items[x].show){
                    // 判定选择项
                    for(let x in checked){
                        if(checked[x]){
                            this.answerArr.push(x);
                        }
                    }
                    console.log(this.answerArr)
                    // 切换下一题
                    if(x == (items.length - 1)){
                        //判断是否断网
                        if(client.clientIsNetwork() == '0'){
                            common.promptMsg('网络已断开','center');
                            return
                        }
                        
                        router.replace({
                            path: 'result', 
                            query: {
                                answerArr: JSON.stringify(this.answerArr)
                            }
                        });
                    }else{
                        items[x].show = false;
                        items[(x + 1)].show = true ;
                        this.progressW = 100*(x + 2)/items.length + '%';
                        break
                    }
                    
                }
            }

            // 选项初始化
            for(let key in checked){
                checked[key] = false; 
            }

            
        }
    }
};


export default component;

</script>

<style>
    .vote{position: relative;}
    .vote .vote-list{}
    .vote .voteLi{overflow: hidden;background: url('') no-repeat center top;background-size:100% 100%;position: absolute;top:0px;left:0px;right:0px;bottom:0px;text-align: center;padding: 2.142857rem 0;}
    .vote .voteLi .juzhao{width:23.571429rem;height:17.714286rem;overflow: hidden;margin-left: auto;margin-right: auto;text-align: center;}
    .vote .voteLi .juzhao>img{height:100%;width:auto;}
    .vote .voteLi .title{font-size: 1.5rem;line-height: 2.071429rem;color:#fff;margin-top: 1.8rem;}
    .vote .voteLi .content{width:20.714286rem;margin-left: auto;margin-right: auto;text-align: center;color:#333;}
    .vote .voteLi .content>p{line-height: 2.071429rem;color:#fff;}
/*    .vote .voteLi .content>p:last-child{font-size: 0.928571rem;text-align: left;}*/
    .vote .voteLi .bd{width:20.714286rem;position: absolute;overflow: hidden;left:50%;right:0;margin-left: -10.157143rem;bottom:2.857143rem;}
    .vote .voteLi .bd .btn{width:8.571429rem;height:3.142857rem;background:url('') no-repeat;background-size: 100% 100%;}
    .vote .voteLi .bd .btn:first-child{float: left;}
    .vote .voteLi .bd .btn:last-child{float: right;}



    /*答题进度*/
    .answer .progress{height:0.428571rem;background-color:#f4c92e;position: absolute;width:100%;bottom:0;left:0;}
</style>