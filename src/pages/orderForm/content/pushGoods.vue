<template>
    
    <Header></Header>
    <ContentVue>
        <template v-slot:push>
            <div class=" w-3/4 min-w-96 bg-slate-50 mx-auto rounded-xl overflow-hidden border-2">
                <GoodForm class="my-4 mx-8" ></GoodForm>
            </div>
        </template>
    </ContentVue>
</template>

<script setup>
import ContentVue from "@/component/content.vue";
import GoodForm from "../component/goodForm.vue";
import Header from '@/component/header.vue';

</script>