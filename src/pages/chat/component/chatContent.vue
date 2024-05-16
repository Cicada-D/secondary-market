<template>
    <div class="  bg-slate-50 h-full flex flex-col">
        <!-- 展示界面 -->
        <div class=" flex-1 overflow-auto">
            <div v-for="item in props.message.value" :key="item.createTime">
                <div class=" flex mx-2 mt-4" :class="{ 'flex-row-reverse': item.formId == props.user.id }">
                    <Avatar size="icon">
                        <AvatarImage :src="getAvatarSrc(item.formId)" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div class=" flex flex-col max-w-[80%]">
                        <div class="text-sm text-slate-500" :class="{ 'text-end': item.formId == props.user.id }">
                            {{ item.name }}
                        </div>
                        <div class=" mt-2 border-2 rounded-md bg-white">
                            {{ item.message }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 输入界面 -->
        <div class=" h-40 border-2 flex flex-col">
            <textarea name="" id="" class=" bg-slate-50 w-full h-full resize-none p-4" v-model="newMessage"></textarea>
            <div class=" text-end">
                <button class=" mx-2" @click="pushMessage">发送</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { reactive, ref } from 'vue';


const props = defineProps(['message', 'user', 'selectUser'])
const emit = defineEmits(['transferMessage'])
const newMessage = ref('')
function getAvatarSrc(formId) {
    if (formId == props.selectUser.value.id) {
        return props.selectUser.value.formIcon
    } else {
        return props.user.icon
    }
}
// {
//     formId: 1,
//     name: "张三",
//     toId: 4,
//     toIcon: '',
//     message: '你好!',
//     createTime: '123'
// }
function pushMessage() {
    if (newMessage.value === '') alert('输入不为空!')
    else {
        console.log('newMessage', newMessage.value)
        const news = reactive({
            formId: props.user.id,
            name: props.user.name,
            toId: props.selectUser.value.id,
            message: newMessage.value,
            toIcon: '',
            createTime: '9878'
        })
        emit("transferMessage", news)
    }

}
</script>