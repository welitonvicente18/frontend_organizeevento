<template>
    <div>
        <h3 class="text-3xl font-semibold text-gray-700">
            Editar Eventos
        </h3>

        <div class="mt-8">
            <form @submit.prevent="submitForm">
                <div class="mt-4 grid grid-cols-3 gap-2 md:grid-cols-3 sm:grid-cols-1">
                    <div class="col-span-3">
                        <ImputComponent tipo="text" id="nome_evento" label="Nome do Evento" v-model="formData.nome_evento" />
                    </div>
                    <div class="">
                        <ImputComponent tipo="date" id="data_inicio" label="Data Fim" v-model="formData.data_inicio" />
                    </div>
                    <div class="">
                        <ImputComponent tipo="date" id="data_fim" label="Data Fim" v-model="formData.data_fim" />
                    </div>
                    <div class="">
                        <ImputComponent tipo="date" id="data_prazo_inscricao" label="Prazo de inscrição" v-model="formData.data_prazo_inscricao" />
                    </div>
                    <div class="col-span-3">
                        <ImputComponent tipo="text" id="responsavel" label="Responsável" v-model="formData.responsavel" />
                    </div>
                    <div class="col-span-1">
                        <ImputComponent tipo="text" id="telefone" label="Telefone" v-model="formData.telefone_responsavel" />
                    </div>
                    <div class="col-span-2">
                        <ImputComponent tipo="email" id="email" label="E-mail" v-model="formData.email_responsavel" />
                    </div>
                    <div class="col-span-1">
                        <SelectComponent id="uf" label="Estado" v-model="formData.uf" :options="estados" />
                    </div>
                    <div class=" col-span-2">
                        <ImputComponent tipo="text" id="cidade" label="Cidade" v-model="formData.cidade" />
                    </div>
                    <div class=" col-span-3">
                        <ImputComponent tipo="text" id="local" label="Local" v-model="formData.local" />
                    </div>
                    <div class="col-span-3">
                        <TextAreaComponent id="descricao-evento" label="Descrição do Evento" rows="3" coluns="1" v-model="formData.descricao" />
                    </div>
                </div>
                <!-- Segunda coluna -->
                <div class="mt-4 grid grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-1">
                    <div class="col-span-3">
                        <ImputComponent tipo="file" id="logo-evento" label="Logo do Evento" v-model="formData.logo_evento" />
                    </div>
                    <div class="col-span-1">
                        <ImputComponent tipo="number" id="limiteInscritos" label="Limite de Inscritos" v-model="formData.limite_inscritos" />
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
                    <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700"> Atualizar Evento </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../router/axiosConfig.js'
import ImputComponent from '../../components/Form/ImputComponent.vue';
import SelectComponent from '../../components/Form/SelectComponent.vue';
import TextAreaComponent from '../../components/Form/TextAreaComponent.vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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

onMounted(() => {

    const router = useRouter();
    const id = router.currentRoute.value.params.id;

    axios.get(`evento/show/${id}`,)
        .then(response => {
            const evento = response.data.data;
            formData.value = {
                ...formData.value,
                ...evento
            };
        })
        .catch(error => {
            console.log('Erro ao buscar detalhes do evento', error);
            toast("Erro ao buscar detalhes do evento.", {
                "type": "error",
                "dangerouslyHTMLString": true
            })
        })
});

function submitForm() {

    console.log(formData)

    const update = {
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


    axios.put(`/evento/update/${formData.value.id}`, update)
        .then(response => {
            console.log(response.data);
            toast("Atualizado com sucesso!", {
                "type": "success",
                "dangerouslyHTMLString": true
            })
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            toast("Erro ao enviar dados.", {
                "type": "error",
                "dangerouslyHTMLString": true
            })
        })
}



</script>