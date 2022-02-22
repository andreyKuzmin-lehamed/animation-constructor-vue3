<script setup lang="ts">
import CustomTitle from '@/components/ui/CustomTitle.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import CustomSelectInput from '@/components/ui/CustomSelectInput.vue';
import { reactive, ref } from 'vue';
const log = (e: any) => {
    console.log(e)
}
const testButtonStyles = reactive({
    width: 100,
    bg: "rgb(28,119,171)",
    color: "#ffffff"
})

const options = ref([
    "option 1",
    "option 2",
    "option 3",
    "option 4",
    "option 5",
    "option 6",
    "option 7",
    "option 8",
    "option 9",
    "option 10",
])

const createOption = (option :string) => {
    options.value.unshift(option)
}
const deleteOption = (option :string) => {
    options.value = options.value.filter((el :string)=>el !== option)
}
</script>

<template>
    <!-- <CustomButton
        class="center"
        text="Test button"
        :width="testButtonStyles.width"
        :bg="testButtonStyles.bg"
        :color="testButtonStyles.color"
        @click="log"
        :onclickFunc="log.bind(null, 'other text!')"
    ></CustomButton>-->

    <!-- <CustomTitle class="center" title="Test title"></CustomTitle> -->

    <CustomSelectInput 
        title="Test Select title"
        placeholder="Select option"
        :options="options"
        @created="createOption"
        @delete="deleteOption"
        >
    </CustomSelectInput>
    <CustomSelectInput 
        title="Test Select title"
        placeholder="Select option"
        :options="options"
        @created="createOption"
        @delete="deleteOption"
        >
    </CustomSelectInput>
    <CustomSelectInput 
        title="Test Select title"
        placeholder="Select option"
        :options="options"
        @created="createOption"
        @delete="deleteOption"
        >
    </CustomSelectInput>
    <CustomSelectInput 
        title="Test Select title"
        placeholder="Select option"
        :options="options"
        @created="createOption"
        @delete="deleteOption"
        >
    </CustomSelectInput>
</template>

<style scoped>
.center {
    margin: 200px auto;
}
</style>