<template>
    <div :class="topClass">
        <div class="flex items-center text-lg font-medium absolute top-9 left-9">
            <svg t="1713520868582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1425" id="mx_n_1713520868583" width="28" height="28">
                <path
                    d="M514.048 75.1616c-242.1248 0-439.1424 197.0176-439.1424 439.1424s197.0176 439.1424 439.1424 439.1424 439.1424-197.0176 439.1424-439.1424-197.0176-439.1424-439.1424-439.1424z m0 816.8448c-208.2816 0-377.7024-169.4208-377.7024-377.7024 0-208.2816 169.4208-377.7024 377.7024-377.7024s377.7024 169.4208 377.7024 377.7024c0 208.2816-169.4208 377.7024-377.7024 377.7024z"
                    fill="#ffffff" p-id="1426"></path>
                <path
                    d="M514.048 787.0464c-132.1984 0-243.0464-94.976-267.6224-220.3136l42.8544 21.6064 27.648-54.8864-91.1872-45.9264a31.72864 31.72864 0 0 0-30.8736 1.3824 31.77472 31.77472 0 0 0-14.9504 26.9824c0.8192 183.3984 150.7328 332.5952 334.1824 332.5952 90.9824 0 176.0256-35.8912 239.4624-101.12l-44.032-42.8544c-51.8656 53.248-121.2416 82.5344-195.4816 82.5344zM514.048 180.1728c-87.1936 0-169.6768 33.3824-232.2944 93.952l42.7008 44.1856c51.0976-49.4592 118.4256-76.6976 189.5936-76.6976 133.0688 0 244.5312 96.2048 268.1344 222.8224l-56.3712-25.7536-25.5488 55.8592 103.0144 47.104c4.2496 1.9968 8.8064 2.9696 13.312 2.9696 5.9392 0 11.8784-1.6896 17.0496-5.0688a31.3344 31.3344 0 0 0 14.4896-26.7264c-0.7168-183.4496-150.6304-332.6464-334.08-332.6464z"
                    fill="#ffffff" p-id="1427"></path>
                <path
                    d="M406.6816 548.3008v61.44h71.2192v32.3072h61.44v-32.3072h71.168v-61.44h-71.168v-31.232h71.168v-61.44h-44.9024l30.9248-37.1712-47.2576-39.2704-42.9568 51.6608-45.7216-49.8688-45.312 41.5232 30.4128 33.1264h-39.0144v61.44h71.2192v31.232z"
                    fill="#ffffff" p-id="1428"></path>
            </svg>
            <p>二手咸鱼</p>
        </div>
        <p class=" absolute mx-9 bottom-9 ">
            "二手交易不仅仅是一种经济行为，更是一种文化，一种生活方式。在这里，我们推崇节俭、分享和环保，让生活更有意义。"
        </p>
    </div>
</template>
<script setup>

import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/counter'
import { ref, watch } from 'vue'

const store = useStateStore()
const { state } = storeToRefs(store)
const topClass = ref('  absolute w-1/2 h-full text-white left-0 top-0  rounded-lg  bg-black z-10 ')
watch(
    state,
    (state, newState) => {
        if (!newState) {
            topClass.value = ' absolute w-1/2 h-full text-white left-0 top-0  rounded-lg bg-black z-10  transition-transform duration-1000  '
        } else {
            topClass.value = 'absolute w-1/2 h-full text-white left-0 top-0  rounded-lg bg-black z-10  transition-transform translate-x-full duration-1000 '
        }
        console.log(topClass.value)

    }
)
</script>