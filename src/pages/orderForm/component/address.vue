<template>
    <div class=" my-6 mx-auto w-10/12">
        <div class=" mt-6 pb-12 border-b-2">
            <div class=" mb-2">
                <h1 class=" text-lg">联系方式</h1>
            </div>
            <div class=" w-full h-9">
                <div class=" text-sm">Contact information</div>
                <input class=" w-full border-2 h-full rounded focus:outline-none" type="text">
            </div>
        </div>

        <div class=" my-6 bor-b-2">
            <div class="grid grid-cols-2 gap-3 pb-8">
                <div class="w-full">
                    <div>
                        <h1 class=" text-lg">姓</h1>
                    </div>
                    <div class=" w-full h-9">
                        <div class=" text-sm">First name</div>
                        <input class=" w-full border-2 h-full rounded focus:outline-none" type="text">
                    </div>
                </div>

                <div class="w-full">
                    <div>
                        <h1 class=" text-lg">名</h1>
                    </div>
                    <div class=" w-full h-9">
                        <div class=" text-sm">Last name</div>
                        <input class=" w-full border-2 h-full rounded focus:outline-none" type="text">
                    </div>
                </div>
            </div>

            <div class="w-full pb-8">
                <div>
                    <h1 class=" text-lg">所在地区</h1>
                </div>
                <div class=" w-full h-9">
                    <div class=" text-sm">Area</div>
                    <input class=" w-full border-2 h-full rounded focus:outline-none" type="text">
                </div>

            </div>

            <div class="w-full pb-8">
                <div>
                    <h1 class=" text-lg">详细住址</h1>
                </div>
                <div class=" w-full h-9">
                    <div class=" text-sm">Full address</div>
                    <input class=" w-full border-2 h-full rounded focus:outline-none" type="text">
                </div>
            </div>

            <div class="w-full pt-8">
                <div class=" flex justify-items-end">
                    <label for="address" class=" ml-2" @click="enabled = !enabled">默认收货地址</label>

                    <Switch v-model="enabled" :class="enabled ? 'bg-teal-700 ' : 'bg-white'"
                        class="relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-slate-300 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <span class="sr-only">Use setting</span>
                        <span aria-hidden="true" :class="enabled ? 'translate-x-5' : 'translate-x-0 bg-red-600 '"
                            class="pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
                    </Switch>

                </div>
            </div>


        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>
