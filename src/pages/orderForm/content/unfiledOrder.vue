<template>
    <div v-if="goods != undefined" class=" w-full rounded-md py-8">
        <orderTable :goods="goods" :title="title"></orderTable>
    </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import orderTable from '../component/orderTable.vue'
import { getUnfiledOrder } from './common';
import { changeAllOrderData } from '@/lib/utils';
const goods = ref()
// const active = ref(false)
const title = ref('未完成订单')
console.log(goods.value)

onBeforeMount(async () => {
    const res = await getUnfiledOrder(localStorage.getItem('uid'))
    // console.log(res)
    goods.value = changeAllOrderData(res)

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