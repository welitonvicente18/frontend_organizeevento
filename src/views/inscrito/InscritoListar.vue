<template>
    <div>
        <div>
            <h3 class="text-3xl font-medium text-gray-700">
                Inscritos
            </h3>
            <div class="flex justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="open = true">
                    Adicionar Inscrito
                </button>
                <ModalComponent :isVisible="open" @close="open = false">
                    <InscritoCreate />
                </ModalComponent>
            </div>
        </div>

        <div class="mt-8">
            <div class="flex flex-col mt-6">
                <div class="py-1 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table class="min-w-full">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Nome
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Telefone
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        E-mail
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Ação
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="bg-white">
                                <tr v-for="(inscrito, index) in inscritos" :key="index">
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="text-sm leading-5 text-gray-900">
                                            {{ inscrito.nome }} {{ inscrito.sobrenome }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="text-sm leading-5 text-gray-900">
                                            {{ inscrito.telefone }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="text-sm leading-5 text-gray-900">
                                            {{ inscrito.email }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goInscritoEdit(inscrito.id)">
                                            Editar
                                        </button>
                                        <button class="bg-red-500 ml-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Componente editar -->
    <ModalComponent :isVisible="openEdit" @close="openEdit = false">
        <InscritoEdit :id="selectedInscritoId" />
    </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ModalComponent from '../../components/ModalComponent.vue'
import InscritoCreate from './InscritoCreate.vue'
import InscritoEdit from './InscritoEdit.vue'

const inscritos = ref([])
const paginantion = ref({})
const open = ref(false)
const openEdit = ref(false)
const selectedInscritoId = ref(0);

onMounted(() => {
    redirectPagination('')
})

function goInscritoEdit(id) {
    selectedInscritoId.value = id; // Atualize o ID selecionado
    openEdit.value = true; // Abra o modal de edição
}

function redirectPagination(url) {
    if (url == null || url.trim() === '')
        url = '/inscrito/index'
    else
        url = url.slice(-20)

    axios.get(url)
        .then((response) => {
            inscritos.value = response.data.data.data
            paginantion.value = response.data.data
        })
        .catch((error) => {
            console.error('Erro ao carregar inscritos:', error)
        })
}
</script>