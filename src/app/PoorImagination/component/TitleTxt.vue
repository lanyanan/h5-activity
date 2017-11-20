<template>
    <div class="play-txt">
        <p>{{data.txt.title}}</p>
        <p class="play-txt-center">{{data.txt.titleName}}</p>
        <p>{{data.txt.titleTxt}}</p>
    </div>
</template>

<script>

    'use strict';
    import route from '../route/route.js';

    const component = {
        props:["ite"], 
        created (){
                
        },
        mounted (){
           console.log(this.ite)
        },
        data (){
            return {
                data:JSON.parse(this.ite)||{}
            }
        },
        methods: {
            goToplay (){
                
            },
        },
        watch:{

        }
    };

     export default component;

</script>

<style>   
    .play-txt {
        font-family: 'hoverTreeFont';
        font-size: 22px;
        padding-top: 8.45rem;
        padding-left: 6.64rem;
    }
    .play-txt-center {
        padding-top: 2.2rem;
        padding-bottom: 1.2rem;
        font-size: 44px;
    }
</style>