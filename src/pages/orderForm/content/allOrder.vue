<template>
    <div class=" mx-8 my-4 rounded-md py-8">
        <orderTable v-if="active" :goods="goods" :title="title"></orderTable>
    </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import orderTable from '../component/orderTable.vue'
import { findAllOrder } from './comment';
import { changeAllOrderData } from '@/lib/utils';
const goods = ref()
const active = ref(false)
const title = ref('全部订单')
console.log(goods.value)

onBeforeMount(async () => {
    const res = await findAllOrder(localStorage.getItem('uid'))
    console.log(res)
    goods.value = changeAllOrderData(res)
    // res.then((result) => {
    //     console.log(result)
    //     goods.value = changeAllOrderData(result)
    //     console.log(goods.value)
    // })
    console.log('123',goods.value)
})
onMounted(() => {
    watchEffect(() => {
        // 在 goods.value 变化时执行逻辑
        console.log('goods.value updated:', goods.value);
        setTimeout(() => {
            active.value = true
        }, 500);
    });
})
</script>