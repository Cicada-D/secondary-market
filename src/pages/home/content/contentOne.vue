<template>
  <productExhibition :products="goods"></productExhibition>
</template>

<script setup>
// import content from '../../../component/content.vue';
import { onBeforeMount, ref, provide, onMounted, onUnmounted } from 'vue';
import productExhibition from '../../../component//productExhibition.vue';
import { changeGoodsData } from '@/lib/utils';
import { getGoods_10, getMachGoods } from './common';

const baseGid = ref(0)
const goods = ref([])

const box = ref(null)
provide('box', box)
onBeforeMount(async () => {
  const res = await getGoods_10(baseGid.value, localStorage.getItem('uid'),  12)
  if (res.length !== 0){
    goods.value = changeGoodsData(res)
    baseGid.value = goods.value[goods.value.length - 1].id
  }

})

const controller = new AbortController();

onMounted(() => {
  addEventListener("wheel", () => {
    getMachGoods(box, goods, baseGid, localStorage.getItem('uid')) //监听的元素，展示的物品，从baseGid开始
  },{ signal: controller.signal } );
})

onUnmounted(() => {
  controller.abort()
})

</script>