<style scoped>
.left-enter-active,
.left-leave-active {
    transition: all 0.5s ease-out;
}

.left-enter-from {
    opacity: 0;
    transform: translateX(60px);
}

.left-leave-to {
    opacity: 0;
    transform: translateX(-60px);
}

.right-enter-active,
.right-leave-active {
    transition: all 0.5s ease-out;
}

.right-enter-from {
    opacity: 0;
    transform: translateX(-60px);
}

.right-leave-to {
    opacity: 0;
    transform: translateX(60px);
}
</style>
<template>
    <headerTwo v-model="linkIndex" :menu="menu"></headerTwo>
    <div class=" relative mx-8 my-4 ">
        <router-view v-slot="{ Component }">
            <transition :name="direction">
                <component :is="Component" class=" absolute"></component>
            </transition>
        </router-view>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import headerTwo from '../../component/headerTwo.vue'
const direction = ref('left')

const menu = [
    {
        id: '1',
        name: '全部订单',
        href: '/index/order/allorder'
    },
    {
        id: '2',
        name: '已完成订单',
        href: '/index/order/completeOrder'
    }, {
        id: '3',
        name: '未完成订单',
        href: '/index/order/unfiledOrder'

    }, {
        id: '4',
        name: '出售商品',
        href: '/index/order/salePending'
    }, {
        id: '5',
        name: '待发货',
        href: '/index/order/ship'
    }
]
const linkIndex = ref(0)
watch(
    [linkIndex],
    (newValue, oldValue) => {
        // console.log('new',newValue[0])
        // console.log('old',oldValue[0])
        newValue = newValue[0]
        oldValue = oldValue[0]
        if ( newValue > oldValue){
            direction.value = 'right'
            
        }else if( newValue < oldValue){
            direction.value = 'left'
        }
        // console.log('des',direction.value)
    }
)
</script>