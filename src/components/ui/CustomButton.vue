<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    width: String,
    height: String,
    bg: String,
    color: String,
    onclickFunc: Function
})
const emit = defineEmits(['click'])
const onclick = (e: any) => {
    emit("click", props?.text)
    if (props?.onclickFunc) props.onclickFunc()
}
const styles = computed(() => {
    return { 
        width: props?.width,
        height: props?.height,
        backgroundColor: props?.bg,
        color: props?.color }
})
</script>

<template>
    <div
        class="custom-button--container flex-col-center-center pushable"
        :style="styles"
        @click.stop="onclick"
    >
        <p>{{ props?.text }}</p>
    </div>
</template>

<style scoped>
.custom-button--container {
    width: 60px;
    height: 32px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    background-color: rgb(75, 75, 75);
    color: white;
}
</style>