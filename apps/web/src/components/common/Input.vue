<template>
    <input :type="props.type" :name="props.name" :value="props.value"
        @input="event => emit('change', (event.target as HTMLInputElement).value)"
        class="self-stretch w-full text-[12px] text-neutral-700 focus:outline-none px-[8px] py-[8px] font-normal bg-white rounded-sm border border-neutral-300" />
</template>
    
<script setup lang='ts'>
const props = defineProps<{
    type?: string,
    name: string,
    value: string
}>()

const emit = defineEmits<{
    (e: 'change', value: string): void
}>()
</script>
    
<style></style>