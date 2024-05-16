<template>
    <div class=" flex items-center hover:bg-slate-200  border-2 ">
        <div class=" mx-2">
            <Avatar size="icon">
                <AvatarImage :src="props.toUser.formIcon" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div class=" mr-2 flex-1 flex flex-col justify-between h-10 my-4">
            <div class="flex justify-between">
                <div class=" text-base">
                    {{ props.toUser.name }}
                </div>
                <div class=" text-xs text-slate-400 leading-6">
                    {{ props.toUser.createTime }}
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
</script>