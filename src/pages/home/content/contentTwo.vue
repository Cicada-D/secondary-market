<template>
    <!-- <form action="#" class=" h-full flex"> -->
    <div class=" flex rounded-md border-2 shadow-lg w-[600px] h-[700px] m-auto">
        <div ref="formDetail" class=" relative w-3/4 h-5/6  m-auto ">
            <p class="text-2xl">
                输入你的信息:
            </p>
            <div :class="{ 'opacity-0 ': index.num != 0 }"
                class=" absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] m-auto duration-300 ">
                <div>
                    <p class=" text-xl" :class="{ 'text-red-500': errors.includes(0) }">你的名字:</p>
                    <input type="text" class=" border-2 border-slate-100 rounded-md px-4 py-2" placeholder="输入你的名字"
                        v-model="userDetail.name">
                </div>
            </div>
            <div class="  absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] m-auto w-1/2 duration-300"
                :class="{ 'opacity-0 ': index.num != 1 }">
                <p class=" text-xl " :class="{ 'text-red-500': errors.includes(1) }"> 你的性别: </p>
                <div class=" w-full flex justify-between my-4">
                    <input class=" translate-x-3" type="radio" id="man" name="sex" v-model="userDetail.sex" value="男">
                    <input class=" translate-x-1" type="radio" id="woman" name="sex" v-model="userDetail.sex" value="女">
                    <input class=" -translate-x-3" type="radio" id="undetermined" name="sex" v-model="userDetail.sex"
                        value="待定">
                </div>
                <div class=" flex justify-between">
                    <label for="man">
                        <svg t="1716216711354" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4579" width="35" height="35">
                            <path
                                d="M1023.6 17.9c-0.1-0.7-0.4-1.3-0.6-1.9-0.2-0.8-0.4-1.5-0.7-2.2-0.3-0.8-0.7-1.4-1.1-2.1-0.3-0.6-0.6-1.1-0.9-1.7-1.6-2.4-3.7-4.5-6.2-6.2-0.5-0.4-1.1-0.6-1.7-0.9-0.7-0.4-1.4-0.8-2.1-1.1-0.7-0.3-1.5-0.5-2.2-0.7-0.7-0.2-1.3-0.4-2-0.6-1.4-0.3-2.8-0.4-4.1-0.4H734.6c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3H948L667.7 324.8c-70.9-63.5-164.5-102.2-267-102.2C179.8 222.6 0 402.4 0 623.3S179.8 1024 400.7 1024s400.7-179.8 400.7-400.7c0-102.5-38.7-196.1-102.2-267L979.5 76v213.4c0 12.3 10 22.3 22.3 22.3s22.3-10 22.3-22.3V22.3c-0.1-1.5-0.3-3-0.5-4.4zM400.7 979.5c-196.4 0-356.2-159.8-356.2-356.2s159.8-356.2 356.2-356.2 356.2 159.8 356.2 356.2-159.8 356.2-356.2 356.2z"
                                p-id="4580" fill="#63b9e6"></path>
                        </svg>
                    </label>
                    <label for="woman">
                        <svg t="1716217043909" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5855" width="35" height="35">
                            <path
                                d="M623.3 0C402.4 0 222.6 179.8 222.6 400.7c0 102.5 38.7 196.1 102.2 267l-169 169L38 718.9c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5l117.8 117.8L6.5 986c-8.7 8.7-8.7 22.8 0 31.5 4.3 4.3 10 6.5 15.7 6.5s11.4-2.2 15.7-6.5l117.8-117.8 117.8 117.8c4.3 4.3 10 6.5 15.7 6.5s11.4-2.2 15.7-6.5c8.7-8.7 8.7-22.8 0-31.5L187.3 868.2l169-169c70.9 63.5 164.5 102.2 267 102.2 220.9 0 400.7-179.8 400.7-400.7S844.2 0 623.3 0z m0 756.9c-196.4 0-356.2-159.8-356.2-356.2S426.9 44.5 623.3 44.5s356.2 159.8 356.2 356.2-159.8 356.2-356.2 356.2z"
                                p-id="5856" fill="#fabcda"></path>
                        </svg>
                    </label>

                    <label for="undetermined">
                        <svg t="1716217153453" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9194" width="35" height="35">
                            <path
                                d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0c95 0 187.7 26.2 268.2 75.8 18.5 11.4 24.3 35.7 12.9 54.2-11.3 18.5-35.6 24.3-54.2 12.9-68.1-42-146.5-64.1-226.9-64.1C273.1 78.8 78.8 273.1 78.8 512S273.1 945.2 512 945.2 945.2 750.9 945.2 512c0-48.3-7.9-95.7-23.4-141.1-7.1-20.6 3.8-43 24.5-50 20.4-7.2 43 3.8 50 24.5C1014.7 399 1024 455 1024 512c0 282.3-229.7 512-512 512z"
                                p-id="9195" fill="#8a8a8a"></path>
                            <path
                                d="M447.6 300.6c-21.5 0-39.4 17.3-39.4 39.4v240.3c0 11.7 6.7 22.4 17.2 27.5l61.5 30 167 81.4c5.8 2.6 11.6 4.2 17.3 4.2 14.7 0 28.4-8.4 35.7-22.1 9.4-19.4 1.1-43.1-18.4-52.5L504 558.5c-10.5-5.1-17.2-15.8-17.2-27.5V340c0.2-22-17.1-39.4-39.2-39.4z"
                                p-id="9196" fill="#8a8a8a"></path>
                        </svg>
                    </label>
                </div>
            </div>
            <div class=" absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] m-auto"
                :class="{ 'opacity-0 ': index.num != 2 }">
                <div>
                    <p class="text-xl" :class="{ 'text-red-500': errors.includes(2) }"> 你的住址: </p>
                    <input type="text" class=" border-2 border-slate-100 rounded-md px-4 py-2" v-model="userDetail.sit"
                        placeholder="不方便输入就不用填">
                </div>
            </div>
            <div class=" absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] m-auto flex items-center duration-300"
                :class="{ 'opacity-0 ': index.num != 3 }">
                <p class=" text-xl mr-2" :class="{ 'text-red-500': errors.includes(3) }">你的年龄:</p>
                <input type="text" class=" border-2 w-11 border-slate-100 rounded-md px-1" v-model="userDetail.age"
                    placeholder="多少">
                <p class=" text-xl ml-1">岁</p>
            </div>
            <div class=" absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] m-auto duration-300"
                :class="{ 'opacity-0 ': index.num != 4 }">
                <div>
                    <p class="text-xl" :class="{ 'text-red-500': errors.includes(4) }"> 自我描述: </p>
                    <textarea name="" id="" class="border-2 w-60 max-h-40 border-slate-100 rounded-md px-1 "
                        v-model="userDetail.describe" placeholder="不超过50字"></textarea>
                </div>
            </div>
            <div class="  absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] m-auto w-3/4 h-1/3 duration-300"
                :class="{ ' hidden ': index.num != 5 }">
                <p class=" text-xl" :class="{ 'text-red-500': errors.includes(5) }"> 上传头像: </p>
                <div class=" rounded-md border-2 w-full h-full flex items-center justify-center">
                    <label for="fileImage" v-if="images.file.length == 0" class="text-indigo-600">Upload
                        a Icon
                        <input ref="uploadInput" type="file" name="fileImage" id="fileImage" multiple class="sr-only"
                            @change="handleFileChange">
                    </label>

                    <div v-for="(imageSrc, index) in images.file" :key="index" class="mr-2">
                        <img :src="imageSrc" alt="Uploaded Image" class=" max-h-44" @click="delectImage(index)">
                    </div>
                </div>
                <label for="fileImage" v-if="images.file.length != 0" class="text-indigo-600">Change
                    a Icon
                    <input ref="uploadInput" type="file" name="fileImage" id="fileImage" multiple class="sr-only"
                        @change="handleFileChange">
                </label>
            </div>
            <button @click="lastForm"
                class=" absolute bottom-0 left-0 border-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-950 text-white ">
                上一项
            </button>
            <button @click="nextForm" v-if="index.num != count - 1"
                class=" absolute bottom-0 right-0 border-2 px-4 py-2 rounded-md hover:bg-slate-200">
                下一项
            </button>
            <button @click="pushForm" v-if="index.num == count - 1"
                class=" absolute bottom-0 right-0 border-2 px-4 py-2 rounded-md hover:bg-slate-200">
                提交
            </button>
        </div>
    </div>
    <!-- </form> -->
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue"

