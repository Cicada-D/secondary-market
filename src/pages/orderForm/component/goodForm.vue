<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">出售商品</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">下面的描述是你出售商品展示的公共内容</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="goodsName" class="block text-sm font-medium leading-6 text-gray-900">物品名称</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input type="text" name="goodsName" id="goodsName" autocomplete="goodsName"
                  class="bg-white rounded-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="GoodsName" v-model="goods.name" />
              </div>
            </div>

            <label for="price" class="block text-sm font-medium leading-6 text-gray-900 mt-4">期望价格</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input type="text" name="price" id="price" autocomplete="price"
                  class=" bg-white rounded-md block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Price" v-model="goods.price" />
              </div>
            </div>

            <div class=" w-full grid-cols-2 grid">
              <label for="type" class="block text-sm font-medium leading-6 text-gray-900 mt-4">类型</label>
              <label for="level" class="block text-sm font-medium leading-6 text-gray-900 mt-4">新旧程度</label>

              <div class="mt-2 mr-2">
                <!-- <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="type" id="type" autocomplete="type"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Price" />
                </div> -->
                <Select name="type" id="type" autocomplete="type" v-model="goods.type">
                  <SelectTrigger class=" w-10/12">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Title</SelectLabel>
                      <SelectItem value="二手车">
                        二手车
                      </SelectItem>
                      <SelectItem value="二手数码">
                        二手数码
                      </SelectItem>
                      <SelectItem value="二手服装">
                        二手服装
                      </SelectItem>
                      <SelectItem value="其他">
                        其它
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="mt-2 ">
                <!-- <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="level" id="level" autocomplete="level"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Price" />
                </div> -->
                <Select name="level" id="level" autocomplete="level" v-model="goods.level">
                  <SelectTrigger class="w-10/12">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Level</SelectLabel>
                      <SelectItem value="没有用过">
                        没有用过
                      </SelectItem>
                      <SelectItem value="用过几次">
                        用过几次
                      </SelectItem>
                      <SelectItem value="用了一年">
                        用了一年
                      </SelectItem>
                      <SelectItem value="用了很久">
                        用了很久
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">物品描述</label>
            <div class="mt-2">
              <textarea id="about" name="about" rows="3" v-model="goods.describe"
                class=" px-2 min-h-16 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-500">描写你的商品的内容，让买家更好的了解</p>
          </div>

          <div class="col-span-full">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">图片展示</label>
            <div
              class="mt-2 flex justify-center rounded-lg flex-wrap border border-dashed border-gray-900/25 px-6 py-10">
              <div class="text-center" v-if="images.file.length == 0">
                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" type="file" ref="uploadInput" multiple @change="handleFileChange"
                      name="file-upload" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>

              <div v-for="(imageSrc, index) in images.file" :key="index" class="mr-2">
                <img :src="imageSrc" alt="Uploaded Image" class=" max-h-44" @click="delectImage(index)">
              </div>
            </div>
            <div v-if="images.file.length != 0">
              <label for="file-upload"
                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Add some files</span>
                <input id="file-upload" type="file" ref="uploadInput" multiple @change="handleFileChange"
                  name="file-upload" class="sr-only" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="submit" class="text-sm font-semibold leading-6 text-gray-900" >Cancel</button>
      <button type="button" @click="pushGoods(goods, 'addGoods').then(()=>{router.push({ name: 'salePending'})})"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
  </form>


</template>

<script setup>
import { PhotoIcon } from '@heroicons/vue/24/solid'
import { ref, reactive, watch } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { pushGoods } from './order';
import router from '@/router';
const uploadInput = ref(null);

const goods = reactive({
  name: null,
  describe: null,
  type: null,
  level: null,
  price: null,
  image: [], // 上传的图片的URL数组
});
const images = reactive({
  file: []
})

// 监听文件变化
const handleFileChange = () => {
  // 确保 uploadInput 不为 null
  if (uploadInput.value) {
    const files = uploadInput.value.files;
    // console.log(files)
    if (goods.image.length == 0) {
      goods.image = [...uploadInput.value.files]

    }
    // 遍历每个文件
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // console.log(file)
      // 检查是否为图片
      if (file && file.type.startsWith('image/')) {


        const reader = new FileReader();

        // 读取文件内容
        reader.onload = (e) => {
          // 将图片数据添加到数组中
          images.file.push(e.target.result);

        };

        // 读取文件内容
        reader.readAsDataURL(file);
      }
    }
  }
};

function delectImage(index) {
  if (images.file.length >= 0) {
    const left = images.file.slice(0, index)
    const right = images.file.slice(index + 1)

    images.file = [...left, ...right]
  } else {
    alert('图片已经没有了!')
  }
}



// 监听上传图片的input元素变化
watch(() => uploadInput.value, () => {
  handleFileChange();
});

</script>