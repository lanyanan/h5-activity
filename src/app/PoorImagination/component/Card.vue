<template>
    <div class="card">
        <p>{{data.title}}</p>
        <div class="card-list">
            <div class="card-A">
                <div class="card-img"><img :src="data.list[0].src" alt=""></div>
                <div class="card-btn" @touchstart="select"  data-key=0 >A</div>   
            </div>
            <div class="card-B">
                <div class="card-img"><img :src="data.list[1].src" alt=""></div>
                <div class="card-btn"  @touchstart="select" data-key=1>B</div>
            </div>
            <div class="card-C">
                <div class="card-img"><img :src="data.list[2].src" alt=""></div>
                <div class="card-btn"  @touchstart="select" data-key=2 >C</div>
            </div>
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
                touchKey:-1
            }
        },
        methods: {
            goToplay (){
                
            },
            select(e){
                let dom = e.target;
                let key = parseInt(dom.getAttribute("data-key"));
                if(this.touchKey < 0){
                    dom.setAttribute("class","card-btn red")
                    this.callback(this.data.list[key], true);
                    this.touchKey = key;
                }else{
                    if(this.touchKey == key){
                        dom.setAttribute("class","card-btn");
                        this.callback(this.data.list[key], false);
                        this.touchKey = -1;
                    }
                }
                
            }
        }
    };

     export default component;

</script>

<style>   
    .card {
        font-family: 'hoverTreeFont';
         font-size: 1.285rem;
        padding-top: 2.71rem;
        padding-left: 1.64rem;
        padding-right: 1.64rem;
        z-index: 10
    }
    .card p {
        margin-bottom: 2.5rem;
        line-height: 1.85rem;
        text-align: center;
    }
    .card-list {
        width: 100%;
        height: 13.64rem;
        display: -webkit-flex; /* Safari */
        display: flex;
        -webkit-justify-content: center; /* Safari 6.1+ */
        justify-content: center;
    }
    .card-A,.card-B,.card-C,.card-D {
        width: 6.5rem;
        height: 13.64rem;
        float: left;
        margin: 0 0.3rem;

    }
    .card-btn {
        margin: 2rem 1.82rem 0 1.82rem;
        width: 2.85rem;
        height: 2.85rem;
        border-radius: 5px;
        background: #000;
        float: left;
        color: #fff;
        font-size: 24px;
        line-height: 2.85rem;
        text-align: center;
    }
    .card-img {
        width: 6.5rem;
        height: 8.78rem;
        border-radius: 5px;
        background: #fff;
    }
    .play-txt-center {
        padding-top: 2.2rem;
        padding-bottom: 1.2rem;
        font-size: 44px;
    }
    .red{
        background:red;
    }
</style>