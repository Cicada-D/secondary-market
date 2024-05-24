<template>
    <header class="bg-white border-b-2 rounded-sm w-full">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-16" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="/index/home" class="-m-1.5 p-1.5">
                    <span class="sr-only">Your Company</span>
                    <svg t="1712327317856" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1277" width="35" height="35">
                        <path
                            d="M514.048 75.1616c-242.1248 0-439.1424 197.0176-439.1424 439.1424s197.0176 439.1424 439.1424 439.1424 439.1424-197.0176 439.1424-439.1424-197.0176-439.1424-439.1424-439.1424z m0 816.8448c-208.2816 0-377.7024-169.4208-377.7024-377.7024 0-208.2816 169.4208-377.7024 377.7024-377.7024s377.7024 169.4208 377.7024 377.7024c0 208.2816-169.4208 377.7024-377.7024 377.7024z"
                            fill="#1296db" p-id="1278"></path>
                        <path
                            d="M514.048 787.0464c-132.1984 0-243.0464-94.976-267.6224-220.3136l42.8544 21.6064 27.648-54.8864-91.1872-45.9264a31.72864 31.72864 0 0 0-30.8736 1.3824 31.77472 31.77472 0 0 0-14.9504 26.9824c0.8192 183.3984 150.7328 332.5952 334.1824 332.5952 90.9824 0 176.0256-35.8912 239.4624-101.12l-44.032-42.8544c-51.8656 53.248-121.2416 82.5344-195.4816 82.5344zM514.048 180.1728c-87.1936 0-169.6768 33.3824-232.2944 93.952l42.7008 44.1856c51.0976-49.4592 118.4256-76.6976 189.5936-76.6976 133.0688 0 244.5312 96.2048 268.1344 222.8224l-56.3712-25.7536-25.5488 55.8592 103.0144 47.104c4.2496 1.9968 8.8064 2.9696 13.312 2.9696 5.9392 0 11.8784-1.6896 17.0496-5.0688a31.3344 31.3344 0 0 0 14.4896-26.7264c-0.7168-183.4496-150.6304-332.6464-334.08-332.6464z"
                            fill="#1296db" p-id="1279"></path>
                        <path
                            d="M406.6816 548.3008v61.44h71.2192v32.3072h61.44v-32.3072h71.168v-61.44h-71.168v-31.232h71.168v-61.44h-44.9024l30.9248-37.1712-47.2576-39.2704-42.9568 51.6608-45.7216-49.8688-45.312 41.5232 30.4128 33.1264h-39.0144v61.44h71.2192v31.232z"
                            fill="#1296db" p-id="1280"></path>
                    </svg>
                </a>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <RouterLink :to="{name: 'index'}" active-class="text-gray-950" class="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950 ">
                    首页</RouterLink>
                <RouterLink :to="{name: 'type'}" class="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950 ">
                    分类</RouterLink>
                <RouterLink :to="{name: 'order'}" class="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">订单
                </RouterLink>
                <RouterLink :to="{name: 'chat'}" class="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">聊天
                </RouterLink>
                <RouterLink :to="{name: 'shoppingCart'}" class="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">购物车
                </RouterLink>
                
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <RouterLink to="/login" v-if="!avatarNot" href="#"
                    class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span>
                </RouterLink>
                <DropdownHead :image="props.icon" v-if="avatarNot"></DropdownHead>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <DropdownHead v-if="avatarNot"></DropdownHead>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">首页</a>

                            <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                                <DisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    分类
                                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                                        aria-hidden="true" />
                                </DisclosureButton>
                                <DisclosurePanel class="mt-2 space-y-2">
                                    <DisclosureButton v-for="item in [...type]" :key="item.name" as="a"
                                        :href="item.href"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        {{ item.name }}</DisclosureButton>
                                </DisclosurePanel>
                            </Disclosure>

                            <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                                <DisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    订单
                                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                                        aria-hidden="true" />
                                </DisclosureButton>
                                <DisclosurePanel class="mt-2 space-y-2">
                                    <DisclosureButton v-for="item in [...orders]" :key="item.name" as="a"
                                        :href="item.href"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        {{ item.name }}</DisclosureButton>
                                </DisclosurePanel>
                            </Disclosure>
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">购物车</a>
                        </div>
                        <div class="py-6" v-if="!avatarNot">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Login
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon} from '@heroicons/vue/20/solid'
import { RouterLink } from 'vue-router'
import DropdownHead from './dropdownHead.vue'

const avatarNot = ref(0)
const props = defineProps(['icon'])

provide('avatarNot', avatarNot)

onMounted(() => {
    const token = localStorage.getItem('token')
    avatarNot.value = token === '1' ? 1 : 0
})

const mobileMenuOpen = ref(false)
</script>