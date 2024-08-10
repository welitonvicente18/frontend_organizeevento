<template>
    <div>
        <div>
            <h3 class="text-3xl font-medium text-gray-700"> Usuários </h3>
            <div class="flex justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="open = true">
                    Adicionar Usuário
                </button>
                <ModalComponent :isVisible="open" @close="open = false">
                    <UsuarioCreate />
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
                                        Usuário
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Perfil
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Ação
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="bg-white">
                                <tr v-if="usuarios" v-for="(usuario, index) in usuarios" :key="index">
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 w-10 h-10">
                                                <img class="w-10 h-10 rounded-full"
                                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                     alt="profile pic">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium leading-5 text-gray-900">
                                                    {{ usuario.name }}
                                                </div>
                                                <div class="text-sm leading-5 text-gray-500">
                                                    {{ usuario.email }}
                                                    <br>
                                                    {{ usuario.telefone }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="text-sm leading-5 text-gray-900">
                                            {{ usuario.perfil == '1' ? 'Super Administrador' : 'Usuário Comum' }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 ftext-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goUsuarioEdit(usuario.id)">
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
        <UsuarioEdit :id="selectedInscritoId" />
    </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ModalComponent from '../../components/ModalComponent.vue'
import UsuarioCreate from './UsuarioCreate.vue'
import UsuarioEdit from './UsuarioEdit.vue'
// import { toast } from "vue3-toastify";
// import "vue3-toastify/dist/index.css";

const usuarios = ref([])
const paginantion = ref({})
const open = ref(false)
const openEdit = ref(false)
const selectedInscritoId = ref(0);

onMounted(() => {
    redirectPagination('')
})

function goUsuarioEdit(id) {
    selectedInscritoId.value = id; // Atualize o ID selecionado
    openEdit.value = true; // Abra o modal de edição
}

function redirectPagination(url) {
    if (url == null || url.trim() === '')
        url = '/usuario/index'
    else
        url = url.slice(-20)

    axios.get(url)
        .then((response) => {
            usuarios.value = response.data.data.data
            paginantion.value = response.data.data
        })
        .catch((error) => {
            console.error('Erro ao carregar usuarios:', error)
        })
}
</script>