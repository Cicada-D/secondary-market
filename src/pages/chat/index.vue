<template>
    <Header :icon="user.icon"></Header>
    <div class=" flex w-[1000px] h-[600px] rounded-md mx-auto ">
        <div class=" flex flex-col">
            <div v-for="item in toUser" :key="item.id" class="w-72">
                <ToUser :toUser="item" @click="changeCart(item)"></ToUser>
            </div>
        </div>

        <div class=" flex-1">
            <div v-if="good.length != 0" class=" w-full ">
                <div class=" relative rounded-md border-2  bg-white">
                    <div class=" mx-4 mt-2 mb-4 flex ">
                        <div class=" min-w-16">
                            <AspectRatio :ratio="16 / 9">
                                <a :href="splitRouter('http://localhost:5173/index/goodsDetail', good[0].gid)"
                                    class=" rounded-md absolute block w-full top-0 bg-slate-400 opacity-100 hover:opacity-75">
                                    <img :src='"../" + good[0].image' alt="Image" class="rounded-md object-cover">
                                </a>
                            </AspectRatio>
                        </div>
                        <div class="  mx-2 flex-grow">
                            <ul>
                                <li class=" mb-1">{{ good[0].name }}</li>
                                <li class=" text-sm font-light">{{ good[0].state }}</li>
                                <li class=" text-sm font-light overflow-hidden text-ellipsis max-h-10">{{
                                    good[0].describe
                                    }}
                                </li>
                                <li class=" text-sm font-light translate-y-4">{{ good[0].createTime }}</li>
                            </ul>

                        </div>
                        <div class=" flex flex-col justify-between">
                            <div v-show="!changeSignl" class=" text-sm text-end">
                                {{ good[0].price }} $
                            </div>
                            <div v-show="changeSignl" class=" w-full">
                                <input class="border-2 rounded-md w-full text-end px-2" type="text"
                                    v-model="changePrice" :placeholder="good[0].price + '$'">
                            </div>
                            <div v-if="userSignl == true" class=" text-sm text-end">
                                <button v-show="!changeSignl" @click="changeSignl = true"
                                    class=" ring-2 px-1 transition-all bg-blue-500 hover:ring-blue-600 hover:bg-blue-700 hover:ring-offset-1 text-white ring-offset-0 rounded-md">修改价格</button>
                                <button v-show="changeSignl" @click="pushChangePrice"
                                    class=" ring-2 px-1 transition-all bg-blue-500 hover:ring-blue-600 hover:bg-blue-700 hover:ring-offset-1 text-white ring-offset-0 rounded-md">确认修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatContent :message="message" :selectUser="selectUser" :user="user" @transferMessage="getMessage">
            </ChatContent>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
// import { useRouter } from 'vue-router';
import Header from '../../component/header.vue'
import ToUser from './component/toUser.vue';
import ChatContent from './component/chatContent.vue';
import { getGoodOrder, getToUser, getToUserAllMessage, pushMessage, sortMessage } from './component/common';
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { locationCreate, splitRouter } from '@/lib/utils';

//传给子组件chatContent的消息
const message = reactive({ value: [] })
const socket = new WebSocket(`ws://localhost:3001?username=${localStorage.getItem('uid')}`)
//有过对话的用户，传给toUser组件的内容
const toUser = reactive([])
//当前用户的信息
const user = reactive({
    id: localStorage.getItem('uid'),
    name: `${localStorage.getItem('name')}`,
    icon: localStorage.getItem('icon'),
})
//修改价格的标识符的标识符
const changeSignl = ref(false)
//用户是不是卖家
const userSignl = ref()
//修改后的价格
const changePrice = ref()
//选取的聊天对象
const selectUser = reactive({
    value: {}
})
const good = reactive([])
onBeforeMount(async () => {
    const res = await getToUser(localStorage.getItem('uid'))
    // console.log('res: ', res)

    const result = []
    for (const item of res.result) {
        const id = item.formId == localStorage.getItem('uid') ? item.toId : item.formId
        const name = item.formId == localStorage.getItem('uid') ? item.toName : item.formName
        const icon = item.formId == localStorage.getItem('uid') ? item.toIcon : item.formIcon
        result.push({
            id: id,
            name: name,
            formIcon: icon,
            newMessage: item.message,
            createTime: item.createTime
        })
    }
    // console.log(result)
    toUser.push(...result)
    // console.log(res)
})


onMounted(() => {
    socket.onopen = function () {
        console.log("WebSocket connection established");
    };

    socket.onmessage = function (event) {
        const res = JSON.parse(event.data)
        console.log("webSocket返回的event", res)
        console.log("selectUser: ", selectUser.value.id)
        if (res.formId === selectUser.value.id) {
            console.log(123)
            if ("newPrice" in res) {
                
                good[0].price = res.newPrice
            } else {
                message.value = [...message.value, res]
            }
        }
    }
    socket.onclose = function () {
        console.log("WebSocket connection closed");
    };
    socket.onerror = function (error) {
        console.error("WebSocket error:", error);
    };
})

onBeforeUnmount(() => {
    socket.onclose()
})

// {
// formId: 1,
// name: "张三",
// toId: 4,
// toIcon: '',
// message: '你好!',
// createTime: '123'
// }

// 选择交流对象
async function changeCart(data) {
    selectUser.value = data
    // console.log('data: ', data)
    const result = await getToUserAllMessage(data.id, localStorage.getItem('uid'))
    sortMessage(result.result)
    console.log('result: ', result.result[0].gid)

    const goodRes = await getGoodOrder(result.result[0].formId, result.result[0].gid)
    console.log('goodsRes: ', goodRes)
    good.pop()
    good.push(goodRes[0])
    good[0].image = good[0].image.split(',')[0]
    if (result.result[0].toId === parseInt(localStorage.getItem('uid'))) {
        userSignl.value = true
    } else {
        userSignl.value = false
    }

    const map = []
    for (const item of result.result) {
        const temp = {
            formId: item.formId,
            name: item.formName,
            toId: item.toId,
            toIcon: item.toIcon,
            message: item.message,
            createTime: item.createTime,
        }
        map.push(temp)
    }
    message.value = sortMessage(map)
}

// 提交更改后的价格
async function pushChangePrice() {
    const price = changePrice.value ? changePrice.value : 0
    const uid = selectUser.value.id
    const gid = good[0].gid
    await fetch(locationCreate('orderPriceChange'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid, gid, price })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('查找失败!', { cause: 0 })
            }
            return response.json()
        })
        .then((data) => {
            good[0].price = changePrice.value
            socket.send(JSON.stringify({ newPrice: price, toId: uid, formId: parseInt(localStorage.getItem('uid')) }));
            return data
        })
        .catch((error) => {
            console.error(error) // 错误消息
            return error.cause
        })
    changeSignl.value = false
}
// 获取当前输入的信息并发送到服务端和聊天对象
async function getMessage(value) {
    if (Object.keys(selectUser.value).length != 0) {
        const valueMessage = {
            formId: value.formId,
            name: value.formName,
            toId: value.toId,
            toIcon: '',
            message: value.message,
            createTime: value.createTime,
        }
        console.log("fu", value)
        message.value = [...message.value, valueMessage]
        // console.log(message.value)
        const res = await pushMessage(value)
        console.log('pushmessage res: ', res)
        socket.send(JSON.stringify(valueMessage));
    }
}

</script>