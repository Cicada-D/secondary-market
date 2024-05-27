<template>
    <div class=" relative mx-8 bg-slate-50 border-2 rounded-md px-6 py-4">
        <div class="pb-6 flex justify-between ">
            <div class=" flex items-center">
                <h1>{{ props.title }}</h1>
            </div>
            <router-link v-if="props.title == '待出售'" to="/index/order/pushGoods">
                <Plus></Plus>
            </router-link>
            <div v-if="signl != 4" class=" text-sm ">
                <button v-if="signl == 2 && !delectAllCompleteOrderSignl && states.length != 0" @click="selectAll"
                    class=" border-2 px-2 py-2 rounded-md bg-slate-700 hover:bg-black text-white">删除全部</button>

                <button v-if="signl == 2 && delectAllCompleteOrderSignl" @click="delectCompleteOrder"
                    class=" border-2 px-2 py-2 rounded-md bg-red-500 hover:bg-red-700 text-white">确定删除</button>
                <button v-if="signl == 2 && delectAllCompleteOrderSignl" @click="unSelectAll"
                    class=" border-2 px-2 py-2 rounded-md  bg-blue-500 hover:bg-blue-700 text-white">取消删除</button>

                <button v-if="signl == 3 && states.length != 0" @click="toCompleteOrder"
                    class=" border-2 px-2 py-2 rounded-md bg-slate-700 hover:bg-black text-white">订单完成</button>
            </div>
        </div>
        <div class=" w-full  ">
            <div v-for="(item, index) in props.goods" :key="index" class=" relative rounded border-b-2 mt-2 bg-white">
                <div class=" m-4 w-10/12 flex">
                    <div class=" mt-3 min-w-32">
                        <AspectRatio :ratio="16 / 9">
                            <a v-if="signl != 4" href="#"
                                class=" rounded-md absolute block w-full top-0 bg-slate-400 opacity-100 hover:opacity-75">
                                <img :src='item.imgSrc' alt="Image" class="rounded-md object-cover">
                            </a>
                            <a v-if="signl == 4" :href="splitRouter('http://localhost:5173/index/goodsDetail', item.id)"
                                class=" rounded-md absolute block w-full top-0 bg-slate-400 opacity-100 hover:opacity-75">
                                <img :src='item.imgSrc' alt="Image" class="rounded-md object-cover">
                            </a>
                        </AspectRatio>
                    </div>
                    <div class=" m-2 flex-grow">
                        <ul>
                            <li class=" mb-1">{{ item.name }}</li>
                            <li class=" text-sm font-light">{{ item.style }}</li>
                            <li class=" text-sm font-light overflow-hidden text-ellipsis max-h-10">{{ item.describe }}
                            </li>
                            <li class=" text-sm font-light translate-y-4">{{ item.createTime }}</li>
                            <li class=" mt-9">{{ item.price }}</li>
                        </ul>
                    </div>
                    
                    <div v-if="signl == 2 || signl == 3"
                        class="absolute right-6 bottom-6 w-5 h-5 border-2 hover:border-slate-400 rounded-xl flex justify-center items-center"
                        :class="{
                            'border-slate-400': !states[index],
                            'border-slate-200': states[index]
                        }" @click="changeStates(index)">
                        <div :class="{
                            'w-3/4 h-3/4 bg-black rounded-md': !states[index],
                            'w-3/4 h-3/4 bg-white rounded-md': states[index]
                        }"> </div>
                    </div>
                </div>
            </div>
        </div>
        <ErrorPage v-if="!Object.keys(props.goods).length"></ErrorPage>
    </div>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue';
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Plus } from 'lucide-vue-next';
import ErrorPage from '@/pages/errorPage.vue';
import { locationCreate, splitRouter } from '@/lib/utils';
import { useRoute } from 'vue-router';
import router from '@/router';

const props = defineProps(['goods', 'title'])
console.log(props.goods)
const states = reactive(new Array(props.goods.length).fill(true))

function changeStates(index) {
    states[index] = !states[index]
    console.log(states[index])
    console.log(index)
}

const route = useRoute()
const signl = ref()
const delectAllCompleteOrderSignl = ref(false)
console.log('route: ', route)


onMounted(() => {
    if (route.name == 'allorder') {
        signl.value = 1
    } else if (route.name == 'completeOrder') {
        signl.value = 2
    } else if (route.name == 'unfiledOrder') {
        signl.value = 3
    } else if (route.name == 'salePending') {
        signl.value = 4
    }
})

async function toCompleteOrder() {
    const selectGoods = []
    for (let i = 0; i < props.goods.length; i++) {
        if (!states[i]) {
            selectGoods.push(props.goods[i].id)
        }
    }
    await fetch(locationCreate('toCompleteOrder'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: selectGoods })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('改变失败!', { cause: 0 })
            }
            return response.json()
        })
        .then((data) => {
            router.replace({ name: 'completeOrder' })
            return data
        })
        .catch((error) => {
            console.error(error) // 错误消息
            return error.cause
        })
}

function selectAll() {
    delectAllCompleteOrderSignl.value = !delectAllCompleteOrderSignl.value
    for (let i = 0; i < props.goods.length; i++) {
        states[i] = false
    }
}

function unSelectAll() {
    delectAllCompleteOrderSignl.value = !delectAllCompleteOrderSignl.value
    for (let i = 0; i < props.goods.length; i++) {
        states[i] = true
    }
}
async function delectCompleteOrder() {
    const selectGoods = []
    for (let i = 0; i < props.goods.length; i++) {
        if (!states[i]) {
            selectGoods.push(props.goods[i].id)
        }
    }
    await fetch(locationCreate('delectCompleteOrder'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: selectGoods })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('改变失败!', { cause: 0 })
            }
            return response.json()
        })
        .then((data) => {
            router.replace({ name: 'allorder' })
            return data
        })
        .catch((error) => {
            console.error(error) // 错误消息
            return error.cause
        })
}

watch(
    () => states,
    (newValue, oldValue) => {
        console.log(newValue)
        console.log(oldValue)
    }
)
</script>
