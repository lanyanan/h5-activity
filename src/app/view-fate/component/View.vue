<template>
    <section class="home-bg">
        <section class = "home-input">
            <div class = "top-name">
                <input v-model="youName" placeholder = "请输入你的姓名" maxlength="6" type = "text">
            </div>
            <div class = "bottom-name">
                <input v-model="herName" placeholder = "请输入TA的姓名" maxlength="6" type = "text">
            </div> 
        </section>
        <section class = "home-start-btn">
            <span @click = "goToResult" class = "home-start-btn-span"></span>
        </section>
        <section class = "loading" v-if="showLoading">
            <div class = "loading-tips">
                <div class = "loading-img"></div>
                <span>月老正在为你牵线搭桥</span>
                <span>请稍后...</span>
            </div> 
        </section>
    </section>
</template>

<script>

    'use strict';
    import client from '../../../common/client.interactive.js';
    import common from '../../../common/common.js';
    import {Config} from './Config.js';

    const _config = new Config();

    const component = { 
        data() {
            return {
                youName: "",
                herName: "",
                showLoading: false,
                indexNum: -1,
            }
        },
        created (){
            let data = {
                type: 1,
                title: "很准的小测试：查查你与TA的缘分",
                detail: "七夕来了，你和TA真的有缘吗？",
                url: location.href + '?v='+(+new Date()),
                img: "http://images.9zhitx.com/0c4afb65-ea94-42e3-9d47-6e4545eeec61.png",
                platform: 0,
                nativeShareBtn: 1
            }
            client.clientShareOut(data);
            sessionStorage.setItem("home","")
        },
        methods: {
            goToResult() {
                this.youName = this.youName.replace(/\s+/ig,'');
                this.herName = this.herName.replace(/\s+/ig,'');
                let _this = this,
                reg = /^[a-zA-Z\u4e00-\u9fa5]{1,7}$/;
                if (_this.youName == '' || _this.herName == '') {
                    common.promptMsg("名字不能为空", 'center');
                    return 
                }
                if (_this.youName == _this.herName) {
                    common.promptMsg("名字不能相等", 'center');
                    return 
                }
                if(!reg.test(_this.youName) ){
                    common.promptMsg('姓名最多只能输入6个汉字和字母', 'center');
                    return 
                }
                if(!reg.test(_this.herName) ){
                    common.promptMsg('姓名最多只能输入6个汉字和字母', 'center');
                    return 
                }
                _this.showLoading = true;
                _this.indexNum = _config.getConfig("-1");

                window._hmt && window._hmt.push(['_trackEvent', 'qixi-fate', 'click', '测试姻缘首页打开的次数']);

                if(localStorage.getItem('testArr')){
                    let arr = JSON.parse(localStorage.getItem('testArr'));
                    let k = -1;
                    let _index = -1;
                    arr.map((item, index)=>{
                        if(_this.youName == item.youName && _this.herName == item.herName) {
                            k = 1; 
                            console.log(item.indexNum)
                            _index = item.indexNum;
                        }
                    })
                    if(k==-1) {
                        _this.setlocalStorage();
                        _this.toPushResult(_this.indexNum);
                    } else {
                        _this.toPushResult(_index);
                    }
                } else {
                    _this.setlocalStorage();
                    _this.toPushResult(_this.indexNum)
                } 
            },
            toPushResult(indexNum) {
                let _this = this;
                window._hmt && window._hmt.push(['_trackEvent', 'qixi-result', 'click', '跳转结果页面的点击次数']);
                setTimeout(()=>{
                    sessionStorage.setItem("home","1")
                    if(_this.isWeiXin) {
                        _this.$router.push({ path: 'result', query: { youName: (_this.youName), herName: (_this.herName), indexNum: indexNum}})
                    } else {
                        _this.$router.push({ path: 'result', query: { youName: encodeURI(_this.youName), herName: encodeURI(_this.herName), indexNum: indexNum}})
                    } 
                    
                }, 1500)
            },
            setlocalStorage() {
                let _this = this,
                testArr = JSON.parse(localStorage.getItem('testArr')) || [],
                data = {
                    youName: _this.youName,
                    herName: _this.herName,
                    indexNum: _this.indexNum
                }
                testArr.push(data)
                localStorage.setItem('testArr', JSON.stringify(testArr))
            },
            isWeiXin() {
                let ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };

     export default component;

</script>

<style>
    .home-bg {
        position: relative;
        max-width: 45.7rem;
        width: 100%;
        min-height:43rem;
        height: 100%;
        background: url('../assets/bg.jpg') no-repeat left top;
        background-size: 100% 100%;
        margin:0 auto;
    }
    .home-input {
        position:absolute;
        left: 0;
        bottom: 12rem;
        width: 100%;
        height: 10rem;
    }
    .top-name {
        width: 80%;
        height: 3.35rem;
        border:1px solid #ccc;
        border-radius: 2.3rem;
        background: #fff;
        margin:2rem 10%;
    }
    .top-name input {
        width: 80%;
        height: 3.35rem;
        padding-left: 2.3rem;
        font-size: 18px;
        margin-top:-2px;
    }
    .bottom-name {
        width: 80%;
        border:1px solid #ccc;
        border-radius: 2.3rem;
        background: #fff;
        height: 3.35rem;
        margin:0 10%;
    }
    .bottom-name input {
        width: 80%;
        height: 3.35rem;
        padding-left: 2.3rem;
        font-size: 18px;
        margin-top:-2px;
    }
    .home-start-btn {
        position: absolute;
        left: 0;
        bottom: 3.333rem;
        width: 100%;
        height: 4.2rem;
    }
    .home-start-btn-span {
        display: block;
        margin: 0 auto;
        width: 15.8333rem;
        height: 4.2rem;
        background: url('../assets/start-btn.png') no-repeat left top;
        background-size: 100% 100%;
    }
    .loading {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%; 
    }
    .loading-tips {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 15rem;
        height: 15rem;
        margin-left: -7.5rem;
        margin-top: -7.5rem;
        border-radius: 10px;
        background: #fff;
    }
    .loading-tips span {
        display: block;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        font-size: 14px;
        color: red;
        text-align: center;
    }
    .loading-img {
        display: block;
        width: 8.42rem;
        height: 8.42rem;
        margin: 1rem auto 0;
        background: url('../assets/looading.gif') no-repeat center center;
        background-size: 50% 50%;
    }

    
</style>