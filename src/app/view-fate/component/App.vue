<template>
    <section class="view">
        <router-view></router-view>    
    </section>
</template>

<script>

  'use strict';
  import client from '../../../common/client.interactive.js';
  import router from '../route/route.js';

  export default {
    data (){
        return {
        }
    },
    methods: {
    },
    router
  }

</script>

<style>
    html, body {
        width: 100%;
        height: 100% 
    }
    .view {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>