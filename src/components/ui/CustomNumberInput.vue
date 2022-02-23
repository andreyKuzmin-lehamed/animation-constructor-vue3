<script setup lang="ts">
import { computed, nextTick, ref, type Ref } from "vue";
import CustomTitle from "./CustomTitle.vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    width: Number,
    height: Number,
    modelValue: Number,
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    step: {
        type: Number,
        required: true
    },
})

const emit = defineEmits(["update:modelValue"])

const style = computed(()=>{
    return {
        width: props?.width + "px",
        height: props?.height + "px"
    }
})

const onchange = (e :any) => {
        let value = e.target.value
        if (value < props?.min) value = props.min
        if (value > props?.max) value = props.max
        const nearestStep = calcNearestStep(value - props?.min)
        emit('update:modelValue', props?.min + nearestStep * props?.step)
        nextTick(()=>setSliderItemPosition())
    }

const sliderContainer :Ref<HTMLElement | null> = ref(null)

const sliderLeftPosition :Ref<number> = ref(0)
const sliderLeftRawPosition :Ref<number> = ref(0)
const cursor :Ref<string> = ref("")


const changeModelValue = (e :any) => {
    if (e.target.className === 'custom-number-input--slider-container') {
        sliderLeftRawPosition.value = e.layerX - 4
    } else if (e.target.className === 'custom-number-input--slider-item') {
        sliderLeftRawPosition.value = e.target.offsetLeft + e.layerX - 4
    }
    if (sliderLeftRawPosition.value < 0) sliderLeftRawPosition.value = 0
    if (props?.width !== undefined && sliderLeftRawPosition.value > props.width * 0.48) {
        sliderLeftRawPosition.value = props.width * 0.48
    }

    if (!props?.width) return
    const factStep = Math.abs(props?.max - props?.min) / Math.round(props?.width * 0.48)
    const nearestStep = calcNearestStep(sliderLeftRawPosition.value * factStep)
    emit("update:modelValue", props?.min + nearestStep * props?.step)
    nextTick(()=>setSliderItemPosition())
}

const setSliderItemPosition = () => {
    if (props?.modelValue === undefined || !props?.width) return
    const nearestStep = Math.abs((props?.modelValue - props?.min) / props?.step)
    const value = props?.step * nearestStep;
    const factStep = Math.abs(props?.max - props?.min) / Math.round(props?.width * 0.48)
    const targetLeft = value / factStep
    sliderLeftPosition.value = targetLeft
}


const calcNearestStep = (value :number) => {
    let flag
    if (value % props?.step >= props?.step * 0.5) {
        flag = 'next'
    } else {
        flag = 'prev'
    }
    return ~~(value / props?.step) + (flag === "next" ? 1 : 0)
}

const stopMovingSliderItem = () => {
    cursor.value = ""
    document.removeEventListener("mousemove", changeModelValue)
    document.removeEventListener("mouseup", stopMovingSliderItem)
}
const moveSliderItem = (e :any) => {
    cursor.value = "grabbing"
    changeModelValue(e)
    document.addEventListener("mousemove", changeModelValue)
    document.addEventListener("mouseup", stopMovingSliderItem)
}

</script>

<template>
    <CustomTitle :title="props?.title">
    <div class="custom-number-input--container flex-row-start-center" :style="style">
        <input type="number" class="custom-number-input--input" :step="step" :min="min" :max="max" :style="{height: props?.height}" :value="props?.modelValue" @change="onchange">
        <div class="custom-number-input--slider-range flex-row-between-end">
            <p>{{min}}</p>
            <p>{{max}}</p>
        </div>
        <div class="custom-number-input--slider-container" ref="sliderContainer" @mousedown="moveSliderItem" :style="{height: props?.height, cursor}">
            <div class="custom-number-input--slider-item" :style="{left: Math.floor(sliderLeftPosition) + 'px', cursor}"></div>
        </div>
    </div>
    </CustomTitle>
</template>

<style scoped>
.custom-number-input--container {
    position: relative;
    min-width: 232px;
}
.custom-number-input--input {
    width: 48%;
    height: 32px;
    margin-right: 4%;
    padding: 0 8px;
    box-sizing: border-box;
    border: none;
    background: #FFFFFF;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    outline: none;
}
.custom-number-input--slider-range {
    position: absolute;
    width: calc(44% + 16px);
    margin-right: 2%;
    top: -16px;
    right: 0px;
}
.custom-number-input--slider-container {
    cursor: grab;
    position: relative;
    width: calc(48% + 16px);
    height: 32px;
    background: #FFFFFF;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    overflow: hidden;
}
.custom-number-input--slider-item {
    cursor: grab;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1C77AB;
    width: 8px;
    height: 100%;
}
</style>