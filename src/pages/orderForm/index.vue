<template>
    <headerTwo :menu="menu"></headerTwo>
    <router-view></router-view>
</template>
<script setup>
import headerTwo from '../../component/headerTwo.vue'
const menu = [
    {
        id: '1',
        name: '全部订单',
        href: '/index/order/allorder'
    },
    {
        id: '2',
        name: '已完成订单',
        href: '/index/order/allorder'
    }, {
        id: '3',
        name: '未完成订单',
        href: '/index/order/allorder'

    }, {
        id: '4',
        name: '待出售订单',
        href: '/index/order/salePending'
    }
]
</script>