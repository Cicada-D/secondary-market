<template>
    <Content>
        <template v-slot:cart>
            <div class=" w-11/12 min-w-96 mx-auto rounded-xl overflow-hidden border-2">
                <div class="grid grid-cols-1 lg:grid-cols-2 bg-white ">
                    <GoodsSelect :projects="goods"/>
                    <TotalMonay />
                </div>
            </div>
        </template>
    </Content>
</template>
<script setup>
import TotalMonay from '../component/totalMonay.vue';
import Content from '@/component/content.vue';
import GoodsSelect from '../component/goodsSelect.vue';
import { onBeforeMount, ref } from 'vue';
import { getShoppingCart } from './common';
import { changeGoodsDataType } from '@/lib/utils';

const goods = ref([])

onBeforeMount(async () => {
    const res = await getShoppingCart(localStorage.getItem('uid'))
    // console.log('res',res)
    goods.value = changeGoodsDataType(res)
    console.log('goods',goods.value)
})
</script>