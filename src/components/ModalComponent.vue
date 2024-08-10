<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-auto relative">
            <button @click="close" class="absolute bg-red-400 rounded-lg p-2 top-2 right-2 text-gray-500 hover:text-gray-700">
                <span class="text-white font-bold">X</span>
            </button>
            <div class="mt-8">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isVisible: Boolean
});

const emit = defineEmits(['close']);

function close() {
    emit('close');
}
</script>

<style scoped>
/* Adicione estilos adicionais, se necessário */
</style>