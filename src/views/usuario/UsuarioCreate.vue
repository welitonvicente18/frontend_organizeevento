<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ImputComponent from '../../components/Form/ImputComponent.vue'
import SelectComponent from '../../components/Form/SelectComponent.vue'

const perfil = ref([
  { value: '2', texto: 'Usuário Comum' },
  { value: '1', texto: 'Administrador' },
])
const formData = ref({
  name: '',
  email: '',
  telefone: '',
  password: '',
  password_confirmation: '',
})

function submitForm() {
  console.log(formData)

  const submitForm = {
    id: formData.value.id,
    nome_evento: formData.value.nome_evento,
    data_inicio: formData.value.data_inicio,
    data_fim: formData.value.data_fim,
    data_prazo_inscricao: formData.value.data_prazo_inscricao,
    responsavel: formData.value.responsavel,
    telefone_responsavel: formData.value.telefone_responsavel,
    email_responsavel: formData.value.email_responsavel,
    uf: formData.value.uf,
    cidade: formData.value.cidade,
    local: formData.value.local,
    descricao: formData.value.descricao,
    logo_evento: formData.value.logo_evento,
    limite_inscritos: formData.value.limite_inscritos,
    campos_adicionais: formData.value.campos_adicionais,
    campo_extra: formData.value.campo_extra,
  }

  axios.post('evento/store/', submitForm)
    .then((response) => {
      if (response.data.status === 'success')
        toast.success(response.data.msg)
      else
        toast.error(response.data.msg)

      console.log(response.data)
    })
    .catch((error) => {
      console.error('Erro ao enviar dados:', error)
    })
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700 mt-5">
      Adicionar Usuário
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
          <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700">
            Salvar Usuário
          </button>
          <button class="px-4 py-2 text-gray-200 bg-red-800 ml-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-700">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
