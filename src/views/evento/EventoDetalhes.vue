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
                        <img v-if="evento" :src="evento.logo_evento" width="300px" height="200px" alt="Logo" />
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
                                <routerLink :to="{ name: 'eventoeditar', params: { id: evento.id } }" v-if="evento">
                                    Editar
                                </routerLink>
                            </li>
                            <li class="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 hover:bg-sky-700">
                                <routerLink :to="{ name: 'inscritoListar', params: { id: evento.id } }" class="nav-link" v-if="evento">
                                    Inscritos
                                </routerLink>
                            </li>
                            <li class="bg-red-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 hover:bg-sky-700 cursor-pointer">
                                <a @click="deleteFunction(evento.id)" class="">
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

<script setup>
// import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../../router/axiosConfig.js'

const router = useRouter()
const evento = ref(null)

onMounted(() => {
    const id = router.currentRoute.value.params.id
    axios.get(`evento/show/${id}`)
        .then((response) => {
            evento.value = response.data.data
            console.log(evento.value.logo_evento)
        })
        .catch((error) => {
            console.log('Erro ao buscar detalhes do evento', error)
        })
})

function deleteFunction(id) {
    axios.delete(`evento/destroy/${id}`)
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Excluído com sucesso!',
            })
            console.log(response.data)
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'error!',
                text: 'Erro ao enviar os evento!',
            })
            console.log('Erro ao buscar detalhes do evento', error)
        })
}
</script>