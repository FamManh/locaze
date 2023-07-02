<script setup lang='ts'>
import eye from "../../assets/eye.svg"
import eyeOff from "../../assets/eye-off.svg"
import { computed, ref } from "vue"

const isShowPassword = ref(false)

const props = defineProps<{
    type?: string,
    name: string,
    value: string
}>()

const eyeSrc = computed(() => {
    if (isShowPassword.value) {
        return eyeOff
    }
    return eye
})

const inputType = computed(() => {
    if (props.type === 'password') {
        if (isShowPassword.value) {
            return 'text'
        }
    }

    return props.type
})

const emit = defineEmits<{
    (e: 'change', value: string): void
}>()

</script>

<template>
    <div class="relative w-full">
        <img v-show="props.type === 'password'" @click="isShowPassword = !isShowPassword" :src="eyeSrc"
            class="absolute w-[20px] top-[8px] right-[13px]" />
        <input :type="inputType" :name="props.name" :value="props.value"
            @input="event => emit('change', (event.target as HTMLInputElement).value)"
            class="self-stretch w-full text-[12px] text-neutral-700 focus:outline-none px-[8px] py-[8px] font-normal bg-white rounded-sm border border-neutral-300" />
    </div>
</template>

<style></style>