<template>
    <productExhibition :products="goods"></productExhibition>
</template>

<script setup>
// import content from '../../../component/content.vue';
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue';
import productExhibition from '../../../component//productExhibition.vue';

import { changeGoodsData } from '@/lib/utils';
import { getGoodsByType_10 } from './common';


const baseGid = ref(0)  
const goods = ref([])
onBeforeMount(() => {
    const res = getGoodsByType_10(baseGid.value, '二手车')
    res.then((result) => {
        // console.log(result)
        goods.value = changeGoodsData(result)
        // console.log(goods.value)
    })
})

onMounted(() => {
    watchEffect(() => {
        // 在 goods.value 变化时执行逻辑
        console.log('goods.value updated:', goods.value);
    });
})
// console.log(goods.value)
</script>