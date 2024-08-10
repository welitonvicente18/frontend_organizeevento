<template>
    <div>
        <h3 class="text-3xl font-semibold text-gray-700 mt-5">
            Adicionar Inscrição
        </h3>

        <div class="mt-8">
            <form @submit.prevent="submitForm">
                <div class="mt-4 grid grid-cols-4 gap-2 md:grid-cols-4 sm:grid-cols-2">
                    <div class="col-span-2">
                        <ImputComponent tipo="text" id="nome" label="Primeiro Nome" v-model="formData.nome" />
                    </div>
                    <div class="col-span-2">
                        <ImputComponent tipo="text" id="sobrenome" label="Sobrenome" v-model="formData.sobrenome" />
                    </div>
                    <div class="col-span-1">
                        <ImputComponent tipo="text" id="telefone" label="Telefone" v-model="formData.telefone" v-mask="'(##) ####-####'" />
                    </div>
                    <div class="col-span-3">
                        <ImputComponent tipo="email" id="email" label="E-mail" v-model="formData.email" />
                    </div>
                    <div class="col-span-1" v-if="permisaoCampo.cpf">
                        <ImputComponent tipo="text" id="cpf" label="CPF" v-model="formData.cpf" />
                    </div>
                    <div class="col-span-1" v-if="permisaoCampo.datanascimento">
                        <ImputComponent tipo="text" id="data-nascimento" label="Data de Nascimento" v-model="formData.data_nascimento" placeholder="__/__/____" />
                    </div>
                    <div class="col-span-1" v-if="permisaoCampo.sexo">
                        <SelectComponent id="sexo" label="Sexo" v-model="formData.sexo" :options="sexo" />
                    </div>
                    <div class="col-span-1">
                    </div>
                    <div class="col-span-1" v-if="permisaoCampo.estado">
                        <SelectComponent id="uf" label="Estado" v-model="formData.uf" :options="estados" />
                    </div>
                    <div class=" col-span-1" v-if="permisaoCampo.cep">
                        <ImputComponent tipo="text" id="cep" label="CEP" v-model="formData.cep" />
                    </div>
                    <div class="col-span-2" v-if="permisaoCampo.cidade">
                        <ImputComponent tipo="text" id="cidade" label="Cidade" v-model="formData.cidade" :options="cidade" />
                    </div>
                    <div class=" col-span-2" v-if="permisaoCampo.endereco">
                        <ImputComponent tipo="text" id="endereco" label="Endereco" v-model="formData.endereco" />
                    </div>
                </div>
                <hr class="my-6">
                <div class="flex justify-start mt-6">
                    <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700"> Salvar Inscrição </button>
                    <button class="px-4 py-2 text-gray-200 bg-red-800 ml-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-700"> Cancelar </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import Swal from 'sweetalert2';
import axios from 'axios'
import ImputComponent from '../../components/Form/ImputComponent.vue';
import SelectComponent from '../../components/Form/SelectComponent.vue';

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
    { value: 'TO', texto: 'TO' }
];

const permisaoCampo = ref({
    sexo: false,
    cep: false,
    cidade: false,
    cpf: false,
    datanascimento: false,
    endereco: false,
    estado: false,
});


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
        cep: false
    },
});

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
    };

    axios.post(`evento/store/`, submitForm)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        })
}



</script>