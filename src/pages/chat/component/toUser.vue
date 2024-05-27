<template>
    <div class=" flex items-center hover:bg-slate-200 border-2 rounded-md ">
        <div class=" mx-2">
            <Avatar size="icon">
                <AvatarImage :src="BaseUtl + props.toUser.formIcon" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div class=" mr-2 flex-1 flex flex-col justify-between h-10 my-4">
            <div class="flex justify-between">
                <div class=" text-base">
                    {{ props.toUser.name }}
                </div>
                <div class=" text-xs text-slate-400 leading-6">
                    {{ convertToMonths(props.toUser.createTime) }}
                </div>
            </div>
            <div class=" h-4 text-sm text-slate-400">
                {{ props.toUser.newMessage }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps(['toUser'])
const BaseUtl = '../'

// 将时间转换成月份
const convertToMonths = (createTime) => {
    // 创建一个 Date 对象
    let date = new Date(parseInt(createTime));


    // let year = date.getFullYear();

    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    // let seconds = date.getSeconds().toString().padStart(2, '0');

    const res = `${month}-${day} ${hours}:${minutes}`
    return res
}
</script>