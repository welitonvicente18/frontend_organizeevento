<template>
    <label class="text-gray-700" :for="inputId">{{ props.label }}</label>
    <select
            :id="inputId"
            :value="props.modelValue"
            @change="handleInput"
            class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        <option v-for="option in props.options" :key="option.value" :value="option.value">
            {{ option.texto }}
        </option>
    </select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    label: String,
    inputId: String,
    modelValue: [String, Number],
    options: {
        type: Array,
        required: true
    }
});


console.log(props.options)

function handleInput(event) {
    emit('update:modelValue', event.target.value);
}
</script>