'use strict';

// import引入路由组件
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 1. 定义（路由）组件
import guide from '../component/guide.vue';
import plane from '../component/plane.vue';

// 2. 然后定义路由(routes)，components还可以是Vue.extend()创建的
const routes = [
  { path: '/', component: guide, redirect: '/guide' },
  { path: '/guide', component: guide },
  { path: '/plane', component: plane }
];

//  3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  // ES6缩写语法，相当于routes:routes
  routes  
});

// router.beforeEach((to, from, next) => {
//   if (from.path == '/result') {
//     next('/guide')
//   }
//   else{
//     next() // 确保一定要调用 next()
//   }
  
// });

export default router;
