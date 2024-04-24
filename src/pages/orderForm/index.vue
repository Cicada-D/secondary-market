<template>
    <headerTwo :menu="menu"></headerTwo>
</template>
<script setup>
import headerTwo from '../../component/headerTwo.vue'
const menu = [
    {
        id: '1',
        name: '全部订单'
    },
    {
        id: '2',
        name: '已支付订单'
    },{
        id: '3',
        name: '未支付订单'
    },{
        id: '4',
        name: '已出售订单'
    },{
        id: '5',
        name: '待出售订单'
    },
]
</script>