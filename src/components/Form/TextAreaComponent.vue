<template>
    <label class="text-gray-700" :for="inputId">{{ props.label }}</label>
    <textarea :id="inputId" :rows="props.rows"  :coluns="props.coluns" :value="props.modelValue" @input="handleInput" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"></textarea>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    label: String,
    inputId: String,
    modelValue: String,
    rows: String,
    coluns: String,

});

function handleInput(event) {
    emit('update:modelValue', event.target.value);
}
</script>