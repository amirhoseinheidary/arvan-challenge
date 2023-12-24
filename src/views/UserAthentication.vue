<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import { useUserStore } from '@/stores/useUserStore';
import { formatError, toastHanlder, isStrongPassword, isValidEmail } from '@/utils';

let errors = ref({});
let formErrors = ref({});
const route = useRoute();
const router = useRouter();
const { handleAuthAction } = useUserStore()
const isRegister = computed(() => (route.name) === 'Register')


const formStore = ref({ username: '', email: '', password: '' })
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    errors = {}
    return await handleAuthAction(route.name.toLowerCase(), { user: formStore.value })
      .then(() => {
        toastHanlder('success', ['you logged in successfully']);
        router.push('/')
      })
      .catch((error) => {
        errors = formatError(error.errors) || {}
        toastHanlder('error', errors);
      })
  },
  null,
  { immediate: false },
)
const validateField = (fieldName, isRegister) => {
  if (isRegister) {
    switch (fieldName) {
      case 'username': {
        if (formStore.value[fieldName].length <= 4) {
          formErrors.value[fieldName] = 'The username must be at least 5 characters.';
        } else {
          formErrors.value[fieldName] = null
        }
        break;
      }
      case 'password': {
        const result = isStrongPassword(formStore.value.password);

        if (result != true) {
          formErrors.value[fieldName] = result;
        } else {
          formErrors.value[fieldName] = null
        }

        break;
      }
      case 'email':

        if (!isValidEmail(formStore.value.email)) {
          formErrors.value[fieldName] = 'Please enter a valid Email.';
        } else {
          formErrors.value[fieldName] = null
        }

        break;
      default:
        formErrors.value[fieldName] = null;
    }
  }
};
</script>

<template>
  <div class="auth-box">
    <div class="p-8 bg-gray-100 rounded-sm">
      <h2 class="text-3xl text-center mb-8">{{ isRegister ? 'Register' : 'Login' }}</h2>
      <form autocomplete="on" @submit.prevent="() => onSubmit()">
        <fieldset v-if="isRegister" class="form-group mb-4">
          <label>
            <span class="block text-sm font-medium text-slate-700">Username</span>
          </label>
          <input v-model="formStore.username" required type="text" name="username" @keyup="validateField('username')"
            :class="{ 'ring-1 ring-red-500': formErrors.username != null }"
            class="peer block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6">
          <p class="mt-2 text-pink-600 text-sm" :class="{ 'visible': formErrors.username != null }">
            {{ formErrors.username }}
          </p>
        </fieldset>
        <fieldset class="form-group mb-4">
          <label>
            <span class="block text-sm font-medium text-slate-700">Email</span>
            <input v-model="formStore.email" required type="email" name="email" @keyup="validateField('email', isRegister)"
              :class="{ 'ring-1 ring-red-500': formErrors.email != null }"
              class="peer block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6">
            <p class="mt-2 text-pink-600 text-sm" :class="{ 'visible': formErrors.email != null }">
              {{ formErrors.email }}
            </p>
          </label>

        </fieldset>
        <fieldset class="form-group mb-4">
          <label>
            <span class="block text-sm font-medium text-slate-700">Password</span>
          </label>
          <input v-model="formStore.password" required name="password" type="password"
            @keyup="validateField('password', isRegister)" :class="{ 'ring-1 ring-red-500': formErrors.password != null }"
            class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none">
          <p class="mt-2 text-pink-600 text-sm" :class="{ 'visible': formErrors.password != null }">
            {{ formErrors.password }}
          </p>

        </fieldset>
        <button type="submit" :disabled="isLoading || (errors.length != 0 && isRegister)"
          class="w-full block py-2 px-4 text-white bg-blue-500 rounded hover:rounded-lg disabled:bg-gray-400">
          {{ isRegister ? 'Register' : 'Login' }}
        </button>
      </form>
      <p class="text-xs-center mt-4">
        {{ isRegister ? "Already Registered?" : "Don't have Account? " }}
        <router-link class="font-bold" :to="isRegister ? '/login' : '/register'">
          {{ isRegister ? 'Login' : 'Register Now' }}
        </router-link>
      </p>
    </div>
  </div>
</template>
<style>
.auth-box {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>