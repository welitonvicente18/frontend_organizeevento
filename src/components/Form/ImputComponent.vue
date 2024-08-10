<template>
    <label class="text-gray-700" :for="inputId">{{ props.label }}</label>
    <input :type="props.tipo" :id="inputId" :value="props.modelValue" @input="handleInput" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    label: String,
    tipo: {
        type: String,
        default: 'text' // Default value if not provided
    },
    inputId: String,
    modelValue: String
});

function handleInput(event) {
    emit('update:modelValue', event.target.value);
}
</script>