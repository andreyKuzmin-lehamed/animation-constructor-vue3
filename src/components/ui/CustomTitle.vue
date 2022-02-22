<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="flex-col-start-start">
        <div class="custom-title--container flex-row-start-end">
            <img src="../../assets/images/title-img-left.svg" />
            <p class="custom-title--title">{{ props?.title }}</p>
            <img src="../../assets/images/title-img-right.svg" />
        </div>
        <slot>
            <!-- Input component -->
        </slot>
    </div>
</template>

<style scoped>
.custom-title--container {
    padding-left: 8px;
}
.custom-title--title {
    margin: 0 4px;
}
</style>