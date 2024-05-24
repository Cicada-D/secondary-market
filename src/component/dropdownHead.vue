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
import router from '@/router';
const props = defineProps(['image'])
// const avatarNot = inject('avatarNot')
const reload = inject('reload')
function quit() {
  localStorage.removeItem('token')
  localStorage.removeItem('uid')
  // avatarNot.value = !avatarNot.value 
  router.push({
    name: 'login'
  })
  reload()
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar :size="'base'" class=" border-2 ">
        <AvatarImage :src='props.image' alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>

        <RouterLink to="/index/userDetail"
          class=" w-full h-full text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">个人信息
        </RouterLink>

      </DropdownMenuItem>
      <DropdownMenuItem>
        <RouterLink to="/index/shoppingCart"
          class=" w-full h-full text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">
          购物车
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <RouterLink to="/index/chat"
          class=" w-full h-full text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">聊天
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <RouterLink to="/index/order"
          class=" w-full h-full text-sm font-semibold leading-6 text-gray-500 hover:text-gray-950">订单
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem @click="quit()">退出</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>