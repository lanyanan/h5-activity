<template>
    <section v-bind:class="btnClass" >
        <div class="btn" @click="callback">
            {{btnTitle}}          
        </div>
    </section>
</template>

<script>

    'use strict';

    const component = { 
        props:["title","backBtn","callback"],
        created (){
            this.btnTitle = this.title; 
            this.btnClass = this.backBtn ? "btn-component-back" : "btn-component"; 
        },
        data (){
            return {
                btnTitle:"",
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
            backBtn:function(){
                this.btnClass = this.backBtn ? "btn-component-back" : "btn-component"; 
            }
        }
    };

     export default component;

</script>

<style>   
    .btn-component {
        width:100%;
        height: 3.78rem;
    }
    .btn-component-back {
        width:100%;
        height: 3.78rem;
        opacity: 0.5;
    }
    .btn {
        margin:0 auto;
        width:15.7rem;
        height: 3.78rem;
        max-width: 220px;
        background: url('../assets/btn.png') no-repeat left top;
        background-size: 100% 100%;
        text-align: center;
        line-height: 3.3rem;
        font-size: 20px;
        color:#fff;
    }
</style>