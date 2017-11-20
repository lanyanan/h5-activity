<template>
    <div class="radio">
        <p>{{data.title}}</p>
        <div class="A" data-key=0 @touchstart="select">
            <div class="radio-btn" >A</div>
            <div class="radio-txt">{{data.list[0].txt}}</div>
        </div>
        <div class="A" data-key=1 @touchstart="select">
            <div class="radio-btn" >B</div>
            <div class="radio-txt">{{data.list[1].txt}}</div>
        </div>
        <div class="A" data-key=2 @touchstart="select">
            <div class="radio-btn">C</div>
            <div class="radio-txt">{{data.list[2].txt}}</div>
        </div>
        <div class="A" data-key=3 @touchstart="select">
            <div class="radio-btn">D</div>
            <div class="radio-txt">{{data.list[3].txt}}</div>
        </div>
    </div>
</template>

<script>

    'use strict';
    import route from '../route/route.js';

    const component = {
        props:["ite","callback"],
        created (){
                
        },
        mounted (){
           
        },
        data (){
            return {
                data:JSON.parse(this.ite)||{},
                touchKey:-1,
                touchId:0

            }
        },
        methods: {
            goToplay (){
                
            },
            select(e){
                let dom = this.getDom(e.target);
                let key = parseInt(dom.getAttribute("data-key"));
                
                if(this.touchKey < 0){
                    dom.getElementsByTagName("div")[0].setAttribute("class","radio-btn red")
                    this.callback(this.data.list[key], true);
                    this.touchKey = key;
                }else{
                    if(this.touchKey == key){
                        dom.getElementsByTagName("div")[0].setAttribute("class","radio-btn");
                        this.callback(this.data.list[key], false);
                        this.touchKey = -1;
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
    .radio {
        font-family: 'hoverTreeFont';
        font-size: 1.285rem;
        padding-top: 2.71rem;
        padding-left: 2.64rem;
        padding-right: 1.64rem;
        z-index: 10;
    }
    .radio p {
        margin-bottom: 1rem;
        line-height: 26px;
    }
    .A,.B,.C,.D {
        width: 100%;
        height: 3.85rem;
        margin: 0.5rem 0;
    }
    .radio-btn {
        width: 2.85rem;
        height: 2.85rem;
        border-radius: 5px;
        background: #000;
        float: left;
        margin: 0.5rem 1rem 0 0;
        color: #fff;
        font-size: 1.7rem;
        line-height: 2.85rem;
        text-align: center;
    }
    .radio-txt {
        font-size: 1.14rem;
        height: 3.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
    }
    .play-txt-center {
        padding-top: 2.2rem;
        padding-bottom: 1.2rem;
        font-size: 44px;
    }
    .red {
        background:red;
    }
</style>