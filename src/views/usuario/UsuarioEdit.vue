<script setup>
import { defineEmits, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import axios from '../../router/axiosConfig.js'
import ImputComponent from '../../components/Form/ImputComponent.vue'
import SelectComponent from '../../components/Form/SelectComponent.vue'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
  id: { type: String, required: true },
  isVisible: Boolean,
})

const emit = defineEmits(['update:isVisible'])

const router = useRouter()

const perfil = ref([
  { value: '1', texto: 'Administrador' },
  { value: '2', texto: 'Usuário Comum' },
])
const formData = ref({
  name: '',
  email: '',
  telefone: '',
  password: '',
  password_confirmation: '',
})

onMounted(() => {
  axios.get(`usuario/show/${props.id}`)
    .then((response) => {
      const usuarios = response.data.data
      formData.value = {
        ...formData.value,
        ...usuarios,
      }
    })
    .catch((error) => {
      toast.error('Erro ao buscar o inscritos')
      console.log('Erro ao buscar o inscritos', error)
    })
})

function closeEdit() {
  console.log('teste')
  emit('update:isVisible', false)
}

function submitForm() {
  const update = {
    id: formData.value.id,
    name: formData.value.name,
    email: formData.value.email,
    perfil: formData.value.perfil,
    telefone: formData.value.telefone,
    password: formData.value.password,
    password_confirmation: formData.value.password_confirmation,
  }

  axios.put(`/usuario/update/${formData.value.id}`, update)
    .then((response) => {
      if (response.data.status === 'success') {
        emit('update:isVisible', false)
        toast.success(response.data.msg)
        router.push({ name: 'usuarioList' })
      }
      else {
        toast.error(response.data.msg)
      }
    })
    .catch((error) => {
      toast.error('Erro ao enviar dados')
      console.error('Erro ao enviar dados:', error)
    })
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700 mt-5">
      Editar Usuário
    </h3>

    <div class="mt-8">
      <form @submit.prevent="submitForm">
        <div class="mt-4 grid grid-cols-4 gap-2 md:grid-cols-4 sm:grid-cols-2">
          <div class="col-span-2">
            <ImputComponent id="nome" v-model="formData.name" tipo="text" label="Nome" />
          </div>
          <div class="col-span-2">
            <ImputComponent id="email" v-model="formData.email" tipo="email" label="E-mail" />
          </div>
          <div class="col-span-2">
            <ImputComponent id="telefone" v-model="formData.telefone" v-mask="'(##) ####-####'" tipo="text" label="Telefone" />
          </div>
          <div class="col-span-1">
            <SelectComponent id="perfil" v-model="formData.perfil" label="Perfil" :options="perfil" />
          </div>
          <div class="col-span-3" />
          <div class="col-span-2">
            <ImputComponent id="password" v-model="formData.password" tipo="password" label="Senha" />
          </div>
          <div class="col-span-2">
            <ImputComponent id="password_confirmation" v-model="formData.password_confirmation" tipo="password" label="Confirmar Senha" />
          </div>
        </div>
        <hr class="my-6">
        <div class="flex justify-start mt-6">
          <button type="submit" class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700">
            Atualizar Usuário
          </button>
          <button type="button" class="px-4 py-2 text-gray-200 bg-red-800 ml-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-700" @click="closeEdit">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
