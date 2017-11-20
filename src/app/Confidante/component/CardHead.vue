<template>
    <section class="card-component">
        <div class="card-component-bg" @click="">
            {{btnTitle}}          
        </div>
    </section>
</template>

<script>

    'use strict';

    const component = {
        created (){
                
        },
        data (){
            return {
                btnTitle:"上传你的个人正脸照，上传后系统会自动模糊掉照片哦！分享闺蜜，看看他们能否找到你吧！"
            }
        },
        methods: {
            goToResult (){
                
            }
        }
    };

     export default component;

</script>

<style>   
    .card-component {
        width:100%;
    }
    .card-component-bg {
        margin:1.1rem;
        height: 8.5rem;
        padding: 0 1.43rem;
        background: url('../assets/white230.png') no-repeat left top;
        background-size: 100% 100%;
        font-size: 16px;
        color:#f83866;
        display:flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        letter-spacing: 2px;
    }
</style>