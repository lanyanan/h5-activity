<template>
    <section class="answer">
        <div class="question-list diezhe">
            <ul>
                <li class="questionLi" v-for="item in roles.items" :style="{backgroundImage: `url(${roles.background})`, color: roles.color}" v-show="item.show">
                   <div class="hd">
                       <div class="line"></div>
                       <div class="txt">{{itemTxt}}</div>
                       <div class="line"></div>
                   </div>
                   <div class="question">{{item.question}}</div>
                   <div class="option">
                        <p>{{item.option[0]}}</p>
                        <p>{{item.option[1]}}</p>
                   </div>
                   <div class="bd">
                        <button class="btn" data-answer="0" :style="{background: roles.btnBackground[0]}" :disabled="checkedDisabled" @click="answer">A</button>
                        <button class="btn" data-answer="1" :style="{background: roles.btnBackground[1]}" :disabled="checkedDisabled" @click="answer">B</button>
                   </div>
                </li>
            </ul>
        </div>
        <div class="progress" :style="{width:progressW}"></div>
        <div class="tip" v-show="tipShow">
            <span :class="tipClass"></span>
        </div>
    </section>
</template>

<script>

'use strict';

import route from '../route/route.js';
import common from '../../../common/common.js';
import client from '../../../common/client.interactive.js';
import roleData from '../data/index.js';


const component = { 
    created (){
        // 判断是否从首页进入
        if(!sessionStorage.guide){
            route.replace('guide');
            return
        }
        // 清空答题结果
        for(let key in sessionStorage){
            if(key == 'deadResult' || key == 'winResult' ||　key == 'lastAnswer'){
                delete sessionStorage[key];
            }
            
        }

        // 初始化数据
        let role = JSON.parse(this.$route.query.role);
        // 切换音乐
        setTimeout(() => {
            let isPaused = $('#musicId')[0].paused;
            function chooseMusic (src){
                $('#musicId').removeAttr('src').attr('src', src);
                if(isPaused){
                    $('#musicId')[0].pause();
                }
            }

            let roles = {};
            switch(role){
                case 0 : 
                roles = roleData[0];
                chooseMusic('http://video.9zhitx.com/67b42900-4a61-4d25-9fb0-bba68673aaea.mp3'); 
                break
                case 1 : 
                roles = roleData[1];
                chooseMusic('http://video.9zhitx.com/435e0e3a-949b-4c97-8ee3-96ffcb888b11.mp3');
                break
                case 2 : 
                roles = roleData[2];
                chooseMusic('http://video.9zhitx.com/e8970303-0bc9-412e-be60-111413c5264b.mp3');
                break
            }

            let items = roles.items;
            for(let x in items){
                if(x == '0'){
                    items[x].show = true;
                }else{
                    items[x].show = false;
                }
                
            }
            this.role = role;
            this.roles = roles;
            this.progressW = 100/this.roles.items.length + '%';

            // 打字机初始化
            let current_items = this.roles.items;
            for(let x in current_items){
                if(current_items[x].show){
                   this.typewriter(current_items[x].txt);
                }
            }
        });
        
    },
    data (){
        let that = this;
        return {
            role: 0,
            roles: {},
            checked: {
                '0': false,
                '1': false
            },
            itemTxt: '',
            num: 0,
            checkedDisabled: true,
            tipShow: false,
            tipClass: '',
            progressW: '',

            
        }
    },
    methods: {
        answer: function(e){
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
        typewriter: function(txt){
            let wordLen = txt.length;
            let wordArray = txt.split('');
            if(this.num < wordLen){
                setTimeout(() => {
                    this.itemTxt += wordArray[this.num];
                    this.num++;
                    this.typewriter(txt);
                }, 50)
                
            }else{
                this.checkedDisabled = false;
            }
            
        },
        next_question: function(){
            let items = this.roles.items;
            let checked = this.checked;
            for(let x = 0; x < items.length; x++){
                if(items[x].show){
                    // 判定选择项
                    let checkedAnswer = '';
                    for(let x in checked){
                        if(checked[x]){
                            checkedAnswer = x
                        }
                    }

                    if(checkedAnswer == items[x].deadAnswer){
                        this.tipClass = 'dead';
                        this.tipShow = true;
                        let lastAnswer = x == (items.length - 1) ? 0 : 1;
                        setTimeout(() => {
                            this.tipShow = false;
                            sessionStorage.deadResult = JSON.stringify(items[x].deadResult);
                            sessionStorage.lastAnswer = lastAnswer;
                            route.replace({
                                path: 'result'
                            });
                        }, 1000);
                        
                    }else{
                        // 切换下一题
                        if(x == (items.length - 1)){
                            this.tipClass = 'win';
                            this.tipShow = true;
                            setTimeout(() => {
                                this.tipShow = false;
                                sessionStorage.winResult = JSON.stringify(items[x].winResult);
                                sessionStorage.lastAnswer = 0;
                                route.replace({
                                    path: 'result'
                                });
                            }, 1000);
                        }else{
                            items[x].show = false;
                            items[x + 1].show = true ;
                            this.itemTxt = ''; 
                            this.num = 0;
                            this.checkedDisabled = true;
                            this.typewriter(items[x + 1].txt);
                            this.progressW = 100*(x + 2)/items.length + '%';
                            break
                        }
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
    .answer{position: relative;}
    .answer .question-list{}
    .answer .questionLi{overflow: hidden;background: url('') no-repeat center top;background-size:100%;position: absolute;top:0px;left:0px;right:0px;bottom:0px;}
    .answer .questionLi .hd{padding: 0 0.714286rem;margin-top: 2.857143rem;margin-bottom: 2.142857rem;}
    .answer .questionLi .hd .line{height: 0.142857rem;background: url('../assets/diezhe-line.png') no-repeat center top;background-size: 100%;}
    .answer .questionLi .hd .txt{padding: 1.428571rem 1.071429rem;background: rgba(0,0,0,0.5);line-height: 1.714286rem;font-size: 1.142857rem;}
    .answer .questionLi .question,.answer .questionLi .option{font-size: 1.142857rem;line-height: 1.714286rem;margin-bottom: 1.785714rem;padding: 0 1.785714rem;}
    .answer .questionLi .option>p:last-child{margin-top: 1.428571rem;}
    .answer .questionLi .bd{width:23.214286rem;position: absolute;overflow: hidden;left:50%;right:0;margin-left: -11.607143rem;bottom:2.857143rem;}
    .answer .questionLi .bd .btn{width:10.714286rem;height:3.142857rem;line-height:3.142857rem;border-radius: 3.142857rem;text-align: center;font-size: 1.285714rem;color:#333;}
    .answer .questionLi .bd .btn:first-child{float: left;background:#e5b116;}
    .answer .questionLi .bd .btn:last-child{float: right;background:#daa015;}


    /*提示*/
    .answer .tip{position: absolute;bottom:0;left:0;top:0;right:0;background: rgba(0,0,0,0.5);}
    .answer .tip>span{position: absolute;width:22.357143rem;height:11.428571rem;top:50%;left:50%;margin: -5.714286rem 0 0 -11.142857rem;background-repeat: no-repeat;background-size: 100%;}
    .answer .tip>span.dead{background-image:url('../assets/alert-dead.png');}
    .answer .tip>span.win{background-image:url('../assets/alert-win.png');}
    /*答题进度*/
    .answer .progress{height:0.428571rem;background-color:#f4c92e;position: absolute;width:100%;bottom:0;left:0;}

</style>