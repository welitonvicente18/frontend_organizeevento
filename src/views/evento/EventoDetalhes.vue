<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../../router/axiosConfig.js'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'

const router = useRouter()
const evento = ref(null)

onMounted(() => {
  const id = router.currentRoute.value.params.id
  axios.get(`evento/show/${id}`)
    .then((response) => {
      evento.value = response.data.data
    })
    .catch((error) => {
      console.log('Erro ao buscar detalhes do evento', error)
    })
})

function deleteFunction(id) {
  if (!confirm('Tem certeza que deseja deletar este evento?'))
    return false

  axios.delete(`evento/destroy/${id}`)
    .then((response) => {
      if (response.data.status === 'success') {
        toast.success(response.data.msg)
        router.push({ name: 'eventoListar' })
      }
      else {
        toast.error(response.data.msg)
      }
    })
    .catch((error) => {
      toast.error('Erro ao deletar evento')
      console.log('Erro ao deletar evento', error)
    })
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">
      Eventos
    </h3>

    <div class="mt-8 flex flex-row gap-2">
      <div class="mt-4 basis-2/3 ">
        <div class="p-6 bg-white rounded-md shadow-md">
          <RouterView />
        </div>
      </div>
      <div class="mt-4 basis-1/3 ">
        <div class="p-6 bg-white rounded-md shadow-md flex flex-col items-center">
          <div class="">
            <img v-if="evento" :src="evento.logo_evento" width="300px" height="200px" alt="Logo">
          </div>
          <div class="text-center">
            <h2 class="text-lg font-semibold text-gray-700">
              Account settings
            </h2>
            <p class="text-gray-500 text-center">
              Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.
            </p>
          </div>
          <div class="mt-4">
            <ul role="flex" class="flex flex-row gap-2">
              <li class="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 hover:bg-sky-700">
                <routerLink v-if="evento" :to="{ name: 'eventoeditar', params: { id: evento.id } }">
                  Editar
                </routerLink>
              </li>
              <li class="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 hover:bg-sky-700">
                <routerLink v-if="evento" :to="{ name: 'inscritoListar', params: { id: evento.id } }" class="nav-link">
                  Inscritos
                </routerLink>
              </li>
              <li class="bg-red-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 hover:bg-sky-700 cursor-pointer">
                <a class="" @click="deleteFunction(evento.id)">
                  Deletar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
