<template>
    <div class=" bg-slate-50 h-full flex flex-col">
        <!-- 展示界面 -->
        <div ref="showPage" class=" flex-1 overflow-auto">
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
                        <p class=" mt-2 border-2 rounded-md bg-white max-w-[600px] break-words px-2 py-1">
                            {{ item.message }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 输入界面 -->
        <div class=" h-40 border-2 flex flex-col">
            <textarea ref="text" name="" id="" class=" bg-slate-50 w-full h-full resize-none p-4"
                v-model="newMessage"></textarea>
            <div class=" text-end">
                <button class=" mx-2" @click="sendMessage">发送</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { nextTick, onMounted, reactive, ref, watch } from 'vue';


const props = defineProps(['message', 'user', 'selectUser'])
const emit = defineEmits(['transferMessage'])
const newMessage = ref('')
const showPage = ref(null)
const text = ref(null)

onMounted(() => {
    text.value.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            pushMessage()
            newMessage.value = ''
            event.preventDefault()
        }
    })
    scrollToBottom()
})

const scrollToBottom = () => {
    nextTick(() => {
        showPage.value.scrollTop = showPage.value.scrollHeight

    })
}

// 判断当前的头像
function getAvatarSrc(formId) {
    if (formId == props.selectUser.value.id) {
        return '../' + props.selectUser.value.formIcon
    } else {
        return '../' + props.user.icon
    }
}

function pushMessage() {
    console.log(props.selectUser)
    // console.log(props.user)
    if (newMessage.value === '') alert('输入不为空!')
    else {
        const createTime = Date.now()
        console.log('newMessage', newMessage.value)
        const news = reactive({
            formId: parseInt(props.user.id),
            formName: props.user.name,
            formIcon: props.user.icon,

            toId: parseInt(props.selectUser.value.id),
            toName: props.selectUser.value.name,
            toIcon: props.selectUser.value.formIcon,

            message: newMessage.value,
            createTime: createTime
        })
        emit("transferMessage", news)
    }
}
watch( props.message , () => {
    scrollToBottom()
})


</script>