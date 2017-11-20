'use strict';
import '../../common/common.css';
import Vue from 'vue';
import App from './component/App.vue';


var vm = new Vue({
    el: '#app',
    render: h => h(App)

});