<script setup>
import { defineProps, onMounted, ref } from 'vue'

// import Swal from 'sweetalert2';
import axios from '../../router/axiosConfig.js'
import ImputComponent from '../../components/Form/ImputComponent.vue'
import SelectComponent from '../../components/Form/SelectComponent.vue'

const props = defineProps({
  id: { type: String, required: true },
})

const sexo = ref([
  { value: '', texto: 'Escolha um estado' },
  { value: 'M', texto: 'Masculino' },
  { value: 'F', texto: 'Feminino' },
])

const estados = [
  { value: '', texto: 'Escolha um estado' },
  { value: 'AC', texto: 'AC' },
  { value: 'AL', texto: 'AL' },
  { value: 'AM', texto: 'AM' },
  { value: 'AP', texto: 'AP' },
  { value: 'BA', texto: 'BA' },
  { value: 'CE', texto: 'CE' },
  { value: 'DF', texto: 'DF' },
  { value: 'ES', texto: 'ES' },
  { value: 'GO', texto: 'GO' },
  { value: 'MA', texto: 'MA' },
  { value: 'MG', texto: 'MG' },
  { value: 'MS', texto: 'MS' },
  { value: 'MT', texto: 'MT' },
  { value: 'PA', texto: 'PA' },
  { value: 'PB', texto: 'PB' },
  { value: 'PE', texto: 'PE' },
  { value: 'PI', texto: 'PI' },
  { value: 'PR', texto: 'PR' },
  { value: 'RJ', texto: 'RJ' },
  { value: 'RN', texto: 'RN' },
  { value: 'RO', texto: 'RO' },
  { value: 'RR', texto: 'RR' },
  { value: 'RS', texto: 'RS' },
  { value: 'SC', texto: 'SC' },
  { value: 'SE', texto: 'SE' },
  { value: 'SP', texto: 'SP' },
  { value: 'TO', texto: 'TO' },
]

const permisaoCampo = ref({
  sexo: false,
  cep: false,
  cidade: false,
  cpf: false,
  datanascimento: false,
  endereco: false,
  estado: false,
})

const formData = ref({
  id: '',
  nome_evento: '',
  data_inicio: '',
  data_fim: '',
  data_prazo_inscricao: '',
  responsavel: '',
  telefone_responsavel: '',
  email_responsavel: '',
  uf: '',
  cidade: '',
  local: '',
  descricao: '',
  logo_evento: null,
  limite_inscritos: '',
  campo_extra: {
    nome: true,
    sobrenome: true,
    telefone: true,
    email: true,
    cpf: false,
    datanascimento: false,
    sexo: false,
    estado: false,
    cidade: false,
    endereco: false,
    cep: false,
  },
})

onMounted(() => {
  axios.get(`inscrito/show/${props.id}`)
    .then((response) => {
      const inscritos = response.data.data
      formData.value = {
        ...formData.value,
        ...inscritos,
      }
    })
    .catch((error) => {
      console.log('Erro ao buscar o inscritos', error)
    })
})

function submitForm() {
  const update = {
    id: formData.value.id,
    id_eventos: formData.value.id_eventos,
    nome: formData.value.nome,
    sobrenome: formData.value.sobrenome,
    cpf: formData.value.cpf,
    rg: formData.value.rg,
    data_nascimento: formData.value.data_nascimento,
    telefone: formData.value.telefone,
    email: formData.value.email,
    uf: formData.value.uf,
    cidade: formData.value.cidade,
    endereco: formData.value.endereco,
    cep: formData.value.cep,
  }

  axios.put(`inscrito/update/${formData.value.id}`, update)
    .then((response) => {
      console.log('Dados enviados com sucesso:', response.data)
    })
    .catch((error) => {
      console.error('Erro ao enviar dados:', error)
    })
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700 mt-5">
      Editar Inscrição
    </h3>

    <div class="mt-8">
      <form @submit.prevent="submitForm">
        <div class="mt-4 grid grid-cols-4 gap-2 md:grid-cols-4 sm:grid-cols-2">
          <div class="col-span-2">
            <ImputComponent id="nome" v-model="formData.nome" tipo="text" label="Primeiro Nome" />
          </div>
          <div class="col-span-2">
            <ImputComponent id="sobrenome" v-model="formData.sobrenome" tipo="text" label="Sobrenome" />
          </div>
          <div class="col-span-1">
            <ImputComponent id="telefone" v-model="formData.telefone" v-mask="'(##) ####-####'" tipo="text" label="Telefone" />
          </div>
          <div class="col-span-3">
            <ImputComponent id="email" v-model="formData.email" tipo="email" label="E-mail" />
          </div>
          <div v-if="permisaoCampo.cpf" class="col-span-1">
            <ImputComponent id="cpf" v-model="formData.cpf" tipo="text" label="CPF" />
          </div>
          <div v-if="permisaoCampo.datanascimento" class="col-span-1">
            <ImputComponent id="data-nascimento" v-model="formData.data_nascimento" tipo="text" label="Data de Nascimento" placeholder="__/__/____" />
          </div>
          <div v-if="permisaoCampo.sexo" class="col-span-1">
            <SelectComponent id="sexo" v-model="formData.sexo" label="Sexo" :options="sexo" />
          </div>
          <div class="col-span-1" />
          <div v-if="permisaoCampo.estado" class="col-span-1">
            <SelectComponent id="uf" v-model="formData.uf" label="Estado" :options="estados" />
          </div>
          <div v-if="permisaoCampo.cep" class=" col-span-1">
            <ImputComponent id="cep" v-model="formData.cep" tipo="text" label="CEP" />
          </div>
          <div v-if="permisaoCampo.cidade" class="col-span-2">
            <ImputComponent id="cidade" v-model="formData.cidade" tipo="text" label="Cidade" :options="cidade" />
          </div>
          <div v-if="permisaoCampo.endereco" class=" col-span-2">
            <ImputComponent id="endereco" v-model="formData.endereco" tipo="text" label="Endereco" />
          </div>
        </div>
        <hr class="my-6">
        <div class="flex justify-start mt-6">
          <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700">
            Atualizar Inscrição
          </button>
          <button class="px-4 py-2 text-gray-200 bg-red-800 ml-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-700">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
