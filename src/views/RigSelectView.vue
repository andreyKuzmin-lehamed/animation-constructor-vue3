<script setup lang="ts">
import CustomTitle from '@/components/ui/CustomTitle.vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import CustomSelectInput from '@/components/ui/CustomSelectInput.vue';
import { reactive, ref, type Ref } from 'vue';
import CustomTextInput from '../components/ui/CustomTextInput.vue';
import CustomTextAreaInput from '../components/ui/CustomTextAreaInput.vue';
import CustomNumberInput from '../components/ui/CustomNumberInput.vue';
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

const testText :Ref<string> = ref("")
const testNumber :Ref<number> = ref(0)

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
        width="240px"
        height="32px"
        >
    </CustomSelectInput>

    <CustomTextInput title="Test title" v-model="testText"></CustomTextInput>
    <CustomTextAreaInput title="Test title" v-model="testText"></CustomTextAreaInput>
    <CustomNumberInput title="Test number" v-model.number="testNumber" :width="500" :min="-100" :max="300" :step="1"></CustomNumberInput>
</template>

<style scoped>
.center {
    margin: 200px auto;
}
</style>