<template>
    <Header></Header>
    <div class=" flex w-[1000px] h-[600px] rounded-md mx-auto ">
        <div class=" flex flex-col">
            <div v-for="item in toUser" :key="item.id" class="w-72">
                <ToUser :toUser="item" @click="changeCart(item)"></ToUser>
            </div>
        </div>
        <div class=" flex-1">
            <ChatContent :message="message" :selectUser="selectUser" :user="user" @transferMessage="getMessage">
            </ChatContent>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, reactive } from 'vue';
// import { useRouter } from 'vue-router';
import Header from '../../component/header.vue'
import ToUser from './component/toUser.vue';
import ChatContent from './component/chatContent.vue';
import { getToUser, getToUserAllMessage, pushMessage, sortMessage } from './component/common';


//静态消息

//传给子组件chatContent的消息
const message = reactive({ value: [] })
const socket = new WebSocket(`ws://localhost:3001?username=${localStorage.getItem('uid')}`)

//有过对话的用户，传给toUser组件的内容
const toUser = reactive([])
//当前用户的信息
const user = reactive({
    id: localStorage.getItem('uid'),
    name: `${localStorage.getItem('name')}`,
    icon: 'https://avatars.githubusercontent.com/u/98377372?v=4',
})

//选取的聊天对象
const selectUser = reactive({
    value: {}
})

onBeforeMount(async () => {
    const res = await getToUser(localStorage.getItem('uid'))
    // console.log('res: ', res)

    const result = []
    for (const item of res.result) {
        const id = item.formId == localStorage.getItem('uid') ? item.toId : item.formId
        const name = item.formId == localStorage.getItem('uid') ? item.toName : item.formName
        result.push({
            id: id,
            name: name,
            formIcon: item.formIcon,
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
            // console.log(123)
            message.value = [...message.value, res]
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
    const result = await getToUserAllMessage(data.id)
    // console.log('result: ', result.result)

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