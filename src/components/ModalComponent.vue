<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  isVisible: Boolean,
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-auto relative">
      <button class="absolute bg-red-400 rounded-lg p-2 top-2 right-2 text-gray-500 hover:text-gray-700" @click="close">
        <span class="text-white font-bold">X</span>
      </button>
      <div class="mt-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adicione estilos adicionais, se necessário */
</style>
