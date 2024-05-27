<script setup>
import ContentOne from './content/contentOne.vue'
import Header from '../../component/header.vue'
import { onMounted, ref } from 'vue';
const icon = ref()
onMounted(() => {
    icon.value = localStorage.getItem('icon')
})
</script>

<template>
    <Header :icon="icon"></Header>
    <ContentOne></ContentOne>
</template>
