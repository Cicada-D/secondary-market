<script setup>
import { provide, ref, nextTick } from 'vue';
import { RouterView } from 'vue-router'

const isRouterAlive = ref(true)
provide('reload', reload)
function reload () {
  isRouterAlive.value = false
  nextTick(()=>{
    isRouterAlive.value = true
  })
}
</script>

<template>
    <router-view v-if="isRouterAlive"/>
</template>

<style scoped></style>
