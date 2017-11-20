<template>
    <div class="checkbox">
        <p>{{data.title}}</p>
        <div  @touchstart="select"  data-key=0 class="A">
            <div class="checkbox-btn">A</div>
            <div class="checkbox-txt">{{data.list[0].txt}}</div>
        </div>
        <div  @touchstart="select" data-key=1 class="A">
            <div  class="checkbox-btn">B</div>
            <div class="checkbox-txt">{{data.list[1].txt}}</div>
        </div>
        <div  @touchstart="select" data-key=2  class="A">
            <div class="checkbox-btn">C</div>
            <div class="checkbox-txt">{{data.list[2].txt}}</div>
        </div>
        <div @touchstart="select" data-key=3 class="A">
            <div class="checkbox-btn">D</div>
            <div class="checkbox-txt">{{data.list[3].txt}}</div>
        </div>
        <div @touchstart="submit" class="sub" v-if="data.id==12">
            <span>提交答卷</span>
        </div>
    </div>
</template>

<script>

    'use strict';
    import route from '../route/route.js';

    const component = {
         props:["ite","callback","submit"],
        created (){
                
        },
        mounted (){
           
        },
        data (){
            return {
                data:JSON.parse(this.ite)||{},
                touchKey:[]
            }
        },
        methods: {
            goToplay (){
                
            },
            select(e){
                let dom = this.getDom(e.target);
                let key = parseInt(dom.getAttribute("data-key"));
                console.log(dom)
                if(this.touchKey.length < 1){
                    dom.getElementsByTagName("div")[0].setAttribute("class","checkbox-btn red")
                    this.callback(this.data.list[key], true);
                    this.touchKey.push(key);
                }else{
                    let k = -1;
                    for( var i = 0; i < this.touchKey.length; i++){
                        if(this.touchKey[i] == key){
                            k = 1;
                            dom.getElementsByTagName("div")[0].setAttribute("class","checkbox-btn");
                            this.callback(this.data.list[key], false);
                            this.touchKey.splice(i,1);
                            return;
                        }
                    }
                    if(k == -1){
                        dom.getElementsByTagName("div")[0].setAttribute("class","checkbox-btn red")
                        this.callback(this.data.list[key], true);
                        this.touchKey.push(key);
                    }
                }
            },
            getDom(dom) {
                let D = dom;
                if(dom.getAttribute("class")!="A"){
                    D = dom.parentNode
                }
                return D;
            }
        }
    };

     export default component;

</script>

<style>   
    .checkbox {
        z-index: 10;
        font-family: 'hoverTreeFont';
        font-size: 1.285rem;
        padding-top: 2.71rem;
        padding-left: 2.64rem;
        padding-right: 1.64rem;
    }
    .checkbox p {
        margin-bottom: 1rem;
        line-height: 26px;
    }
    .A,.B,.C,.D {
        width: 100%;
        height: 3.85rem;
        margin: 0.5rem 0;

    }
    .checkbox-btn {
        width: 2.85rem;
        height: 2.85rem;
        border-radius: 5px;
        background: #000;
        float: left;
        margin: 0 1rem 0 0;
        color: #fff;
        font-size: 24px;
        line-height: 2.85rem;
        text-align: center;
    }
    .checkbox-txt {
        font-size: 1.14rem;
        height: 2.85rem;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .play-txt-center {
        padding-top: 2.2rem;
        padding-bottom: 1.2rem;
        font-size: 44px;
    }
    .sub {
        width: 11.42rem;
        max-width: 640px;
        height: 3.14rem;
        margin: 0 auto;
        text-align: center;
        line-height: 3.14rem;
        background: #000;
        color: #fff;
        margin-top:1.14rem;
        border-radius: 5px;
        z-index: 110;
    }
    .red{
        background: red;
    }
</style>