<template>
    <section>
        <section class="card-component">
            <div class="card-component-bg" @click="">
                {{txt}}          
            </div>
        </section>
        <img class="home-bg-img" src="../assets/homebg.png" alt="">
        <Btn class="reset" :title="btnTitle" :backBtn="backBtn" :callback="goToResult"></Btn>
    </section>
</template>

<script>

    'use strict';

    import client from '../../../common/client.interactive.js';
    import route from '../route/route.js';
    import Btn from './Btn.vue';
    import CardHead from './CardHead.vue';

    const component = { 
        components:{
            'Btn':Btn,
            'CardHead':CardHead,
        },
        created (){

            let shareData = {
                type:1,
                title: '考验友情的时刻到了！',
                detail: '真姐妹OR塑料姐妹花，你能在以下图中找到WO吗？',
                url: location.href.replace('findsuc', 'find')+ '?v=' + new Date().getTime(),
                img: 'http://images.9zhitx.com/post/20171016/082bfc8c-bdc1-4a52-98ed-4d27c3e7691d7607.png',
                nativeShareBtn: 1
            }
            client.clientShareOut(shareData);

           let data = ["模糊成这样都能认出来，果然是我的姐妹！年老的时候要手拉手一起去跳广场舞哦！", 
           "争气的好姐妹，很庆幸你能找到我！",
           "终于在第三次猜对了！我的损友，至今你都未能清楚的记住我的模样………….",
           "传说中塑料姐妹花是你没错！友谊的小船说翻就翻…………"] ;
           let txtIndex = this.getQueryString("clickNum");
           this.txt = data[txtIndex-1];

        },
        data (){
            return {
                btnTitle:"我也要鉴定",
                backBtn:false,
                txt:""
            }
        },
        methods: {
            goToResult (){
                this.$router.push('home')
            },
            getQueryString(name){
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let parmas = window.location.hash;
                let lsit = parmas.split("?");
                let nameStr = lsit[1];
                let r = nameStr.match(reg);
                //console.log(window.location.hash)
                if(r!=null)return  unescape(r[2]); return null;
            }

        }
    };

     export default component;

</script>

<style>   
    .home-bg-img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .reset {
        position: absolute;
        left: 0;
        bottom: 2.85rem;
    }
    .card-component {
        width:100%;
        overflow: scroll;
    }
    .card-component-bg {
        margin:1.1rem;
        height: 10rem;
        padding: 0 1.43rem;
        background: url('../assets/white280.png') no-repeat left top;
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