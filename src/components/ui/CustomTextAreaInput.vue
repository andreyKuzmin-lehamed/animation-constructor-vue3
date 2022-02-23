<script setup lang="ts">
import { computed } from "vue";
import CustomTitle from "./CustomTitle.vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    width: [String, Number],
    height: [String, Number],
    modelValue: String
})

const emit = defineEmits(["update:modelValue"])

const style = computed(()=>{
    return {
        width: typeof props?.width === "string" ? props.width : props.width + "px",
        height: typeof props?.height === "string" ? props.height : props.height + "px"
    }
})

</script>

<template>
    <CustomTitle :title="props?.title">
        <textarea class="custom-text-area-input--input" :style="style" v-model="modelValue" @input="(e :any)=>{emit('update:modelValue', e.target.value)}"/>
    </CustomTitle>
</template>

<style scoped>
.custom-text-area-input--input {
    min-width: 120px;
    min-height: 60px;
    resize: none;
    padding: 8px;
    box-sizing: border-box;
    border: none;
    background: #FFFFFF;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    outline: none;
}

.custom-text-area-input--input::-webkit-scrollbar {
    display: none;
}
</style>