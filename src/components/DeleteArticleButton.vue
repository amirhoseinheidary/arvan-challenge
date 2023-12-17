<script setup>
import { defineProps } from "vue"
import { useAsyncState } from '@vueuse/core';
import { useRouter } from "vue-router";
import api from '@/api'
import { toastHanlder } from '@/utils';


const props = defineProps(['slug']);
const router = useRouter()
const { isLoading, execute: onDeleteArticle } = useAsyncState(
    async () => {
        await api.deleteArticle(props.slug).then(() => {
            toastHanlder('success', ['Article deleted successfully!'])
            router.push('/')
        }).catch(error => {
            if (error.response && error.response.status === 204) {
                // Handle 204 status (No Content)
                toastHanlder('info', ['Article does not exist!!']);
            } else {
                // Handle other errors
                console.error('Error:', error);
                toastHanlder('error', ['Error deleting article!!!']);
            }
        });
    },
    null,
    {
        immediate: false,
    },
)
</script>

<template>
    <button :disabled="isLoading" class="bg-red-400 text-white py-2 px-4 rounded" @click="() => onDeleteArticle()">
        Delete
    </button>
</template>