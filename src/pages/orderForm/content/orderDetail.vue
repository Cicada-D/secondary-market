<template>
  <Header></Header>
  <div class="bg-white">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div class="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <div v-for="item in goods.srcs" :key="item.src">
          <img :src='item.src' alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            class="rounded-lg bg-gray-100" />
        </div>
      </div>
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ goods.name }}</h2>
        <p class="mt-4 text-gray-500">{{ goods.description }}</p>

        <div class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div v-for="feature in goods.features" :key="feature.name" class="border-t border-gray-200 pt-4">
            <div class="font-medium text-gray-900">{{ feature.name }}</div>
            <div class="mt-2 text-sm text-gray-500">{{ feature.description }}</div>
          </div>
        </div>
        <div class='flex justify-around border-b-2 mt-8 pb-2'>
          <button
            class=" rounded-lg border-2 py-2 px-4 bg-slate-500 text-white hover:bg-slate-600 hover:border-slate-600">加入购物车</button>
          <button
            class=" rounded-lg border-2 py-2 px-4 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 ">立即购买</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import Header from '@/component/header.vue';
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getGoodsDetail } from '../component/order';
import { changeGoodsDetail } from '@/lib/utils';

// const goods = {
//   name: '物品名称',
//   description: `The walnut wood card tray is precision milled to perfectly fit a stack of Focus
//             cards. The powder coated steel divider separates active cards from new ones, or can be used to archive
//             important task lists.`,
//   features: [
//     { name: '卖家', description: 'Wood card tray and 3 refill packs' },
//     { name: '类型', description: 'Designed by Good Goods, Inc.' },
//     { name: '损耗层度', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
//     { name: '价格', description: '6.25" x 3.55" x 1.15"' },
//   ],
//   srcs: [
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg'
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg'
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg'
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg'
//     },
//   ]
// }
const goods = ref({})

onBeforeMount(() => {
  const router = useRoute()
  // console.log(router.params)
  const res = getGoodsDetail('http://localhost:3000/findGoods', router.params.gid)
  res.then((result)=>{
    console.log(result[0])
    goods.value = changeGoodsDetail(result[0])
  })
})

onMounted(() => {
  watchEffect(() => {
    // 在 goods.value 变化时执行逻辑
    console.log('goods.value updated:', goods.value);
  });
})
</script>