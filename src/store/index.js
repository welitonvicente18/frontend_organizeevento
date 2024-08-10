import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        user: {
            id: null,
            name: null,
            email: null,
        },
        isAuthenticated: false,
        token: null,
        error: null,
    },
    mutations: {
        setAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        settoken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setError(state, error) {
            state.error = error;
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('login', credentials);
                const autenticado = response.data.data;
                const token = autenticado.original.access_token;

                const user = {
                    id: autenticado.original.id,
                    name: autenticado.original.name,
                    email: autenticado.original.email,
                };

                commit('setAuthenticated', true);
                commit('settoken', token);
                commit('setUser', user);
                commit('setError', null);

            } catch (error) {
                commit('setError', 'Falha ao fazer login');
                console.error('Erro ao fazer login:', error);
            }
        },
        async fetchUserData({ commit, state }) {
            if (!state.token) {
                commit('setError', 'Usuário não autenticado');
                return;
            }

            try {
                const response = await axios.get('user', {
                    headers: { Authorization: `Bearer ${state.token}` },
                });
                commit('setUser', response.data);
                commit('setError', null);
            } catch (error) {
                commit('setError', 'Erro ao buscar dados do usuário');
                console.error('Erro ao buscar dados do usuário:', error);
            }
        },
        logout({ commit }) {
            // Limpa o estado no Vuex
            commit('setAuthenticated', false);
            commit('settoken', false);
            commit('setUser', null);

            // Remove informações do localStorage
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        isToken: (state) => state.token,
        currentUser: (state) => state.user,
        error: (state) => state.error,
    },
    plugins: [createPersistedState()],
});
