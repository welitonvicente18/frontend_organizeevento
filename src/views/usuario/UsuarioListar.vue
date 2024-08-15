<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from '../../router/axiosConfig.js'
import ModalComponent from '../../components/ModalComponent.vue'
import UsuarioCreate from './UsuarioCreate.vue'
import UsuarioEdit from './UsuarioEdit.vue'

const usuarios = ref([])
const paginantion = ref({})
const open = ref(false)
const openEdit = ref(false)
const selectedInscritoId = ref(0)

onMounted(() => {
  redirectPagination('')
})

function goUsuarioEdit(id) {
  selectedInscritoId.value = id // Atualize o ID selecionado
  openEdit.value = true // Abra o modal de edição
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

<template>
  <div>
    <div>
      <h3 class="text-3xl font-medium text-gray-700">
        Usuários
      </h3>
      <div class="flex justify-end">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="open = true">
          Adicionar Usuário
        </button>
        <ModalComponent :is-visible="open" @close="open = false">
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
                <tr v-for="(usuario, index) in usuarios" v-if="usuarios" :key="index">
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="profile pic"
                        >
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
            <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
              <span class="text-xs text-gray-900 xs:text-sm">Mostrando {{ paginantion.from }} a {{ paginantion.to }} total de {{ paginantion.total }} registros</span>
              <div class="inline-flex mt-2 xs:mt-0">
                <button v-if="paginantion.first_page_url" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400" @click.prevent="redirectPagination(paginantion.first_page_url)">
                  Anterior
                </button>
                <div v-for="(link) in paginantion.links" :key="link.label" class="page-item">
                  <button v-if="link.label == '1'" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400" @click.prevent="redirectPagination(link.url)">
                    1
                  </button>
                  <button v-if="link.label == '2'" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400" @click.prevent="redirectPagination(link.url)">
                    2
                  </button>
                  <button v-if="link.label == '3'" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400" @click.prevent="redirectPagination(link.url)">
                    3
                  </button>
                  <button v-if="link.label == '4'" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400" @click.prevent="redirectPagination(link.url)">
                    4
                  </button>
                </div>
                <button v-if="paginantion.last_page_url" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400" @click.prevent="redirectPagination(paginantion.next_page_url)">
                  Próximo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Componente editar -->
  <ModalComponent :is-visible="openEdit" @close="openEdit = false">
    <UsuarioEdit :id="selectedInscritoId" />
  </ModalComponent>
</template>
