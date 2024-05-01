<template>
    <div v-if="goods != undefined " class=" w-full ounded-md py-8">
        <orderTable  :goods="goods" :title="title"></orderTable>
    </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'

import OrderTable from '../component/orderTable.vue';
import { getSalePending } from './common';
import { changesalePending } from '@/lib/utils';
const goods = ref()
// const active = ref(false)
const title = ref('待出售')
// console.log(goods.value)

onBeforeMount(async () => {
    await getSalePending(localStorage.getItem("uid")).then((res) => {
        // console.log('res', res.data)
        goods.value = changesalePending(res.data)
    })
    // console.log('goods',goods.value)
})
onMounted(() => {
    watchEffect(() => {
        // 在 goods.value 变化时执行逻辑
        console.log('goods.value updated:', goods.value);
        // setTimeout(() => {
        //     active.value = true
        // }, 500);
    });
})
</script>