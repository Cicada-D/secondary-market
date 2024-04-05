<script setup>
import { RouterView } from 'vue-router'
import Header from '../../conponent/header.vue'

</script>

<template>
    <Header />
    
        <!-- <router-view name="home" v-slot="{ Component }">
            <component :is="Component" />
        </router-view> -->
    <router-view ></router-view>
    
</template>
