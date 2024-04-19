<template>
    <div :class='topClass'>
        <div class=" absolute top-9 right-9">
            <Button variant="ghost" @click="changeState">
                {{ title }}
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
                <Input type="text" placeholder="Your telephone"
                    class=" focus-visible:ring-1 focus-visible::outline-none w-full focus-visible:ring-offset-0 " />
                <Input v-if="titleState" type="text" placeholder="Your telephone"
                    class=" focus-visible:ring-1 focus-visible::outline-none w-full focus-visible:ring-offset-0 " />
            </div>
            <div class=" w-full">
                <Button class=" w-full">
                    Sign in with Telephone
                </Button>
            </div>
            <div class=" my-5 flex">

                <p class="  text-xs">OR CONTINUE WITH</p>

            </div>
            <div class="w-full">
                <Button variant="ghost" class=" w-full bg-white border-2 text-black hover:bg">
                    Sign in with Telephone
                </Button>
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


import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/counter'

// const props = defineProps({
//     class: { type: null, required: false },
// })
// const state = ref(true)
const topClass = ref(' absolute w-1/2 h-full bg-white rounded-lg right-0 top-0 border-2 border-l-0')
// const changeState = () => {
//     state.value = !state.value
// }
const store = useStateStore()
const { state } = storeToRefs(store)
const { changeState } = store
const title = ref('Login')
const titleState = ref(false)
console.log(state.value)    
watch(
    state,
    (state, oldState) => {
        if (oldState) {
            topClass.value = ' absolute w-1/2 h-full bg-white rounded-lg right-0 top-0 border-2 border-l-0 transition-transform -translate-x-full duration-1000  '
            setTimeout(() => {
                title.value = 'Sign'
                titleState.value = !titleState.value
            }, 350);
        } else {
            topClass.value = ' absolute w-1/2 h-full bg-white rounded-lg right-0 top-0 border-2 border-l-0 transition-transform duration-1000 '
            setTimeout(() => {
                title.value = 'Login'
                titleState.value = !titleState.value
            }, 350);
        }
        console.log(oldState)
    }
)
</script>