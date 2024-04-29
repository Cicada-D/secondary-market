<template>
  <productExhibition :products="goods"></productExhibition>
</template>

<script setup>
// import content from '../../../component/content.vue';
import { onBeforeMount, ref, onMounted, nextTick, provide } from 'vue';
import productExhibition from '../../../component//productExhibition.vue';

import { changeGoodsData } from '@/lib/utils';
import { getGoods_10, getBottom } from './common';



// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: 'http://localhost:5173/index/orderDetail',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   // More products...
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 4,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 5,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 6,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 7,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 8,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
// ]

const baseGid = ref(0)
const goods = ref([])
onBeforeMount(async () => {
  const res = await getGoods_10(baseGid.value, 12)
  goods.value = changeGoodsData(res)
  baseGid.value = goods.value[goods.value.length - 1].id
})

const box = ref(null)
provide('box', box)




onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      const height = box.value.clientHeight;
      console.log("元素的高度是：" + height + "px");
    }, 100); // 增加一些延迟，确保元素高度被正确计算
  });
});



addEventListener("wheel", () => {
  getBottom(box, goods, baseGid) //监听的元素，展示的物品，从baseGid开始
});



// console.log(goods.value)
</script>