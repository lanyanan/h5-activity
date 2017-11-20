<template>
    <section class="slider-component">
        <div class="slider-out">
            <div class="slider-in" v-bind:style="styles"></div>           
        </div>
    </section>
</template>

<script>

    'use strict';

    const component = { 
        props:["progress"],
        created (){
                
        },
        data (){
            return {
            }
        },
        methods: {
            goToResult (){
                
            }
        },
        computed: {
            styles () {
                let styles = {};
                styles.width = parseInt(this.progress)*2 + 'px'
                return styles;
            }
        },
    };

     export default component;

</script>

<style>   
    .slider-component {
        width:100%;
        position: absolute;
        left: 0;
        bottom: 0;
        
    }
    .slider-out {
       width:100%;
       height:5px;
       background:rgba(0,0,0,0.5);
       overflow: hidden;
    }
    .slider-in {
       height:5px;
       background:#fff;
    }
</style>