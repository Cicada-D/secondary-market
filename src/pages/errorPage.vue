<template>
    <div class=" w-full h-screen flex flex-col justify-center items-center ">
      <div class=" text-red-600 text-xl ">404 页面不存在</div>
      <div>您访问的页面不存在，请返回 <router-link to="/">首页</router-link></div>
    </div>
  </template>
   
  <script>
  export default {
    name: 'NotFound',
  }
  </script>