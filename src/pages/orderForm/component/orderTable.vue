<template>
    <div class=" relative mx-8 bg-slate-50 border-2 rounded-md px-6 py-4">
        <div class="pb-6 flex justify-between">
            <h1>{{ props.title }}</h1>
            <router-link v-if="props.title == '待出售'"  to="/index/order/pushGoods">
                <Plus ></Plus>
            </router-link>
        </div>
        <div class=" w-full  ">
            <div v-for="(item, index) in props.goods" :key="index" class=" relative rounded border-b-2 mt-2 bg-white">
                <div class=" m-4 w-10/12 flex">
                    <div class=" mt-3 min-w-32">
                        <AspectRatio :ratio="16 / 9">
                            <img :src='item.imgSrc' alt="Image" class="rounded-md object-cover">
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

                    <div class=" absolute right-6 top-6 h-32">
                        <div>
                            <button class=" group">
                                <svg t="1712586588076" class="icon " viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1540" width="20" height="20">
                                    <path class=" group-hover:fill-slate-500"
                                        d="M861.184 192.512q30.72 0 50.688 10.24t31.744 25.6 16.384 33.28 4.608 33.28q0 7.168-0.512 11.264t-0.512 7.168l0 6.144-67.584 0 0 537.6q0 20.48-8.192 39.424t-23.552 33.28-37.376 23.04-50.688 8.704l-456.704 0q-26.624 0-50.176-8.192t-40.448-23.04-26.624-35.84-9.728-47.616l0-527.36-63.488 0q-1.024-1.024-1.024-5.12-1.024-5.12-1.024-31.744 0-13.312 6.144-29.696t18.432-30.208 31.744-23.04 46.08-9.216l91.136 0 0-62.464q0-26.624 18.432-45.568t45.056-18.944l320.512 0q35.84 0 49.664 18.944t13.824 45.568l0 63.488q21.504 1.024 46.08 1.024l47.104 0zM384 192.512l320.512 0 0-64.512-320.512 0 0 64.512zM352.256 840.704q32.768 0 32.768-41.984l0-475.136-63.488 0 0 475.136q0 21.504 6.656 31.744t24.064 10.24zM545.792 839.68q17.408 0 23.552-9.728t6.144-31.232l0-475.136-63.488 0 0 475.136q0 40.96 33.792 40.96zM738.304 837.632q18.432 0 24.576-9.728t6.144-31.232l0-473.088-64.512 0 0 473.088q0 40.96 33.792 40.96z"
                                        p-id="1541" fill="#bfbfbf"></path>
                                </svg>
                            </button>

                        </div>
                    </div>

                    <div v-if="props.title != '待出售'"
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

            <div class=" w-11/12 mx-auto m-2 h-9" v-if="props.title != '待出售'">
                <button
                    class=" bg-indigo-600 text-white w-full h-full rounded-md hover:bg-indigo-700 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-indigo-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-700">确定订单</button>
            </div>
        </div>



    </div>
</template>

<script setup>

import { reactive } from 'vue';
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Plus } from 'lucide-vue-next';
const props = defineProps(['goods', 'title'])

const states = reactive(new Array(props.goods.length).fill(true))

function changeStates(index) {
    states[index] = !states[index]
    console.log(states[index])
    console.log(index)
}



</script>
