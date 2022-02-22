<script setup lang="ts">
import CustomTitle from '@/components/ui/CustomTitle.vue';
import { nextTick, ref, type Ref } from 'vue';
import CustomButton from './CustomButton.vue';
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(["selected", "created", "delete"])

const showOptions: Ref<boolean> = ref(false)
const selected: Ref<string> = ref("")
const closeOptions = () => {
    showOptions.value = false
    cancelCreating()
    document.removeEventListener("click", closeOptions)
}
const openOptions = () => {
    if (!showOptions.value) {
        document.addEventListener("click", closeOptions)
        showOptions.value = true
    } else {
        closeOptions()
    }
}
const select = (option :string) => {
    selected.value = option
    closeOptions()
    emit("selected", option)
}

const newOptionInput :Ref<HTMLElement | any> = ref(null)
const creating :Ref<boolean> = ref(false)
const newOption :Ref<string> = ref("")
const createOption = () => {
    if (creating.value) return
    if (!newOptionInput.value) return
    creating.value = !creating.value
    nextTick(() => newOptionInput.value.focus())
}

const createNewOption = () => {
    if (!newOption.value) return
    emit("created", newOption.value)
    cancelCreating()
}

const cancelCreating = () => {
    newOption.value = ""
    creating.value = false
}

const hoveredOption :Ref<string> = ref("")
const setHoveredOption = (option :string) => {
    hoveredOption.value = option
}
const clearHoveredOption = () => {
    hoveredOption.value = ""
}

</script>

<template>
    <CustomTitle :title="props?.title">
        <div class="custom-select-input--container">
            <div
                class="custom-select-input--line flex-row-between-center"
                @click.stop="openOptions"
            >
                <p class="custom-select-input--selected">{{ selected || props?.placeholder }}</p>
                <img class="custom-select-input--arrow" src="../../assets/images/select-arrow.svg" />
            </div>
            <div class="custom-select-input--background" v-if="showOptions"></div>
            <div class="custom-select-input--options" v-if="showOptions">
                <div
                    class="custom-select-input--line custom-select-input--selected-line flex-row-between-center"
                    @click.stop="openOptions"
                >
                    <p class="custom-select-input--selected">{{ selected || props?.placeholder }}</p>
                    <img
                        class="custom-select-input--arrow"
                        src="../../assets/images/select-arrow.svg"
                    />
                </div>

                <div class="custom-select-input--line custom-select-input--create-line flex-row-between-center" @click.stop="createOption">
                    <p
                        v-show="!creating"
                        class="custom-select-input--create"
                    >Create new option</p>
                    <input  class="custom-select-input--input"
                            @click.stop
                            v-show="creating" 
                            type="text" 
                            ref="newOptionInput" 
                            v-model="newOption" />
                    <div v-show="creating"  class="custom-select-input--buttons flex-row-between-center">
                        <CustomButton
                            text="Ok"
                            width="52px"
                            height="16px"
                            bg="#ffffff"
                            color="#30ab1c"
                            @click="createNewOption"
                        ></CustomButton>
                        <CustomButton
                            text="Cancel"
                            width="52px"
                            height="16px"
                            bg="#ffffff"
                            color="#AB8C1C"
                            @click="cancelCreating"
                        ></CustomButton>
                    </div>
                </div>
                <div class="flex-col-start-start custom-select-input--scrollable">
                    <TransitionGroup name="list">
                        <div
                            v-for="option in (options as Array<string>)"
                            :key="option"
                            :class="{'custom-select-input--line--hovered': hoveredOption === option}"
                            class="custom-select-input--line flex-row-between-center"
                            @click.stop="select(option)"
                            @mouseenter="setHoveredOption(option)"
                            @mouseleave="clearHoveredOption"
                        >
                            <p>{{ option }}</p>
                            <img
                                v-show="hoveredOption === option"
                                class="custom-select-input--delete"
                                @click.stop="emit('delete', option)"
                                src="../../assets/images/select-delete.svg"
                            />
                        </div>
                    </TransitionGroup>
                </div> 
            </div>
        </div>
    </CustomTitle>
</template>

<style scoped>
.custom-select-input--container {
    position: relative;
    width: 300px;
    min-height: 24px;
    background: #ffffff;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
}
.custom-select-input--options {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    min-height: 24px;
    max-height: 132px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    z-index: 1000;
}
.custom-select-input--background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(110, 110, 110, 0.7);
    z-index: 900;
}
.custom-select-input--line {
    cursor: pointer;
    min-height: 24px;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
}
.custom-select-input--line--hovered {
    background-color: #f8fd7c;
}
.custom-select-input--selected-line img {
    transform: rotate(180deg);
}
.custom-select-input--create-line {
    background-color: #30ab1c;
}
.custom-select-input--create {
    color: #ffffff;
}
.custom-select-input--input {
    border: none;
    outline: none;
    height: 80%;
    width: 55%;
    border-radius: 4px;
}
.custom-select-input--scrollable {
    overflow-y: scroll;
    max-height: 84px;
    width: 100%;
}
.custom-select-input--scrollable::-webkit-scrollbar {
    display: none;
}
.custom-select-input--buttons {
    width: 110px;
}
.custom-select-input--selected {
}
.custom-select-input--arrow {
}
.custom-select-input--delete {
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>