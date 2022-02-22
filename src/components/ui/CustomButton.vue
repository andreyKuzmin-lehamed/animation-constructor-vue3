<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    width: [String,Number],
    height: [String,Number],
    bg: String,
    color: String,
    onclickFunc: Function
})
const styles = computed(() => {
    return { 
        width: typeof props?.width === "string" ? props.width : props.width + "px",
        height: typeof props?.height === "string" ? props.height : props.height + "px",
        backgroundColor: props?.bg}
})

const emit = defineEmits(['click'])
const onclick = (e: any) => {
    emit("click", props?.text)
    if (props?.onclickFunc) props.onclickFunc()
}
</script>

<template>
    <div
        class="custom-button--container flex-col-center-center pushable"
        :style="styles"
        @click.stop="onclick"
    >
        <p :style="{color: props?.color}" >{{ props?.text }}</p>
    </div>
</template>

<style scoped>
.custom-button--container {
    width: 60px;
    height: 24px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    background-color: rgb(75, 75, 75);
    user-select: none;
}
.custom-button--container p {
    color: white;
}
</style>