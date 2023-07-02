<script setup lang="ts">
import logo from "../assets/logo.svg"
import Input from "../components/common/Input.vue"
import Button from "../components/common/Button.vue"
import { ref } from "vue"

const email = ref('')
const password = ref('')

const onSubmit = () => {
    console.log(email.value, password.value)
}
</script>

<template>
    <div class="w-[448px] h-[467px] flex-col justify-start items-center gap-8 inline-flex">
        <div class="self-stretch h-[87px] flex-col justify-start items-center gap-6 flex">
            <div class="justify-start items-center gap-2 inline-flex">
                <div class="w-6 h-[24px] relative"><img :src="logo" alt="logo" /></div>
                <div class="text-gray-900 text-[18px] font-semibold leading-relaxed">Locaze</div>
            </div>
            <div class="flex-col justify-start items-center gap-2 flex">
                <div class="text-center text-gray-800 text-[30px] font-semibold leading-9 tracking-wide">Sign up your
                    account</div>
            </div>
        </div>
        <form @submit.prevent="onSubmit"
            class="self-stretch h-[296px] px-10 py-8 bg-white rounded-sm border border-neutral-200 flex-col justify-start items-center gap-10 flex">
            <div class="flex-col justify-start items-start gap-6 flex w-full">

                <div class="h-[60px] flex-col justify-start items-start gap-2 flex w-full">
                    <div class="text-gray-700 text-[14px] font-medium leading-none">Email Address</div>
                    <Input name="email" :value="email" @change="value => email = value" />
                </div>
                <div class="h-[66px] flex-col justify-start items-start gap-2 flex w-full">
                    <div class="self-stretch justify-between items-start items-center gap-1 inline-flex">
                        <div class="text-gray-600 text-[14px] font-medium leading-none">Password</div>
                        <div class="text-gray-500 text-[14px] font-medium leading-tight cursor-pointer">Forgot?</div>
                    </div>
                    <Input type="password" name="password" :value="password" @change="value => password = value" />
                </div>
            </div>
            <Button>Sign in</Button>
        </form>
        <div class="justify-start items-center gap-1 inline-flex">
            <div class="text-gray-700 text-[14px] font-normal leading-tight">Don’t have an account?</div>
            <div class="justify-start items-center flex">
                <div class="text-gray-800 hover:text-gray-500 text-[14px] font-medium leading-tight cursor-pointer">Create
                    an Account</div>
            </div>
        </div>
    </div>
</template>
