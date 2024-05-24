<template>
    <ContentVue>
        <template v-slot:push>
            <div class=" w-3/4 min-w-96 bg-slate-50 mx-auto rounded-xl overflow-hidden border-2">
                <GoodForm :good="good" class="my-4 mx-8"></GoodForm>
            </div>
        </template>
    </ContentVue>
</template>

<script setup>
import ContentVue from "@/component/content.vue";
import { locationCreate, splitGETURL } from "@/lib/utils";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import GoodForm from "../component/goodForm.vue";
const route = useRoute()
const good = ref()
onBeforeMount(async () => {
    console.log(route.query)
    const gid = route.query.gid
    const res = await fetch(locationCreate(splitGETURL("findGoods", { gid: gid }))).then((response) => {
        if (!response.ok) {
            throw new Error('查询失败!', { cause: 0 })
        }
        return response.json()
    })
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(error) // 错误消息
            return error.cause
        })
    console.log('res: ', res)
    good.value = res
})
</script>