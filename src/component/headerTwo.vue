<template>
  <div class=" top-0 bg-black text-sm ">
    <!-- <div class=" mx-6 py-2 flex justify-between">
      <div class=" text-white">
        CAD >
      </div>
      <div class=" text-white flex ">
        <div class=" mx-4">
          Sign in
        </div>
        <div>
          Create an account
        </div>
      </div>
    </div> -->
    <div class=" bg-white ">
      <div class=" flex justify-between mx-6 py-2 border-b-2 relative">
        <!-- image -->
        <div class="">
          <a href="/index/home" class="">
            <!-- <span class="sr-only">Your Company</span> -->
            <svg t="1712327317856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1277" width="35" height="35">
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

        <!-- menu -->
        <!-- <div class=""> -->
        <PopoverGroup v-if="state" class=" left-1/2 translate-x-[50%] leading-[35px] hidden lg:flex text-sm font-semibold to-gray-900">
          <Popover v-for='items in props.menu' :key="items.id" class="mx-3">
            <PopoverButton class=" outline-none mx-2 text-gray-500 hover:text-gray-950 focus:text-gray-950">{{
              items.name }}</PopoverButton>

            <PopoverPanel class="absolute z-10 left-2 w-full pr-4 bg-white top-20 flex justify-center">
              <div class=" flex border-b-2 mx-4 w-10/12 justify-start">
                <div v-for='item in items.children' :key='item.id' class=" w-1/4 flex flex-col mr-7 ml-4">
                  <p>{{ item.name }}</p>
                  <ul v-for="Item in item.children" :key="Item.id" class=" font-medium">
                    <li> {{ Item.name }}</li>
                  </ul>
                </div>
              </div>

            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        <div v-if="!state" class=" absolute left-1/2 -translate-x-1/2 leading-[35px] hidden lg:flex text-sm font-semibold to-gray-900">
          <div v-for='items in props.menu' :key="items.id" class="mx-3">
            <router-link @click="changeLinkIndex(items.id)" active-class="text-gray-950"
              class=" outline-none mx-2 text-gray-500 hover:text-gray-950 focus:text-gray-950 " :to="items.href"> {{
              items.name }}</router-link>
            <!-- <button class=" outline-none mx-2 text-gray-500 hover:text-gray-950 focus:text-gray-950">{{ items.name }}</button> -->
          </div>
        </div>
        <div class="leading-[35px] hidden lg:flex text-sm font-semibold to-gray-900">
          <button class=" mx-2 " @click="inputSignl = !inputSignl">
            Search
          </button>
          <div class=" mx-2">
            Help
          </div>
          <div class=" mx-2">
            <a href="#" class="group flex items-center mt-1">
              <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true" />
              <div class="ml-2 mt-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</div>
              <div class="sr-only">items in cart, view bag</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="inputSignl" class=" absolute  top-16 left-1/2 -translate-x-[50%]">
      <input type="text" class=" border-2 w-96 h-12 rounded-md text-xl px-3" v-model="inputValue" placeholder="输入关键词"
        @input="emit('headerInput', inputValue)">
    </div>
  </div>

</template>

<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel, PopoverGroup } from '@headlessui/vue'
import { onBeforeMount, ref } from 'vue';
const props = defineProps(['menu', 'linkIndex'])
const emit = defineEmits(["headerInput"])
const model = defineModel()
// 输入框标识符
const inputSignl = ref(false)
// 输入框内容
const inputValue = ref()
const state = ref(1)
onBeforeMount(() => {
  if (props.menu[0].children) {
    state.value = 1
  } else {
    state.value = 0
  }
})
function changeLinkIndex(index) {
  model.value = index
}

</script>