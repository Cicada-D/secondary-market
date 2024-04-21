<template>
  <div class=" bg-black text-sm">
    <div class=" mx-6 py-2 flex justify-between">
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
    </div>
    <header class=" bg-white relative">
      <div class=" flex justify-between mx-6 py-2 border-b-2">
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
        <PopoverGroup class=" leading-[35px] hidden lg:flex text-sm font-semibold to-gray-900">
          <Popover v-for='items in menu' :key="items.id" class="mx-3">
            <PopoverButton class=" outline-none mx-2 text-gray-500 hover:text-gray-950 focus:text-gray-950">{{ items.name }}</PopoverButton>

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


        <!-- <div v-for="item in menu" :key="item.id" class="mx-3">
            <router-link to="#">
              {{ item.name }}
            </router-link>
          </div> -->
        <!-- </div> -->

        <!-- other -->
        <div class="leading-[35px] hidden lg:flex text-sm font-semibold to-gray-900">
          <div class=" mx-2 ">
            Search
          </div>
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
    </header>
  </div>

</template>

<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel, PopoverGroup } from '@headlessui/vue'
const menu = [
  {
    id: '1',
    name: '服装',
    children: [
      {
        id: '1.1',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
      {
        id: '1.2',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
      {
        id: '1.3',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
      {
        id: '1.4',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
    ]
  },
  {
    id: '2',
    name: '服装',
    children: [
      {
        id: '1.1',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
    ]
  },
  {
    id: '3',
    name: '服装',
    children: [
      {
        id: '1.1',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
    ]
  }, {
    id: '4',
    name: '服装',
    children: [
      {
        id: '1.1',
        name: '流行女装',
        children: [
          {
            id: '1.1.1',
            name: '当季热卖'
          },
          {
            id: '1.1.2',
            name: '当季热卖'
          },
          {
            id: '1.1.3',
            name: '新品推荐'
          },
          {
            id: '1.1.4',
            name: '连衣裙'
          },
          {
            id: '1.1.5',
            name: '衬衫'
          },
        ]
      },
    ]
  },
]

// const open = ref(false)
</script>