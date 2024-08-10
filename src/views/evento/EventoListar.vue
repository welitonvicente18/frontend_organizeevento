<template>
    <div>
        <div>
            <h3 class="text-3xl font-medium text-gray-700">
                Eventos
            </h3>
            <div class="flex justify-end">
                <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goAdicionarEvento()"> -->
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="open = true">
                    Adicionar Evento
                </button>
                <ModalComponent :isVisible="open" @close="open = false">
                    <EventoCreate />
                </ModalComponent>
            </div>
        </div>

        <div class="mt-8">
            <div class="flex flex-col mt-6">
                <div class="py-1 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Evento
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Data
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Local
                                    </th>
                                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                                        Ação
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="bg-white">
                                <tr v-for="(evento, index) in eventos" :key="index">
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 w-10 h-10">
                                                <img
                                                     class="w-10 h-10 rounded-full"
                                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                     alt="profile pic">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium leading-5 text-gray-900">
                                                    {{ evento.nome_evento }}
                                                </div>
                                                <div class="text-sm leading-5 text-gray-500">
                                                    {{ evento.responsavel }}
                                                    <br>
                                                    {{ evento.telefone_responsavel }} - {{ evento.email_responsavel }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">

                                        <div class="text-sm leading-5 text-gray-900">
                                            Início: {{ evento.data_inicio }} <br>
                                            Final: {{ evento.data_fim }} <br>
                                            Prazo de Inscrição: {{ evento.data_prazo_inscricao }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                                        <div class="text-sm leading-5 text-gray-900">
                                            {{ evento.local }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                                        <button
                                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                @click="goEventoDetalhe(evento.id)">
                                            Detalher
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
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from '../../router/axiosConfig.js'
import { useRouter } from 'vue-router'
import ModalComponent from '../../components/ModalComponent.vue'
import EventoCreate from './EventoCreate.vue'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const eventos = ref([])
const paginantion = ref({})
const router = useRouter()
const open = ref(false)

onMounted(() => {
    redirectPagination('')
})

function goEventoDetalhe(id) {
    router.push({ name: 'eventoDetalhe', params: { id } })
}

function redirectPagination(url) {
    if (url == null || url.trim() === '')
        url = '/evento/index'
    else
        url = url.slice(-20)

    axios.get(url)
        .then((response) => {
            eventos.value = response.data.data.data
            paginantion.value = response.data.data

        })
        .catch((error) => {
            console.error('Erro ao carregar eventos:', error)
            toast("Atenção! Erro ao carregar eventos.", {
                "type": "error",
                "dangerouslyHTMLString": true
            })
        })
}
</script>