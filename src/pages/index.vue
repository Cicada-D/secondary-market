<script setup>
import { RouterView } from 'vue-router'
import Header from '../conponent/header.vue'

</script>

<template>
    <Header></Header>
    <div>
        <router-view ></router-view>
    </div>
</template>
