<template>
    <section class="answer">
        <div class="question-list">
            <ul>
                <li class="questionLi" v-for="item in items" :key="item.index" v-show="item.show" :style="{backgroundImage: 'url(' + item.backgroundImage + ')'}">
                    <template v-if="item.subjectType=='0'&&item.answerType=='0'">
                        <!-- <div class="title">学霸学渣测试专用试卷</div> -->
                        <div class="question">{{item.title}}</div>
                        <div class="option txtOpt single">
                            <ul>
                                <li v-for="opt in item.options" :style="{lineHeight: /[\u4e00-\u9fa5]/.test(opt.content)&&opt.content.length > 15 ? '2rem' : '3.571429rem', backgroundColor: item.optionButtonColor, color: item.optionTextColor}" :class="{checked: checked[opt.no]}" @click="checkedOptionSingle"><span class="Num_en">{{opt.no}}</span><span>、</span><span class="contxt">{{opt.content}}</span><i></i></li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="item.subjectType=='0'&&item.answerType=='1'">
                        <!-- <div class="title">学霸学渣测试专用试卷</div> -->
                        <div class="question">{{item.title}}</div>
                        <div class="option txtOpt multiple">
                            <ul>
                                <li v-for="opt in item.options" :style="{lineHeight: /[\u4e00-\u9fa5]/.test(opt.content)&&opt.content.length > 15 ? '2rem' : '3.571429rem', backgroundColor: item.optionButtonColor, color: item.optionTextColor}" :class="{checked: checked[opt.no]}"  @click="checkedOptionDouble"><span class="Num_en">{{opt.no}}</span><span>、</span><span class="contxt">{{opt.content}}</span><i></i></li>
                            </ul>
                        </div>
                        <div class="btn" @click="next_question">下一题</div>
                    </template>
                    <template v-if="item.subjectType=='1'&&item.answerType=='0'">
                        <!-- <div class="title">学霸学渣测试专用试卷</div> -->
                        <div class="question">{{item.title}}</div>
                        <div class="option imgOpt single">
                            <ul class="clearfix">
                                <li v-for="opt in item.options" :class="{checked: checked[opt.no]}" @click="checkedOptionSingle"><span class="Num_en">{{opt.no}}</span><img :src="opt.image_url" alt="" /><span class="checked-bg"></span></li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="item.subjectType=='1'&&item.answerType=='1'">
                        <!-- <div class="title">学霸学渣测试专用试卷</div> -->
                        <div class="question">{{item.title}}</div>
                        <div class="option imgOpt multiple">
                            <ul class="clearfix">
                                <li v-for="opt in item.options" :class="{checked: checked[opt.no]}" @click="checkedOptionDouble"><span class="Num_en">{{opt.no}}</span><img :src="opt.image_url" alt="" /><span class="checked-bg"></span></li>
                            </ul>
                        </div>
                        <div class="btn" @click="next_question">下一题</div>
                    </template>
                    <template v-if="item.subjectType=='2'&&item.answerType=='0'">
                        <!-- <div class="title">学霸学渣测试专用试卷</div> -->
                        <div class="question">
                            <p>{{item.title || ''}}</p>
                            <div class="questionImage"><img :src="item.questionImage" alt="" /></div>
                        </div>
                        <div class="option imgTitleOpt single">
                            <ul>
                                <li v-for="opt in item.options" :style="{lineHeight: /[\u4e00-\u9fa5]/.test(opt.content)&&opt.content.length > 15 ? '2rem' : '3.571429rem', backgroundColor: item.optionButtonColor, color: item.optionTextColor}" :class="{checked: checked[opt.no]}" @click="checkedOptionSingle"><span class="Num_en">{{opt.no}}</span><span>、</span><span class="contxt">{{opt.content}}</span><i></i></li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="item.subjectType=='2'&&item.answerType=='1'">
                        <!-- <div class="title">学霸学渣测试专用试卷</div> -->
                        <div class="question">
                            <p>{{item.title || ''}}</p>
                            <div class="questionImage"><img :src="item.questionImage" alt="" /></div>
                        </div>
                        <div class="option imgTitleOpt multiple">
                            <ul>
                                <li v-for="opt in item.options" :style="{lineHeight: /[\u4e00-\u9fa5]/.test(opt.content)&&opt.content.length > 15 ? '2rem' : '3.571429rem', backgroundColor: item.optionButtonColor, color: item.optionTextColor}" :class="{checked: checked[opt.no]}"  @click="checkedOptionDouble"><span class="Num_en">{{opt.no}}</span><span>、</span><span class="contxt">{{opt.content}}</span><i></i></li>
                            </ul>
                        </div>
                        <div class="btn" @click="next_question">下一题</div>
                    </template>
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
        }

        let that = this;
        request.doGet('/router?method=jz.h5.interact.hot.test.scene', {id: activeId}).then(function(res){
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
                resObj.scene[x].options = JSON.parse(resObj.scene[x].options);  
            }
            that.items = resObj.scene;
            that.totalQuestion = that.items.length;
            that.progressW = 100/that.items.length + '%';

        });
    },
    data: function(){
        let that = this;
        return {
            items: [],
            totalQuestion: 0,
            currentQuestion: 1,
            honor: [],
            checked: {
                A: false,
                B: false,
                C: false,
                D: false,
            },
            progressW: '',
            
        }
    },
    methods: {
        checkedOptionSingle: function(e){
            clearTimeout('timer');
            // 获取答案(ABCD)
            let li = e.currentTarget;
            let correct = li.childNodes[0].innerText;
           //改变checked对应选项
            let checked = this.checked;
            for(let key in checked){
                if(key == correct){
                    checked[key] = true;
                }else{
                    checked[key] = false;
                }   
            }

            // 单选选择后切换到下一题
            let that = this;
            let timer = setTimeout(function(){
                that.next_question();
            }, 100)
        },
        checkedOptionDouble: function(e){
            // 获取答案(ABCD)
            let li = e.currentTarget;
            let correct = li.childNodes[0].innerText;
            //改变checked对应选项
            let checked = this.checked;
            for(let key in checked){
                if(key == correct){
                    checked[key] = !checked[key];
                }   
            }

            
        },
        next_question: function(e){
            let items = this.items;
            let checked = this.checked;
            for(let x = 0; x < items.length; x++){
                if(items[x].show){
                    // 用户答案
                    let answer = [];
                    for(let x in checked){
                        if(checked[x]){
                            answer.push(x);
                        }
                    }
                    console.log(answer);

                    // 获取用户答案对应头衔
                    if(!answer.length){
                        common.promptMsg('你还没有选择你的答案哦','center');
                        return
                    }
                    let options = items[x].options; 
                    for(let x in answer){
                        for(let y in options){
                            if(options[y].no == answer[x]){
                                this.honor.push(options[y].honor);
                                break
                            }
                        }
                    }
                    console.log(this.honor)
                    
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
                                honorArray: this.honor.join()
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
    .answer{position: relative;}
    .answer .question-list{}
    .answer .questionLi{overflow: hidden;background: url('') no-repeat center top;background-size:100% 100%;position: absolute;top:0px;left:0px;right:0px;bottom:0px;text-align: center;padding:2.857143rem;}
    .answer .questionLi .question{font-size: 1.285714rem;line-height: 1.928571rem;color:#333;text-align: left;word-wrap:break-word;word-break:break-all;}
    .answer .questionLi .option{margin-left: auto;margin-right: auto;margin-top: 2.142857rem;}
    .answer .questionLi .btn{width:14.285714rem;height:3.142857rem;line-height: 3.142857rem;background-color: #f4c92e;text-align: center;font-size: 1.285714rem;color:#333;border-radius: 1.571429rem;position: absolute;bottom: 3.428571rem;left:50%;margin-left:-7.142857rem;}

    /*文字选项*/
    .answer .questionLi .option.txtOpt{font-size: 1.071429rem;color:#333;}
    .answer .questionLi .option.txtOpt>ul>li{background: #f4c92e;border-radius:3.571429rem;margin-bottom: 1.071429rem;overflow: hidden;position: relative;text-align: left;padding: 0 1.428571rem;}
    .answer .questionLi .option.txtOpt>ul>li.checked{background: #ffa800;}
    .answer .questionLi .option.txtOpt>ul>li>span{word-wrap:break-word;word-break:break-all;}
    .answer .questionLi .option.txtOpt>ul>li>span.Num_en{}
    .answer .questionLi .option.txtOpt>ul>li>i{width:1.428571rem;height:1.071429rem;position: absolute;top:50%;right:1.285714rem;margin-top: -0.5rem;background:url('../assets/checked-txt.png') no-repeat ;background-size:1.428571rem auto;display: none;}
    .answer .questionLi .option.txtOpt>ul>li.checked>i{display:block;}

    /*图片选项*/
    .answer .questionLi .option.imgOpt{width:16.571429rem;}
    .answer .questionLi .option.imgOpt>ul>li{float: left;width:7.142857rem;height:7.142857rem;overflow: hidden;position: relative;}
    .answer .questionLi .option.imgOpt>ul>li:first-child{margin: 0 2.285714rem 1.428571rem 0;}
    .answer .questionLi .option.imgOpt>ul>li:nth-of-type(2){margin-bottom: 1.428571rem;}
    .answer .questionLi .option.imgOpt>ul>li:nth-of-type(3){margin-right: 2.285714rem;}
    .answer .questionLi .option.imgOpt>ul>li .Num_en{position: absolute;font-size: 1.071429rem;color:#f4c92e;left:0.357143rem;top:0.025rem;z-index: 2;}
    .answer .questionLi .option.imgOpt>ul>li>img{height:100%;width:auto;}
    .answer .questionLi .option.imgOpt>ul>li .checked-bg{position: absolute;width:100%;height:100%;top:0;left:0;background-color: rgba(0,0,0,0.5);background-image: url('../assets/checked-icon.png');background-repeat: no-repeat;background-position: center center;background-size:1.428571rem auto;display:none;}
    .answer .questionLi .option.imgOpt>ul>li.checked .checked-bg{display:block;}

    /*图片题目选项*/
    .answer .questionLi .option.imgTitleOpt{font-size: 1.071429rem;color:#333;}
    .answer .questionLi .option.imgTitleOpt>ul>li{background: #f4c92e;border-radius:3.571429rem;margin-bottom: 1.071429rem;overflow: hidden;position: relative;text-align: left;padding: 0 1.428571rem;}
    .answer .questionLi .option.imgTitleOpt>ul>li.checked{background: #ffa800;}
    .answer .questionLi .option.imgTitleOpt>ul>li>span{word-wrap:break-word;word-break:break-all;}
    .answer .questionLi .option.imgTitleOpt>ul>li>span.Num_en{}
    .answer .questionLi .option.imgTitleOpt>ul>li>i{width:1.428571rem;height:1.071429rem;position: absolute;top:50%;right:1.285714rem;margin-top: -0.5rem;background:url('../assets/checked-txt.png') no-repeat ;background-size:1.428571rem auto;display: none;}
    .answer .questionLi .option.imgTitleOpt>ul>li.checked>i{display:block;}
    .answer .questionLi .questionImage{height: 10.0rem;}
    .answer .questionLi .questionImage img{height: 100%;border-radius: 0.714286rem;}
    /*答题进度*/
    .answer .progress{height:0.428571rem;background-color:#f4c92e;position: absolute;width:100%;bottom:0;left:0;}
</style>