<template>
    <div v-if="goods != undefined " class=" w-full rounded-md py-8">
        <orderTable :goods="goods" :title="title"></orderTable>
    </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import orderTable from '../component/orderTable.vue'
import { getCompeletOrder } from './comment';
import { changeAllOrderData } from '@/lib/utils';
const goods = ref()
// const active = ref(false)
const title = ref('已完成订单')
// console.log(goods.value)

onBeforeMount(async () => {
    const res = await getCompeletOrder(localStorage.getItem('uid'))
    // console.log(res)
    goods.value = changeAllOrderData(res)
    // res.then((result) => {
    //     console.log(result)  
    //     goods.value = changeAllOrderData(result)
    //     console.log(goods.value)
    // })
    // console.log('123', goods.value)
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