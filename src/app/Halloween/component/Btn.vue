<template>
    <section v-bind:class="btnClass"  @click="callback">
        <div class="btn">         
        </div>
    </section>
</template>

<script>

    'use strict';

    const component = { 
        props:["title","callback"],
        created (){
            this.btnTitle = this.title; 
        },
        data (){
            return {
                btnTitle:"按钮",
                btnClass:"btn-component"
            }
        },
        methods: {
            goToResult (){
                
            }
        },
        watch: {
            title:function(){
                this.btnTitle = this.title;
            },
        }
    };

     export default component;

</script>

<style>   
    .btn-component {
        width:100%;
        height: 2.78rem;
    }
    .btn-component-back {
        width:100%;
        height: 2.78rem;
        opacity: 0.5;
    }
    .btn {
        margin:0 auto;
        width:15.42rem;
        height: 2.78rem;
        max-width: 220px;
        background: url('../assets/btn1.png') no-repeat left top;
        background-size: 100% 100%;
        text-align: center;
        font-size: 20px;
        color:#fff;
    }
</style>