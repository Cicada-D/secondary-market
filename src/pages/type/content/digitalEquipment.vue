<template>
    <productExhibition :products="goods"></productExhibition>
</template>

<script setup>
// import content from '../../../component/content.vue';
import { onBeforeMount, ref, provide } from 'vue';
import productExhibition from '../../../component//productExhibition.vue';
import { changeGoodsDataType } from '@/lib/utils';
import { getGoodsByType_10, getMachGoods } from './common';


const baseGid = ref(0)
const goods = ref([])
const box = ref(null)
provide('box', box)
onBeforeMount(async () => {
    const res = await getGoodsByType_10(baseGid.value, '二手数码', 12)
    if (res.length != 0) {
        goods.value = changeGoodsDataType(res)
        baseGid.value = goods.value[goods.value.length - 1].id
    }
})


addEventListener("wheel", () => {
    getMachGoods(box, goods, baseGid, '二手数码') //监听的元素，展示的物品，从baseGid开始
});

// console.log(goods.value)
</script>