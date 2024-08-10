import axios from 'axios'
import store from '../store/index.js';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

// Adicione um interceptor para incluir o token JWT em todos os headers
instance.interceptors.request.use(
    (config) => {

        const isAuthenticated = store.getters.isAuthenticated;
        // console.log('Is Authenticated:', isAuthenticated);

        // Adicione o token ao cabeçalho Authorization
        if (isAuthenticated) {
            const token = store.getters.isToken;
            // console.log('Token:', token);
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default instance
