<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const store = useStore()
const router = useRouter()
const email = ref('welitonvicente4@gmail.com')
const password = ref('12345678')
const error = ref('')

async function login() {
  try {
    await store.dispatch('login', { email: email.value, password: password.value })

    if (store.getters.isAuthenticated) {
      router.push('/dashboard')
    }
    else {
      const alertErroLogin = document.getElementById('alert-erro-login')
      alertErroLogin.classList.remove('hidden')

      toast('Nome de usuário ou senha incorretos!', {
        type: 'error',
        dangerouslyHTMLString: true,
      })
    }
  }
  catch (err) {
    error.value = store.getters.error || 'Nome de usuário ou senha incorretos'
    toast('e-mail ou senha incorretos!', {
      type: 'error',
      dangerouslyHTMLString: true,
    })
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <svg class="w-10 h-10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="#4C51BF"
            stroke="#4C51BF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          />
        </svg>
        <span class="text-2xl font-semibold text-gray-700">Organize Evento</span>
      </div>
      <!-- alert de erro -->
      <div id="alert-erro-login" class="hidden inline-flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
        <div class="flex items-center justify-center w-12 bg-red-500">
          <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>
        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <p class="text-sm text-gray-600">
              Email ou senha incorretos!
            </p>
          </div>
        </div>
      </div>
      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">E-mail</span>
          <input v-model="email" type="email" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Senha</span>
          <input v-model="password" type="password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <span class="mx-2 text-sm text-gray-600">Lembra me</span>
            </label>
          </div>

          <div>
            <a class="block text-sm text-indigo-700 fontme hover:underline" href="#">Esqueci minha senha</a>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Entrar
          </button>
        </div>
        <button type="submit" class="w-50 mt-6 px-4 py-2 text-sm text-center text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-500" @click="router.push({ name: 'register' })">
          Não tenho uma conta
        </button>
      </form>
    </div>
  </div>
</template>
