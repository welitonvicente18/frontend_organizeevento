<template>
    <div>
        <h3 class="text-3xl font-semibold text-gray-700 mt-5">
            Editar Usuário
        </h3>

        <div class="mt-8">
            <form @submit.prevent="submitForm">
                <div class="mt-4 grid grid-cols-4 gap-2 md:grid-cols-4 sm:grid-cols-2">
                    <div class="col-span-2">
                        <ImputComponent tipo="text" id="nome" label="Nome" v-model="formData.name" />
                    </div>
                    <div class="col-span-2">
                        <ImputComponent tipo="email" id="email" label="E-mail" v-model="formData.email" />
                    </div>
                    <div class="col-span-2">
                        <ImputComponent tipo="text" id="telefone" label="Telefone" v-model="formData.telefone" v-mask="'(##) ####-####'" />
                    </div>
                    <div class="col-span-1">
                        <SelectComponent id="perfil" label="Perfil" v-model="formData.perfil" :options="perfil" />
                    </div>
                    <div class="col-span-3">
                    </div>
                    <div class="col-span-2">
                        <ImputComponent tipo="password" id="password" label="Senha" v-model="formData.password" />
                    </div>
                    <div class="col-span-2">
                        <ImputComponent tipo="password" id="password_confirmation" label="Confirmar Senha" v-model="formData.password_confirmation" />
                    </div>
                </div>
                <hr class="my-6">
                <div class="flex justify-start mt-6">
                    <button class="px-4 py-2 text-gray-200 bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-700"> Atualizar Usuário </button>
                    <button class="px-4 py-2 text-gray-200 bg-red-800 ml-2 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-700"> Cancelar </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import ImputComponent from '../../components/Form/ImputComponent.vue';
import SelectComponent from '../../components/Form/SelectComponent.vue';

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
});

const props = defineProps({
    id: { type: String, required: true },
});

onMounted(() => {

    
    axios.get(`usuario/show/${props.id}`)
        .then(response => {
            const usuarios = response.data.data;
            formData.value = {
                ...formData.value,
                ...usuarios
            };
        })
        .catch(error => {
            console.log('Erro ao buscar o inscritos', error);
        })
});

function submitForm() {

    console.log(formData)

    const submitForm = {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        perfil: usuario.perfil,
        telefone: usuario.telefone,
    };

    axios.put(`usuario/update/`, submitForm)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        })
}
</script>