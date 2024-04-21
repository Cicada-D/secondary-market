<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar' 
import { inject } from 'vue';

// const avatarNot = inject('avatarNot')
const reload = inject('reload')
function quit(){
  localStorage.removeItem('token')
  // avatarNot.value = !avatarNot.value 
  reload()
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar :size="'base'" class=" border-2 ">
        <AvatarImage src="https://avatars.githubusercontent.com/u/98377372?v=4" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>个人信息</DropdownMenuItem>
      <DropdownMenuItem>购物车</DropdownMenuItem>
      <DropdownMenuItem>订单</DropdownMenuItem>
      <DropdownMenuItem @click="quit()">退出</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>