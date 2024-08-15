<script setup>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email as emailValidator, minLength, required } from '@vuelidate/validators'
import axios from '../../router/axiosConfig.js'
import ImputComponent from '../../components/Form/ImputComponent.vue'
import SelectComponent from '../../components/Form/SelectComponent.vue'
import TextAreaComponent from '../../components/Form/TextAreaComponent.vue'
import CheckToggleComponent from '../../components/Form/CheckToggleComponent.vue'

const tipo_evento = [
  { value: '1', texto: 'Formulário de inscrição' },
  { value: '2', texto: 'Confirmação de inscrição' },
]

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

// Definindo regras de validação
const rules = {
  nome_evento: { required },
  tipo_evento: { required },
  data_inicio: { required },
  data_fim: { required },
  data_prazo_inscricao: { required },
  responsavel: { required },
  telefone_responsavel: { required, minLength: minLength(10) },
  email_responsavel: { required, email: emailValidator },
  limite_inscritos: { required, minLength: minLength(1) },
}

const formData = ref({
  id: '',
  nome_evento: '',
  tipo_evento: '',
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

// Instanciando Vuelidate
const v$ = useVuelidate(rules, formData)

function submitForm() {
  console.log(formData)
  v$.value.$touch() // Marcar todos os campos como tocados
  if (v$.value.$invalid) {
    toast.error('Por favor, corrija os erros antes de enviar o formulário.')
    return
  }
  const submitForm = {
    id: formData.value.id,
    nome_evento: formData.value.nome_evento,
    tipo_evento: formData.value.tipo_evento,
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
    })
    .catch((error) => {
      toast.error(response.data.msg)
      console.error('Erro ao enviar dados:', error)
    })
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700 mt-5">
      Adicionar Eventos
    </h3>

    <div class="mt-8">
      <form @submit.prevent="submitForm">
        <div class="mt-4 grid grid-cols-3 gap-2 md:grid-cols-3 sm:grid-cols-2">
          <div class="col-span-3">
            <ImputComponent id="nome_evento" v-model="formData.nome_evento" tipo="text" label="Nome do Evento" />
          </div>
          <div class="">
            <ImputComponent id="data_inicio" v-model="formData.data_inicio" tipo="date" label="Data Fim" />
          </div>
          <div class="col-span-1">
            <SelectComponent id="tipo_evento" v-model="formData.tipo_evento" label="Tipo de evento" :options="tipo_evento" />
            <span v-for="error of v$.tipo_evento.$errors" :key="error.$uid" class="text-red-500">Tipo é obrigatório</span>
          </div>
          <div class="">
            <ImputComponent id="data_fim" v-model="formData.data_fim" tipo="date" label="Data Fim" />
          </div>
          <div class="">
            <ImputComponent id="data_prazo_inscricao" v-model="formData.data_prazo_inscricao" tipo="date" label="Prazo de inscrição" />
          </div>
          <div class="col-span-1">
            <ImputComponent id="limiteInscritos" v-model="formData.limite_inscritos" tipo="number" label="Limite de Inscritos" />
          </div>
          <div class="col-span-3">
            <ImputComponent id="responsavel" v-model="formData.responsavel" tipo="text" label="Responsável" />
          </div>
          <div class="col-span-1">
            <ImputComponent id="telefone" v-model="formData.telefone_responsavel" tipo="text" label="Telefone" />
          </div>
          <div class="col-span-2">
            <ImputComponent id="email" v-model="formData.email_responsavel" tipo="email" label="E-mail" />
          </div>
          <div class="col-span-1">
            <SelectComponent id="uf" v-model="formData.uf" label="Estado" :options="estados" />
          </div>
          <div class=" col-span-2">
            <ImputComponent id="cidade" v-model="formData.cidade" tipo="text" label="Cidade" />
          </div>
          <div class=" col-span-1">
            <ImputComponent id="local" v-model="formData.local" tipo="text" label="Local" />
          </div>
          <div class="col-span-3">
            <TextAreaComponent id="descricao-evento" v-model="formData.descricao" label="Descrição do Evento" rows="3" coluns="1" />
          </div>
        </div>
        <!-- Segunda coluna -->
        <div class="mt-4 grid grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-1">
          <div class="col-span-3">
            <ImputComponent id="logo-evento" v-model="formData.logo_evento" tipo="file" label="Logo do Evento" />
          </div>
          <div class="col-span-3 text-center">
            <label class="text-2xl font-semibold text-gray-700">Habilitar campos da Inscrição</label>
            <hr>
          </div>
          <div class="col-span-2">
            <CheckToggleComponent id="nome" v-model="formData.campo_extra.nome" label="Nome" />
          </div>
          <div class="col-span-1">
            <CheckToggleComponent id="sobrenome" v-model="formData.campo_extra.sobrenome" label="Sobrenome" />
          </div>
          <div class="col-span-2">
            <CheckToggleComponent id="telefone" v-model="formData.campo_extra.telefone" label="Telefone" />
          </div>
          <div class="col-span-1">
            <CheckToggleComponent id="email" v-model="formData.campo_extra.email" label="E-mail" />
          </div>
          <div class="col-span-2">
            <CheckToggleComponent id="cpf" v-model="formData.campo_extra.cpf" label="CPF" />
          </div>
          <div class="col-span-1">
            <CheckToggleComponent id="data-nascimento" v-model="formData.campo_extra.datanascimento" label="Data de Nascimento" />
          </div>
          <div class="col-span-2">
            <CheckToggleComponent id="sexo" v-model="formData.campo_extra.sexo" label="Sexo" />
          </div>
          <div class="col-span-1">
            <CheckToggleComponent id="estado-2" v-model="formData.campo_extra.estado" label="Estado" />
          </div>
          <div class="col-span-2">
            <CheckToggleComponent id="Cidade" v-model="formData.campo_extra.cidade" label="Cidade" />
          </div>
          <div class="col-span-1">
            <CheckToggleComponent id="endereco" v-model="formData.campo_extra.endereco" label="Endereço" />
          </div>
          <div class="col-span-2">
            <CheckToggleComponent id="cep" v-model="formData.campo_extra.cep" label="CEP" />
          </div>
        </div>
        <hr class="my-6">
        <div class="flex justify-start mt-6">
          <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700">
            Salvar Evento
          </button>
          <button class="px-4 py-2 text-gray-200 bg-red-800 ml-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-700">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
