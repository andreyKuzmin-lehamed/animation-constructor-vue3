<script setup lang="ts">
import CustomTitle from '@/components/ui/CustomTitle.vue';
import { computed, nextTick, ref, type Ref } from 'vue';
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
    },
    width: [String, Number],
    height: [String, Number]
})

const style = computed(()=>{
    return {
        width: typeof props?.width === "string" ? props.width : props.width + "px",
        height: typeof props?.height === "string" ? props.height : props.height + "px"
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
        <div class="custom-select-input--container" :style="style">
            
            <div
                class="custom-select-input--line flex-row-between-center"
                @click.stop="openOptions"
            >
                <p class="custom-select-input--selected">{{ selected || props?.placeholder }}</p>
                <img class="custom-select-input--arrow" src="../../assets/images/select-arrow.svg" />
            </div>


            <div class="custom-select-input--background" v-if="showOptions"></div>
            <div class="custom-select-input--options" v-if="showOptions" :style="{width: props?.width}">
                
                <div
                    class="custom-select-input--line custom-select-input--selected-line flex-row-between-center"
                    @click.stop="openOptions"
                    :style="style"
                >
                    <p class="custom-select-input--selected">{{ selected || props?.placeholder }}</p>
                    <img
                        class="custom-select-input--arrow"
                        src="../../assets/images/select-arrow.svg"
                    />
                </div>

                <div class="custom-select-input--line custom-select-input--create-line flex-row-between-center" @click.stop="createOption" :style="style">
                    <p
                        v-show="!creating"
                        class="custom-select-input--create"
                    >Create new option</p>
                    <input  class="custom-select-input--input"
                            @click.stop
                            @keydown.enter="createNewOption"
                            v-show="creating" 
                            type="text" 
                            ref="newOptionInput" 
                            v-model="newOption" />
                    <div v-show="creating"  class="custom-select-input--buttons flex-row-between-center">
                            <img
                                class="custom-select-input--create-accept"
                                @click.stop="createNewOption"
                                src="../../assets/images/select-accept.svg"
                            />
                            <img
                                class="custom-select-input--create-cancel"
                                @click.stop="cancelCreating"
                                src="../../assets/images/select-delete.svg"
                            />
                    </div>
                </div>
                <div class="flex-col-start-start custom-select-input--scrollable">
                    <TransitionGroup name="list">
                        <div
                            v-for="option in (options as Array<string>)"
                            :key="option"
                            :class="{'custom-select-input--line--hovered': hoveredOption === option}"
                            class="custom-select-input--line flex-row-between-center"
                            :style="style"
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
    width: 120px;
    min-height: 32px;
    background: #ffffff;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
}
.custom-select-input--options {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    min-height: 32px;
    max-height: 240px;
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
    background-color: rgb(253 255 155 / 60%);;
    z-index: 900;
}
.custom-select-input--line {
    cursor: pointer;
    min-height: 32px;
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
    height: 16px;
    width: 75%;
    border-radius: 4px;
}
.custom-select-input--scrollable {
    overflow-y: scroll;
    max-height: 240px;
    width: 100%;
}
.custom-select-input--scrollable::-webkit-scrollbar {
    display: none;
}
.custom-select-input--buttons {
}
.custom-select-input--create-accept {
    padding: 4px;
    width: 10px;
    border-radius: 20px;
    background-color: #ffffff;
    margin-right: 4px;
}
.custom-select-input--create-cancel {
    padding: 4px;
    width: 10px;
    border-radius: 20px;
    background-color: #ffffff;

}
.custom-select-input--selected {
}
.custom-select-input--arrow {
}
.custom-select-input--delete {
    padding: 4px;
    width: 10px;
    border-radius: 20px;
    background-color: #ffffff;
    border: 1px solid red;
}

.custom-select-input--delete:hover {
    transition-duration: 32s;
    transform: rotate(9000deg);
    padding: 4px;
    width: 10px;
    border-radius: 20px;
    background-color: #ffffff;
    border: 1px solid red;
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