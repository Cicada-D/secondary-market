<template>
    <Header></Header>
    <Content>
        <template v-slot:order>
            <div class=" w-11/12 min-w-96 bg-slate-50 mx-auto rounded-xl overflow-hidden border-2">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <Address />
                    <GoodsToBuy />
                </div>
            </div>
        </template>
    </Content>
</template>
<script setup>
import Header from '@/component/header.vue';
import Content from '@/component/content.vue';
import Address from '../component/address.vue';
import GoodsToBuy from '../component/goodsToBuy.vue';

</script>