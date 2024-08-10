<template>

    <SectionNavegacao v-if="!$route.params.id">
        <template v-slot:title>Eventos</template>
        <template v-slot:navegacao1>
            <routerLink :to="{ name: 'eventoListar' }">Listar</routerLink>
        </template>
    </SectionNavegacao>

    <CardForm>
        <template v-slot:title>Informações</template>
        <template v-slot:body>
            <div class="row">
            </div>

        </template>

    </CardForm>

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CardForm from "@/components/CardForm.vue";
import SectionNavegacao from '@/components/SectionNavegacao.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const formData = ref({
    nome_evento: '',
    data_inicio: '',
    date_fim: '',
    data_prazo_inscricao: '',
    responsavel: '',
    telefone_responsavel: '',
    email_responsavel: '',
    uf: '',
    cidade: '',
    local: '',
    descricao: '',
    logo_evento: '',
    limite_nscritos: '',
    url_inscricao: '',
    campos_adicionais: [],
});

onMounted(() => {

    const router = useRouter();
    const id = router.currentRoute.value.params.id;

    axios.get(`evento/show/${id}`)
        .then(response => {
            const evento = response.data.data;
            formData.value = {
                ...formData.value,
                ...evento
            };
            console.log('asdf');
        })
        .catch(error => {
            console.log('Erro ao buscar detalhes do evento', error);
            Swal.fire({
                icon: 'error',
                title: 'error!',
                text: 'Erro ao buscar detalhes do evento!',
            });
        })
});



</script>