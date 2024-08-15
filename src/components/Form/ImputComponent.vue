<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  label: String,
  tipo: {
    type: String,
    default: 'text',
  },
  inputId: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <label class="text-gray-700" :for="inputId">{{ label }}</label>
  <input
    :id="inputId"
    :type="tipo"
    :value="modelValue"
    class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
    @input="handleInput"
  >
</template>
