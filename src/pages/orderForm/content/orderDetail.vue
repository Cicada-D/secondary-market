<template>
  <Header></Header>
  <div class="">
    <div
      class=" bg-slate-50 mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:mx-8 lg:my-2 border rounded-md">
      <div class="  grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
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
            class=" rounded-lg border-2 py-2 px-4 bg-slate-500 text-white hover:bg-slate-600 hover:border-slate-600"
            @click="pushCart(goodsDetali, mid, router)">加入购物车</button>
          <button class=" rounded-lg border-2 py-2 px-4 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 "
            @click="buy(goodsDetali, mid,router)">立即购买</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Header from '@/component/header.vue';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getGoodsDetail } from '../component/order';
import { changeGoodsDetail } from '@/lib/utils';
import { buy, pushCart } from './common';
import { useRouter } from 'vue-router'

let router = useRouter()
const goods = ref([])
const goodsDetali = ref()
const gid = ref() //货物的gid
const mid = ref() //自己的uid
onBeforeMount(() => {
  const router = useRoute()
  gid.value = router.params.gid
  mid.value = localStorage.getItem('uid')
  // console.log(router.params)
  const res = getGoodsDetail(gid.value)
  console.log('res',res)
  res.then((result) => {
    // console.log(result[0])
    goods.value = changeGoodsDetail(result[0])
    goodsDetali.value = result[0]
  })
})


</script>