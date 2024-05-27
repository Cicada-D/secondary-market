<template>
    <productExhibition :products="goods"></productExhibition>
</template>

<script setup>
// import content from '../../../component/content.vue';
import { onBeforeMount, ref, provide, onMounted, onUnmounted, watch } from 'vue';

import productExhibition from '../../../component//productExhibition.vue';
import { changeGoodsDataType } from '@/lib/utils';
import { getGoodsByType_10, getMachGoods, getGoodsByTypeAndInput } from './common';

const props = defineProps(["inputValue"])

watch(
    props,
    async () => {
        console.log(props.inputValue.length)
        if (props.inputValue.length != 0) {
            const res = await getGoodsByTypeAndInput('二手数码', props.inputValue)
            // console.log("res: ", res)
            goods.value = changeGoodsDataType(res)
        } else {
            baseGid.value = 0
            const res = await getGoodsByType_10(baseGid.value, '二手数码', 12)
            if (res.length != 0) {
                goods.value = changeGoodsDataType(res)
                baseGid.value = goods.value[goods.value.length - 1].id
            }
        }

    },
)
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
    if (Object.keys(goods).length != 0) {
        addEventListener("wheel", () => {
            getMachGoods(box, goods, baseGid, '二手数码') //监听的元素，展示的物品，从baseGid开始
        }, { signal: controller.signal });
    }
})


const controller = new AbortController();
onMounted(() => {



})
onUnmounted(() => {
    controller.abort()
})

// console.log(goods.value)
</script>