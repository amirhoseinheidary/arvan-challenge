<script setup>
import {ref} from "vue";
import {useRoute,useRouter} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import { useUserStore } from '@/stores/useUserStore';

// let errors = ref({})
const route = useRoute();
const router = useRouter();
const { handleAuthAction } = useUserStore()
const isRegister = (route.name) === 'Register'

const formStore = ref({ username: '', email: '', password: '' })
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    // errors = {}
    return await handleAuthAction(route.name.toLowerCase(), { user: formStore.value })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        // errors = error.errors || {}
        console.log(error)
      })
  },
  null,
  { immediate: false },
)
</script>

<template>
<div class="auth-box">
  <h2>{{isRegister ? 'Register' : 'Login'}}</h2>
  <form autocomplete="on" @submit.prevent="() => onSubmit()">
            <fieldset v-if="isRegister" class="form-group">
              <input
                v-model="formStore.username" required type="text" name="username" placeholder="Your Name"
                class="form-control form-control-lg"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="formStore.email" required type="email" name="email" placeholder="Email"
                class="form-control form-control-lg"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="formStore.password" required name="password" type="password" placeholder="Password"
                class="form-control form-control-lg"
              >
            </fieldset>
            <button type="submit" :disabled="isLoading" class="btn btn-lg btn-primary pull-xs-right">
              {{ isRegister ? 'Sign up' : 'Sign in' }}
            </button>
  </form>
  <p class="text-xs-center">
            {{ isRegister ? "Already Registered?" : "Don't have Account? " }}
            <router-link class="font-bold" :to="isRegister ? '/login' : '/register'">
              {{ isRegister ? 'Login' : 'Register Now' }}
            </router-link>
          </p>
</div>
</template>



<style>
.auth-box{
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  max-width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.font-bold{
  font-weight: bold;
}
</style>