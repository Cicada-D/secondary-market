<template>
    <Header></Header>
    <Content>
        <template v-slot:menu>
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <Address />
                <GoodsToBuy />
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