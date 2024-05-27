<template>
    <Header :icon="icon"></Header>
    <ShoppingCart></ShoppingCart>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import ShoppingCart from './content/text.vue'
import Header from '@/component/header.vue';
const icon = ref()
onMounted(() => {
    icon.value = localStorage.getItem('icon')
})
</script>