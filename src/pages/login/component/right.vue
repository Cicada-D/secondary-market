<template>
    <div :class='topClass'>
        <div class=" absolute top-9 right-9">
            <Button variant="ghost" @click="changeState" class=" group">
                {{ title }}
                <ArrowRight :size="16" class="group-hover:rotate-90 transition-all duration-300" />
            </Button>
        </div>
        <div
            class=" absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 flex flex-col items-center">
            <div class=" text-2xl font-semibold tracking-tight">
                Create an account
            </div>
            <div class="text-sm text-muted-foreground">
                Enter your email below to create your account
            </div>
            <div class=" mt-6 w-full mb-2">
                <Input type="text" placeholder="Your telephone" v-model="user.username"
                    class=" focus-visible:ring-1 focus-visible::outline-none w-full focus-visible:ring-offset-0 " />
                <Input v-if="titleState" type="password" placeholder="Your password" v-model="user.password"
                    class="mt-2 focus-visible:ring-1 focus-visible::outline-none w-full focus-visible:ring-offset-0 " />
            </div>
            <div class=" w-full">
                <Button v-if="!titleState" class=" w-full" @click="Register(user, router)">
                    Sign in with Telephone
                </Button>
                <Button v-if="titleState" class="  w-full" @click="Login(user, router)">
                    Login in with Telephone
                </Button>
            </div>
            <div class="my-5 flex">
                <p class="  text-xs">OR CONTINUE WITH</p>
            </div>
            <div class="w-full">
                <RouterLink to="index/home">
                    <Button variant="ghost" class=" w-full bg-white border-2 text-black hover:bg">
                        <Github :size="20" class=" mr-2" />
                        Github
                    </Button>
                </RouterLink>
            </div>
            <div class=" mt-2 flex ">
                <p class=" text-xs flex flex-col">
                    By clicking continue, you agree to our Terms of Service and Privacy Policy .
                </p>
            </div>
        </div>
    </div>

</template>

<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/counter'
import { Github, ArrowRight } from 'lucide-vue-next'
import { Login, Register } from './Login'

import { useRouter } from 'vue-router'

const router = useRouter()

const topClass = ref(' absolute w-1/2 h-full bg-white rounded-lg right-0 top-0 border-2 border-l-0')

const store = useStateStore()
const { state } = storeToRefs(store)
const { changeState } = store
const title = ref('Login')
const titleState = ref(false)
 
const user = reactive({
    username: '',
    password: '',
    token: ''
})
watch(
    state,
    (state, oldState) => {
        if (oldState) {
            topClass.value = ' absolute w-1/2 h-full bg-white rounded-lg right-0 top-0 border-2  transition-transform -translate-x-full duration-1000  '
            setTimeout(() => {
                title.value = 'Sign'
                titleState.value = !titleState.value
            }, 350);
        } else {
            topClass.value = ' absolute w-1/2 h-full bg-white rounded-lg right-0 top-0 border-2  transition-transform duration-1000 '
            setTimeout(() => {
                title.value = 'Login'
                titleState.value = !titleState.value
            }, 350);
        }
        console.log(oldState)
    }
)
</script>