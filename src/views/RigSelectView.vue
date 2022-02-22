<script setup lang="ts">
import CustomButton from '@/components/ui/CustomButton.vue';
const log = (e: any) => {
    console.log(e)
}
</script>

<template>
    <CustomButton
        text="Test button"
        width="140px"
        bg="rgb(28, 119, 171)"
        color="white"
        @click="log"
        :onclickFunc="log.bind(null, 'myst!')"
    ></CustomButton>
</template>