const userDetail = ref({
    name: '',
    sex: '',
    age: '',
    image: '',//在后面是用Icon表示用户头像
    describe: '',
    sit: '',
})
const formDetail = ref()
const count = ref(0)
const index = ref({
    num: 0,
    sign: 1,
})
const errors = ref([]);
const images = reactive({
    file: []
})
const uploadInput = ref(null);
onMounted(() => {
    count.value = formDetail.value.children.length - 3
})
//验证表单
const validateForm = () => {
    errors.value = []
    // 验证 name
    if (!userDetail.value.name.trim()) {
        index.value.num = 0
        errors.value.push(index.value.num)
    }

    // 验证 sex
    if (!['男', '女', '待定'].includes(userDetail.value.sex)) {
        index.value.num = 1
        errors.value.push(index.value.num)

    }

    // 验证 age
    const age = parseInt(userDetail.value.age, 10);
    if (isNaN(age) || age < 0) {

        index.value.num = 3
        errors.value.push(index.value.num)

    }

    // 验证 image
    if (userDetail.value.image) {

        index.value.num = 5
        errors.value.push(index.value.num)

    }

    // 验证 describe
    if (!userDetail.value.describe.trim()) {

        index.value.num = 4
        errors.value.push(index.value.num)

    }

    // 验证 sit
    if (!userDetail.value.sit.trim()) {

        index.value.num = 2
        errors.value.push(index.value.num)

    }
    if (errors.value.length !== 0)
        index.value.num = errors.value[0]
    return errors.value.length === 0 ? true : false;
};

// 提交表单信息
function pushForm() {
    if (validateForm()) {
        console.log('successful!')
    } else {
        console.log("fail!")
    }
    console.log(errors.value)
}
//展示图片
const handleFileChange = () => {
    if( images.file.length != 0){
        images.file.pop()
        userDetail.value.image = []
    }
    // console.log(uploadInput.value.files)
    // 确保 uploadInput 不为 null
    if (uploadInput.value) {
        const files = uploadInput.value.files;
        console.log(files)
        if (userDetail.value.image.length == 0) {
            userDetail.value.image = [uploadInput.value.files[0]]
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

//上一项
function lastForm() {
    if (index.value.num > 0) {
        index.value.num--
        index.value.sign = 0
    }
}
//下一项
function nextForm() {
    if (index.value.num < count.value - 1) {
        index.value.num++
        index.value.sign = 1
    }
}
watch(() => uploadInput.value, () => {
    handleFileChange();
});
</script>