<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import axios from '../../router/axiosConfig.js'
import ImputComponent from '../../components/Form/ImputComponent.vue'
import SelectComponent from '../../components/Form/SelectComponent.vue'
import TextAreaComponent from '../../components/Form/TextAreaComponent.vue'
import 'vue3-toastify/dist/index.css'
import { useVuelidate } from '@vuelidate/core'
import { email as emailValidator, minLength, required } from '@vuelidate/validators'

// Definindo regras de validação
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

onMounted(() => {
  const router = useRouter()
  const id = router.currentRoute.value.params.id

  axios.get(`evento/show/${id}`)
    .then((response) => {
      const evento = response.data.data
      formData.value = {
        ...formData.value,
        ...evento,
      }
    })
    .catch((error) => {
      toast.error('Erro ao buscar detalhes do evento')
    })
})

function submitForm() {
  v$.value.$touch() // Marcar todos os campos como tocados
  if (v$.value.$invalid) {
    toast.error('Por favor, corrija os erros antes de enviar o formulário.')
    return
  }
  const update = {
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

  axios.put(`/evento/update/${formData.value.id}`, update)
    .then((response) => {
      if (response.data.status === 'success')
        toast.success(response.data.msg)
      else
        toast.error(response.data.msg)
    })
    .catch((error) => {
      toast.error('Erro ao enviar dados')
    })
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">
      Editar Eventos
    </h3>

    <div class="mt-8">
      <form @submit.prevent="submitForm">
        <div class="mt-4 grid grid-cols-3 gap-2 md:grid-cols-3 sm:grid-cols-1">
          <div class="col-span-3">
            <ImputComponent id="nome_evento" v-model="formData.nome_evento" tipo="text" label="Nome do Evento" />
            <span v-for="error of v$.nome_evento.$errors" :key="error.$uid" class="text-red-500">Nome do Evento é obrigatório</span>
          </div>
          <div class="">
            <ImputComponent id="data_inicio" v-model="formData.data_inicio" tipo="date" label="Data Fim" />
            <span v-for="error of v$.data_inicio.$errors" :key="error.$uid" class="text-red-500">Data é obrigatório</span>
          </div>
          <div class="col-span-1">
            <SelectComponent id="tipo_evento" v-model="formData.tipo_evento" label="Tipo de evento" :options="tipo_evento" />
            <span v-for="error of v$.tipo_evento.$errors" :key="error.$uid" class="text-red-500">Tipo é obrigatório</span>
          </div>
          <div class="">
            <ImputComponent id="data_inicio" v-model="formData.data_inicio" tipo="date" label="Data Fim" />
            <span v-for="error of v$.data_inicio.$errors" :key="error.$uid" class="text-red-500">Data é obrigatório</span>
          </div>
          <div class="">
            <ImputComponent id="data_fim" v-model="formData.data_fim" tipo="date" label="Data Fim" />
            <span v-for="error of v$.data_inicio.$errors" :key="error.$uid" class="text-red-500">Data é obrigatório</span>
          </div>
          <div class="">
            <ImputComponent id="data_prazo_inscricao" v-model="formData.data_prazo_inscricao" tipo="date" label="Prazo de inscrição" />
            <span v-for="error of v$.data_inicio.$errors" :key="error.$uid" class="text-red-500">Prazo é obrigatório</span>
          </div>
          <div class="col-span-1">
            <ImputComponent id="limiteInscritos" v-model="formData.limite_inscritos" tipo="number" label="Limite de Inscritos" />
            <span v-for="error of v$.limite_inscritos.$errors" :key="error.$uid" class="text-red-500">Limite é obrigatório</span>
          </div>
          <div class="col-span-2">
            <ImputComponent id="responsavel" v-model="formData.responsavel" tipo="text" label="Responsável" />
            <span v-for="error of v$.responsavel.$errors" :key="error.$uid" class="text-red-500">Responsável é obrigatório</span>
          </div>
          <div class="col-span-1">
            <label class="text-gray-700" :for="inputId">Telefone</label>
            <input
              id="telefone" v-model="formData.telefone_responsavel" v-mask="'(##) ####-####'" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            >
            <span v-for="error of v$.telefone_responsavel.$errors" :key="error.$uid" class="text-red-500">Telefone é obrigatório</span>
          </div>
          <div class="col-span-2">
            <ImputComponent id="email" v-model="formData.email_responsavel" tipo="email" label="E-mail" />
            <span v-for="error of v$.email_responsavel.$errors" :key="error.$uid" class="text-red-500">E-mail é obrigatório</span>
          </div>
          <div class="col-span-1">
            <SelectComponent id="uf" v-model="formData.uf" label="Estado" :options="estados" />
          </div>
          <div class=" col-span-2">
            <ImputComponent id="cidade" v-model="formData.cidade" tipo="text" label="Cidade" />
          </div>
          <div class=" col-span-3">
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
          <!-- <div class="col-span-2">
                        <CheckToggleComponent id="nome" label="Nome" v-model="formData.campo_extra.nome" />
                    </div>
                    <div class="col-span-1">
                        <ToggleCheckComponent id="sobrenome" label="Sobrenome" v-model="formData.campo_extra.sobrenome" />
                    </div>
                    <div class="col-span-2">
                        <ToggleCheckComponent id="telefone" label="Telefone" v-model="formData.campo_extra.telefone" />
                    </div>
                    <div class="col-span-1">
                        <ToggleCheckComponent id="email" label="E-mail" v-model="formData.campo_extra.email" />
                    </div>
                    <div class="col-span-2">
                        <ToggleCheckComponent id="cpf" label="CPF" v-model="formData.campo_extra.cpf" />
                    </div>
                    <div class="col-span-1">
                        <ToggleCheckComponent id="data-nascimento" label="Data de Nascimento" v-model="formData.campo_extra.datanascimento" />
                    </div>
                    <div class="col-span-2">
                        <ToggleCheckComponent id="sexo" label="Sexo" v-model="formData.campo_extra.sexo" />
                    </div>
                    <div class="col-span-1">
                        <ToggleCheckComponent id="estado-2" label="Estado" v-model="formData.campo_extra.estado" />
                    </div>
                    <div class="col-span-2">
                        <ToggleCheckComponent id="Cidade" label="Cidade" v-model="formData.campo_extra.cidade" />
                    </div>
                    <div class="col-span-1">
                        <ToggleCheckComponent id="endereco" label="Endereço" v-model="formData.campo_extra.endereco" />
                    </div>
                    <div class="col-span-2">
                        <ToggleCheckComponent id="cep" label="CEP" v-model="formData.campo_extra.cep" />
                    </div> -->
        </div>

        <hr class="my-6">
        <div class="flex justify-start mt-6">
          <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700">
            Atualizar Evento
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
