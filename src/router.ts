import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js';

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'

// eventos
import EventoListar from './views/evento/EventoListar.vue'
import EventoDetalhes from './views/evento/EventoDetalhes.vue'
import EventoEdit from './views/evento/EventoEdit.vue'

// inscritos
import InscritoListar from './views/inscrito/InscritoListar.vue'

// Usuário
import UsuarioListar from './views/usuario/UsuarioListar.vue'
import UsuarioEdit from './views/usuario/UsuarioEdit.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/logout',
        name: 'logout',
        component: Login,
        beforeEnter: (to, from, next) => {
            store.dispatch('logout').then(() => {
                router.replace('/login');
            });
        },
        meta: { layout: 'empty', requiresAuth: false },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { layout: 'empty', requiresAuth: false },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { layout: 'empty', requiresAuth: false },
    },
    {
        path: '/evento/listar',
        name: 'eventoListar',
        component: EventoListar,
        meta: { requiresAuth: true },
    },
    {
        path: '/evento/detalhe/:id',
        name: 'eventoDetalhe',
        component: EventoDetalhes,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/evento/edit/:id',
                name: 'eventoeditar',
                component: EventoEdit,
                meta: { requiresAuth: true },
            },
            {
                path: '/inscrito/listar/:id',
                name: 'inscritoListar',
                component: InscritoListar,
                meta: { requiresAuth: true },
            },
            {
                path: '/inscrito/form',
                name: 'InscritoForm',
                component: InscritoListar,
                meta: { requiresAuth: true },
            },
            {
                path: '/inscrito/edit/:id',
                name: 'InscritoEdit',
                component: InscritoListar,
                meta: { requiresAuth: true },
            },

        ],
    },
    {
        path: '/usuario/listar',
        name: 'usuarioListar',
        component: UsuarioListar,
        meta: { requiresAuth: true },
    },
    {
        path: '/usuario/edit/:id',
        name: 'usuarioEdit',
        component: UsuarioEdit,
        meta: { requiresAuth: true },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/forms',
        name: 'Forms',
        component: Forms,
        meta: { requiresAuth: true },
    },
    {
        path: '/cards',
        name: 'Cards',
        component: Card,
        meta: { requiresAuth: true },
    },
    {
        path: '/tables',
        name: 'Tables',
        component: Tables,
        meta: { requiresAuth: true },
    },
    {
        path: '/ui-elements',
        name: 'UIElements',
        component: UIElements,
        meta: { requiresAuth: true },
    },
    {
        path: '/modal',
        name: 'Modal',
        component: Modal,
        meta: { requiresAuth: true },
    },
    {
        path: '/blank',
        name: 'Blank',
        component: Blank,
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const requiresAuth = to.meta.requiresAuth;

    if (requiresAuth && !isAuthenticated) {
        // Redireciona para a página de login se não estiver autenticado
        next('/login');
    } else {
        // Permite o acesso à rota
        next();
    }
});
export default router
